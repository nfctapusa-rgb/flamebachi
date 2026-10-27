import { getStore } from './store.mjs';
const ordersStore=()=>getStore({name:"flamebachi-orders"});
export async function saveOrder(order){await ordersStore().setJSON(order.id,order);return order;}
export async function getOrder(id){return await ordersStore().get(id,{type:"json"});}
export async function updateOrder(id,patch){const order=await getOrder(id);if(!order)return null;const next={...order,...patch,updatedAt:new Date().toISOString()};await saveOrder(next);return next;}
export async function listOrders(){
  const out=await ordersStore().values();
  return out.sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt)));
}
