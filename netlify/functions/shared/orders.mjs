import { getStore } from "@netlify/blobs";
function ordersStore(){const siteID=process.env.NETLIFY_SITE_ID||undefined;return getStore({name:"flamebachi-orders",consistency:"strong",...(siteID?{siteID}:{})});}
export async function saveOrder(order){await ordersStore().setJSON(order.id,order);return order;}
export async function getOrder(id){return await ordersStore().get(id,{type:"json",consistency:"strong"});}
export async function updateOrder(id,patch){const order=await getOrder(id);if(!order)return null;const next={...order,...patch,updatedAt:new Date().toISOString()};await saveOrder(next);return next;}
export async function listOrders(){
  const out=[];let cursor;
  do{const page=await ordersStore().list({cursor,limit:100});for(const b of page.blobs||[]){const o=await ordersStore().get(b.key,{type:'json'});if(o)out.push(o)}cursor=page.cursor;}while(cursor);
  return out.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
}
