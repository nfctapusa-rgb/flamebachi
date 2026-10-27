import { createHash } from 'node:crypto';
import { getStore } from '../../lib/store.mjs';
import { signSession, json, cors, sessionCookie } from '../../lib/admin-auth.mjs';

const securityStore=()=>getStore({name:'flamebachi-admin-security',consistency:'strong'});
const hashPin=(pin)=>createHash('sha256').update(String(pin)).digest('hex');
async function configuredPinHash(){
  const saved=await securityStore().get('config',{type:'json',consistency:'strong'});
  if(saved?.pinHash) return saved.pinHash;
  return hashPin(process.env.ADMIN_TEST_PIN || '0000');
}
const __handler=async (req)=>{
 if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});
 if(req.method!=='POST')return json({error:'Method not allowed'},405,cors(req));
 try{
   const b=await req.json();
   const pin=String(b.pin||'');
   const expected=await configuredPinHash();
   if(hashPin(pin)===expected){
     const token=signSession({sub:'owner@flamebachi.com',role:'owner',temporary:true,exp:Date.now()+1000*60*60*12});
     return json({ok:true,user:{email:'owner@flamebachi.com',role:'owner',temporary:true}},200,{...cors(req),'set-cookie':sessionCookie(req,token)});
   }
   const email=String(b.email||'').trim().toLowerCase();
   const password=String(b.password||'');
   const expectedEmail=(process.env.ADMIN_EMAIL||'').trim().toLowerCase();
   const expectedHash=(process.env.ADMIN_PASSWORD_SHA256||'').toLowerCase();
   if(!expectedEmail||!expectedHash)return json({error:'Invalid PIN.'},401,cors(req));
   const hash=createHash('sha256').update(password).digest('hex');
   if(email!==expectedEmail||hash!==expectedHash)return json({error:'Invalid PIN.'},401,cors(req));
   const token=signSession({sub:email,role:'owner',exp:Date.now()+1000*60*60*12});
   return json({ok:true,user:{email,role:'owner'}},200,{...cors(req),'set-cookie':sessionCookie(req,token)});
 }catch(e){return json({error:e.message||'Login failed.'},500,cors(req));}
};
export default { fetch: __handler };
