import { json, cors } from './shared/admin-auth.mjs';
export default async req=>{if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});return json({ok:true},200,{...cors(req),'set-cookie':'flame_admin=; Domain=.flamebachi.com; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'});};
export const config={path:'/api/admin/logout'};
