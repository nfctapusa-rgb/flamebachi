import { createHash } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { requireAdmin, json, cors } from './shared/admin-auth.mjs';
const store=()=>getStore({name:'flamebachi-admin-security',consistency:'strong'});
const hashPin=p=>createHash('sha256').update(String(p)).digest('hex');
export default async req=>{
 if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});
 try{
  const s=requireAdmin(req);
  if(req.method==='GET') return json({pinConfigured:true,temporary:!((await store().get('config',{type:'json',consistency:'strong'}))?.pinHash)},200,cors(req));
  if(req.method==='PUT'){
   if(s.role!=='owner')return json({error:'Owner only.'},403,cors(req));
   const b=await req.json(); const pin=String(b.pin||'');
   if(!/^\d{4,8}$/.test(pin))return json({error:'PIN must be 4 to 8 digits.'},400,cors(req));
   await store().setJSON('config',{pinHash:hashPin(pin),updatedAt:new Date().toISOString()});
   return json({ok:true,temporary:false},200,cors(req));
  }
  return json({error:'Method not allowed'},405,cors(req));
 }catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to manage security.'},e.message==='Unauthorized'?401:500,cors(req));}
};
export const config={path:'/api/admin/security'};
