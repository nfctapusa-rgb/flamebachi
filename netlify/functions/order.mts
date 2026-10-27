import { getOrder } from "./shared/orders.mjs";
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
export default async (req)=>{ const id=new URL(req.url).pathname.split("/").pop(); const order=await getOrder(id); if(!order) return json({error:"Order not found"},404); return json(order); };
export const config={path:"/api/orders/:id"};
