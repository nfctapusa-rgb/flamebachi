import { getStore } from '../../_lib/store.mjs';
import { requireAdmin, json, cors } from '../../_lib/admin-auth.mjs';
import { ITEMS } from '../../_lib/menu.mjs';
const store=()=>getStore({name:'flamebachi-menu',consistency:'strong'});
const __handler=async req=>{if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});try{requireAdmin(req);if(req.method==='GET'){const saved=await store().get('menu',{type:'json',consistency:'strong'});return json({items:saved?.items||ITEMS},200,cors(req));}if(req.method==='PUT'){const b=await req.json();if(!Array.isArray(b.items))return json({error:'items must be an array'},400,cors(req));const items=b.items.map(x=>[String(x[0]||''),String(x[1]||''),Number(x[2]||0),String(x[3]||''),String(x[4]||''),x[5]!==false]);await store().setJSON('menu',{items,updatedAt:new Date().toISOString()});return json({items},200,cors(req));}return json({error:'Method not allowed'},405,cors(req));}catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to manage menu.'},e.message==='Unauthorized'?401:500,cors(req));}};
export default { fetch: __handler };
