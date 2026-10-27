import { requireAdmin, json, cors } from './shared/admin-auth.mjs';
import { listCustomers } from './shared/customers.mjs';
export default async req=>{if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});try{requireAdmin(req);const customers=await listCustomers();return json({customers:customers.sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)))},200,cors(req));}catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to load customers.'},e.message==='Unauthorized'?401:500,cors(req));}};
export const config={path:'/api/admin/customers'};
