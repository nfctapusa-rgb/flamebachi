import { getStore } from '../../_lib/store.mjs';
import { requireAdmin, json, cors } from '../../_lib/admin-auth.mjs';
const store=()=>getStore({name:'flamebachi-payments',consistency:'strong'});
const defaults={stripe:{status:'not_connected'},clover:{status:'awaiting_goodtable_setup'},cash:{enabled:true},platformFeePercent:1};
const __handler=async req=>{if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});try{requireAdmin(req);if(req.method==='GET'){const d=await store().get('config',{type:'json',consistency:'strong'});return json({...defaults,...d},200,cors(req));}if(req.method==='PUT'){const b=await req.json();const current=await store().get('config',{type:'json',consistency:'strong'})||{};const next={...defaults,...current,...b,updatedAt:new Date().toISOString()};await store().setJSON('config',next);return json(next,200,cors(req));}return json({error:'Method not allowed'},405,cors(req));}catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to manage payments.'},e.message==='Unauthorized'?401:500,cors(req));}};
export default { fetch: __handler };
