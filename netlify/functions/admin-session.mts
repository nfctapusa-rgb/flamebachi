import { requireAdmin, json, cors, signSession } from './shared/admin-auth.mjs';
export default async req=>{
  if(req.method==='OPTIONS') return new Response('',{status:204,headers:cors(req)});
  try{
    const host=(req.headers.get('host')||'').split(':')[0].toLowerCase();
    try { const s=requireAdmin(req); return json({ok:true,user:s},200,cors(req)); } catch {}
    // Temporary development access for the owner subdomain. Disable with ADMIN_DEV_MODE=false before production.
    if(host==='admin.flamebachi.com' && process.env.ADMIN_DEV_MODE!=='false'){
      const token=signSession({sub:'owner@flamebachi.com',role:'owner',temporary:true,exp:Date.now()+1000*60*60*12});
      return json({ok:true,user:{email:'owner@flamebachi.com',role:'owner',temporary:true},temporary:true},200,{...cors(req),'set-cookie':`flame_admin=${encodeURIComponent(token)}; Domain=.flamebachi.com; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=43200`});
    }
    return json({error:'Unauthorized'},401,cors(req));
  }catch(e){return json({error:e.message||'Unable to start owner session.'},500,cors(req));}
};
export const config={path:'/api/admin/session'};
