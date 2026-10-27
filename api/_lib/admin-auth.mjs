import { createHmac, timingSafeEqual } from 'node:crypto';

const secret=()=>process.env.ADMIN_SESSION_SECRET || process.env.KITCHEN_BRIDGE_TOKEN || 'flamebachi-goodtable-temporary-session-v1';
function b64url(v){return Buffer.from(v).toString('base64url')}
function fromB64(v){return Buffer.from(v,'base64url').toString('utf8')}
export function signSession(payload){
  const body=b64url(JSON.stringify(payload));
  const sig=createHmac('sha256',secret()).update(body).digest('base64url');
  return `${body}.${sig}`;
}
export function verifySession(token){
  if(!token||!secret()) return null;
  const [body,sig]=String(token).split('.'); if(!body||!sig)return null;
  const expected=createHmac('sha256',secret()).update(body).digest('base64url');
  try{ if(!timingSafeEqual(Buffer.from(sig),Buffer.from(expected))) return null; }catch{return null;}
  try{const p=JSON.parse(fromB64(body)); if(!p.exp||Date.now()>p.exp)return null; return p;}catch{return null;}
}
export function cookieToken(req){
  const c=req.headers.get('cookie')||''; const m=c.match(/flame_admin=([^;]+)/); return m?decodeURIComponent(m[1]):'';
}
export function requireAdmin(req){
  const s=verifySession(cookieToken(req)); if(!s) throw new Error('Unauthorized'); return s;
}
export function json(body,status=200,extra={}){return new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json','cache-control':'no-store',...extra}})}
export function cors(req){return {'access-control-allow-origin':req.headers.get('origin')||'*','access-control-allow-credentials':'true','access-control-allow-headers':'content-type','access-control-allow-methods':'GET,POST,PATCH,DELETE,OPTIONS'};}

// Session cookie scoped to .flamebachi.com on the real domains (shared by admin + kitchen subdomains),
// host-only everywhere else (e.g. *.vercel.app) so the cookie is still accepted.
export function sessionCookie(req,token,maxAge=43200){
  const host=(req.headers.get('x-forwarded-host')||req.headers.get('host')||new URL(req.url).host).split(':')[0].toLowerCase();
  const domain=host==='flamebachi.com'||host.endsWith('.flamebachi.com')?'; Domain=.flamebachi.com':'';
  return `flame_admin=${token?encodeURIComponent(token):''}${domain}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}
