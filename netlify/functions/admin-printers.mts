import { getStore } from '@netlify/blobs';
import { randomBytes } from 'node:crypto';
import { requireAdmin, json, cors } from './shared/admin-auth.mjs';
const store=()=>getStore({name:'flamebachi-printers',consistency:'strong'});
const base=()=>({printers:[],bridge:{status:'not_paired',token:''},testJobs:[]});
export default async req=>{
 if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});
 try{requireAdmin(req);const current=await store().get('config',{type:'json',consistency:'strong'})||base();
  if(req.method==='GET')return json({...base(),...current},200,cors(req));
  if(req.method==='PUT'){
   const b=await req.json();let next={...base(),...current};
   if(b.action==='generate_token'){next.bridge={...(next.bridge||{}),token:randomBytes(24).toString('hex'),status:'token_ready',generatedAt:new Date().toISOString()};}
   else if(b.action==='test'){const id=String(b.printerId||'');if(!next.printers.some(p=>p.id===id))return json({error:'Printer not found.'},404,cors(req));next.testJobs=[...(next.testJobs||[]),{id:randomBytes(10).toString('hex'),printerId:id,createdAt:new Date().toISOString()}];}
   else {if(Array.isArray(b.printers))next.printers=b.printers;if(b.bridge)next.bridge={...(next.bridge||{}),...b.bridge};}
   next.updatedAt=new Date().toISOString();await store().setJSON('config',next);return json(next,200,cors(req));
  }
  return json({error:'Method not allowed'},405,cors(req));
 }catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to manage printers.'},e.message==='Unauthorized'?401:500,cors(req));}
};
export const config={path:'/api/admin/printers'};
