import { requireAdmin, json, cors } from '../../lib/admin-auth.mjs';
import { listCustomers } from '../../lib/customers.mjs';
const __handler=async req=>{if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});try{requireAdmin(req);const customers=await listCustomers();return json({customers:customers.sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)))},200,cors(req));}catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to load customers.'},e.message==='Unauthorized'?401:500,cors(req));}};
export default { fetch: __handler };
