// Single entry point for every /api/* route (Vercel Hobby allows max 12 functions per deployment).
// vercel.json rewrites /api/<path> -> /api/router?__path=<path>; we rebuild the original request and dispatch.
const ROUTES = {
  'admin/analytics': () => import('./_routes/admin/analytics.mjs'),
  'admin/customers': () => import('./_routes/admin/customers.mjs'),
  'admin/login': () => import('./_routes/admin/login.mjs'),
  'admin/logout': () => import('./_routes/admin/logout.mjs'),
  'admin/media': () => import('./_routes/admin/media.mjs'),
  'admin/menu': () => import('./_routes/admin/menu.mjs'),
  'admin/order': () => import('./_routes/admin/order.mjs'),
  'admin/orders': () => import('./_routes/admin/orders.mjs'),
  'admin/payments': () => import('./_routes/admin/payments.mjs'),
  'admin/printers': () => import('./_routes/admin/printers.mjs'),
  'admin/security': () => import('./_routes/admin/security.mjs'),
  'admin/session': () => import('./_routes/admin/session.mjs'),
  'admin/settings': () => import('./_routes/admin/settings.mjs'),
  'admin/system': () => import('./_routes/admin/system.mjs'),
  'gt/config': () => import('./_routes/gt/config.mjs'),
  'gt/dashboard': () => import('./_routes/gt/dashboard.mjs'),
  'gt/orders': () => import('./_routes/gt/orders.mjs'),
  'gt/session': () => import('./_routes/gt/session.mjs'),
  'gt/settings': () => import('./_routes/gt/settings.mjs'),
  'kitchen/feed': () => import('./_routes/kitchen/feed.mjs'),
  'kitchen/printed': () => import('./_routes/kitchen/printed.mjs'),
  'media': () => import('./_routes/media.mjs'),
  'menu': () => import('./_routes/menu.mjs'),
  'orders': () => import('./_routes/orders/index.mjs'),
  'receipt': () => import('./_routes/receipt.mjs'),
  'stripe/payment-intent': () => import('./_routes/stripe/payment-intent.mjs'),
  'stripe/session': () => import('./_routes/stripe/session.mjs'),
  'stripe/webhook': () => import('./_routes/stripe/webhook.mjs'),
};

function resolve(path) {
  if (ROUTES[path]) return ROUTES[path];
  if (/^orders\/[^/]+$/.test(path)) return () => import('./_routes/orders/[id].mjs');
  return null;
}

async function handler(req) {
  const url = new URL(req.url);
  let path = url.searchParams.get('__path');
  if (path == null) path = url.pathname.replace(/^\/api\/?/, '');
  path = path.replace(/^\/+|\/+$/g, '');
  url.searchParams.delete('__path');
  url.pathname = '/api/' + path;
  const load = resolve(path);
  if (!load) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'content-type': 'application/json' } });
  const method = req.method.toUpperCase();
  const body = method === 'GET' || method === 'HEAD' ? undefined : await req.arrayBuffer();
  const forwarded = new Request(url, { method, headers: req.headers, body });
  const mod = await load();
  return mod.default.fetch(forwarded);
}
export default { fetch: handler };
