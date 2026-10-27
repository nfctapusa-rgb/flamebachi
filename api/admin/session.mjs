import { requireAdmin, json, cors, signSession, sessionCookie } from '../../lib/admin-auth.mjs';
const __handler=async req=>{
  if(req.method==='OPTIONS') return new Response('',{status:204,headers:cors(req)});
  try{
    const host=(req.headers.get('x-forwarded-host')||req.headers.get('host')||new URL(req.url).host).split(':')[0].toLowerCase();
    try { const s=requireAdmin(req); return json({ok:true,user:s},200,cors(req)); } catch {}
    // Temporary development access for the owner subdomain. Disable with ADMIN_DEV_MODE=false before production.
    if(host==='admin.flamebachi.com' && process.env.ADMIN_DEV_MODE!=='false'){
      const token=signSession({sub:'owner@flamebachi.com',role:'owner',temporary:true,exp:Date.now()+1000*60*60*12});
      return json({ok:true,user:{email:'owner@flamebachi.com',role:'owner',temporary:true},temporary:true},200,{...cors(req),'set-cookie':sessionCookie(req,token)});
    }
    return json({error:'Unauthorized'},401,cors(req));
  }catch(e){return json({error:e.message||'Unable to start owner session.'},500,cors(req));}
};
export default { fetch: __handler };
