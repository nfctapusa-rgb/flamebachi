// Storage adapter: drop-in replacement for the subset of @netlify/blobs used by this app.
//
// Backend selection (automatic):
//   1. Redis (Upstash / Vercel KV) when KV_REST_API_URL + KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_*) are set.
//      Recommended for production: each store is one Redis hash, so listing every order is ONE command.
//   2. Vercel Blob (private store) when BLOB_READ_WRITE_TOKEN is set.
//
// API kept identical to the old Netlify calls:
//   getStore({name}).get(key,{type:'json'|'arrayBuffer'|'text'}), .set(key,data,{contentType}), .setJSON(key,obj),
//   .delete(key), .list({cursor,limit}) -> {blobs:[{key}],cursor}
// plus .values() -> all JSON values in the store (fast path used by order/customer listing).

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
const useRedis = !!(REDIS_URL && REDIS_TOKEN);

/* ---------------- Redis (REST, no SDK needed) ---------------- */
async function redis(cmd) {
  const r = await fetch(REDIS_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'content-type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || d.error) throw new Error(`Storage error: ${d.error || r.status}`);
  return d.result;
}
const BIN = 'b64:';
function redisStore(name) {
  const h = `fb:${name}`;
  const decode = (raw, type) => {
    if (raw == null) return null;
    if (type === 'arrayBuffer') {
      const buf = raw.startsWith(BIN) ? Buffer.from(raw.slice(BIN.length), 'base64') : Buffer.from(raw);
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    if (type === 'json') { try { return JSON.parse(raw); } catch { return null; } }
    return raw;
  };
  return {
    async get(key, opts = {}) { return decode(await redis(['HGET', h, key]), opts.type); },
    async set(key, data) {
      const v = typeof data === 'string' ? data : BIN + Buffer.from(data instanceof ArrayBuffer ? new Uint8Array(data) : data).toString('base64');
      await redis(['HSET', h, key, v]);
    },
    async setJSON(key, obj) { await redis(['HSET', h, key, JSON.stringify(obj)]); },
    async delete(key) { await redis(['HDEL', h, key]); },
    async list() { const keys = await redis(['HKEYS', h]) || []; return { blobs: keys.map(key => ({ key })), cursor: undefined }; },
    async values() {
      const flat = await redis(['HGETALL', h]) || [];
      const out = [];
      for (let i = 0; i < flat.length; i += 2) {
        const raw = flat[i + 1];
        if (typeof raw === 'string' && !raw.startsWith(BIN)) { try { out.push(JSON.parse(raw)); } catch {} }
      }
      return out;
    }
  };
}

/* ---------------- Vercel Blob (private) ---------------- */
let blobSdk;
const sdk = async () => (blobSdk ||= await import('@vercel/blob'));
const enc = k => Buffer.from(String(k)).toString('base64url');
const dec = p => Buffer.from(p, 'base64url').toString('utf8');
function blobStore(name) {
  const path = key => `${name}/${enc(key)}`;
  const store = {
    async get(key, opts = {}) {
      const { get } = await sdk();
      let res;
      try { res = await get(path(key), { access: 'private', useCache: false }); } catch (e) { if (/not.?found/i.test(String(e?.message || e?.name))) return null; throw e; }
      if (!res || res.statusCode !== 200 || !res.stream) return null;
      const ab = await new Response(res.stream).arrayBuffer();
      if (opts.type === 'arrayBuffer') return ab;
      const text = Buffer.from(ab).toString('utf8');
      if (opts.type === 'json') { try { return JSON.parse(text); } catch { return null; } }
      return text;
    },
    async set(key, data, opts = {}) {
      const { put } = await sdk();
      await put(path(key), typeof data === 'string' ? data : Buffer.from(data instanceof ArrayBuffer ? new Uint8Array(data) : data), {
        access: 'private', allowOverwrite: true, addRandomSuffix: false, contentType: opts.contentType || 'application/octet-stream'
      });
    },
    async setJSON(key, obj) {
      const { put } = await sdk();
      await put(path(key), JSON.stringify(obj), { access: 'private', allowOverwrite: true, addRandomSuffix: false, contentType: 'application/json' });
    },
    async delete(key) {
      const { del } = await sdk();
      try { await del(path(key)); } catch {}
    },
    async list({ cursor, limit = 1000 } = {}) {
      const { list } = await sdk();
      const page = await list({ prefix: `${name}/`, cursor, limit });
      return { blobs: (page.blobs || []).map(b => ({ key: dec(b.pathname.slice(name.length + 1)) })), cursor: page.hasMore ? page.cursor : undefined };
    },
    async values() {
      const out = []; let cursor;
      do {
        const page = await store.list({ cursor });
        const vals = await Promise.all(page.blobs.map(b => store.get(b.key, { type: 'json' }).catch(() => null)));
        for (const v of vals) if (v) out.push(v);
        cursor = page.cursor;
      } while (cursor);
      return out;
    }
  };
  return store;
}

export function getStore(opts) {
  const name = typeof opts === 'string' ? opts : opts.name;
  return useRedis ? redisStore(name) : blobStore(name);
}
export const storageBackend = () => (useRedis ? 'redis' : 'vercel-blob');
