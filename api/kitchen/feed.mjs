import { getStore } from '../../lib/store.mjs';
import { listOrders } from '../../lib/orders.mjs';
const json=(b,s=200)=>new Response(JSON.stringify(b),{status:s,headers:{'content-type':'application/json','cache-control':'no-store'}});
async function getPrinterConfig(){return (await getStore({name:'flamebachi-printers',consistency:'strong'}).get('config',{type:'json',consistency:'strong'}))||{bridge:{},printers:[],testJobs:[]};}
async function auth(req){const token=req.headers.get('authorization')||'';const c=await getPrinterConfig();return !!c.bridge?.token && token===`Bearer ${c.bridge.token}`;}
const __handler=async req=>{if(req.method!=='GET')return json({error:'Method not allowed'},405);if(!(await auth(req)))return json({error:'Unauthorized'},401);try{const c=await getPrinterConfig();const since=Number(new URL(req.url).searchParams.get('since')||0);const orders=(await listOrders()).filter(o=>new Date(o.createdAt).getTime()>since&&['CASH_PENDING','PAID','PREPARING'].includes(o.status)&&!o.kitchenPrintedAt);return json({orders,printers:c.printers||[],testJobs:c.testJobs||[]});}catch(e){return json({error:e.message||'Unable to load kitchen orders.'},500)}};
export default { fetch: __handler };
