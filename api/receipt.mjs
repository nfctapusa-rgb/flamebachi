import { getOrder, updateOrder } from "../lib/orders.mjs";
import { sendEmailReceipt, sendSmsReceipt } from "../lib/receipts.mjs";
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const validEmail=v=>/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
const validPhone=v=>/^[+\d][\d\s().-]{7,}$/.test(v);
const __handler=async req=>{
 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 try{
  const b=await req.json(); const id=String(b.orderId||""), method=String(b.method||"email"), contact=String(b.contact||"").trim();
  if(!id||!contact)return json({error:"Receipt contact is required."},400);
  if(method==="email"&&!validEmail(contact))return json({error:"Enter a valid email."},400);
  if(method==="text"&&!validPhone(contact))return json({error:"Enter a valid mobile number."},400);
  if(!["email","text"].includes(method))return json({error:"Invalid receipt method."},400);
  const order=await getOrder(id); if(!order)return json({error:"Order not found."},404);
  if(!["CASH_PENDING","PAID","PREPARING","READY","COMPLETED"].includes(order.status))return json({error:"This order is not ready for a receipt yet."},409);
  const patch={receiptMethod:method,receiptContact:contact,receiptSentAt:new Date().toISOString()};
  if(method==="email") await sendEmailReceipt(order,contact); else await sendSmsReceipt(order,contact);
  const next=await updateOrder(order.id,patch);
  return json({sent:true,order:next});
 }catch(e){return json({error:e.message||"Unable to send receipt."},500)}
};
export default { fetch: __handler };
