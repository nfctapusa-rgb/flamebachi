import { requireAdmin, json, cors } from '../../lib/admin-auth.mjs';
import { getOrder, updateOrder } from '../../lib/orders.mjs';
import { saveCustomer } from '../../lib/customers.mjs';
const __handler=async req=>{
  if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});
  try{
    requireAdmin(req); if(req.method!=='PATCH')return json({error:'Method not allowed'},405,cors(req));
    const b=await req.json(); const id=String(b.orderId||''); const status=String(b.status||'');
    const allowed=['CASH_PENDING','PAID','PREPARING','READY','COMPLETED','CANCELLED','REFUNDED'];
    if(!id||!allowed.includes(status))return json({error:'Invalid order update.'},400,cors(req));
    const old=await getOrder(id); if(!old)return json({error:'Order not found.'},404,cors(req));
    const patch={status};
    if(status==='ACCEPTED') patch.acceptedAt=new Date().toISOString();
    if(status==='COMPLETED') patch.completedAt=new Date().toISOString();
    if(status==='CANCELLED') patch.cancelledAt=new Date().toISOString();
    if(status==='PAID'&&old.paymentMethod==='cash'&&!old.cashPaidAt)patch.cashPaidAt=new Date().toISOString();
    const next=await updateOrder(id,patch);
    if(status==='COMPLETED' && old.status!=='COMPLETED' && old.customer){
      await saveCustomer({phone:old.customer.phone,email:old.customer.email,name:old.customer.name,lastOrderAt:next.completedAt||new Date().toISOString(),incrementOrderCount:1,incrementSpendC:Number(old.totalC||0)});
    }
    return json({order:next},200,cors(req));
  }catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to update order.'},e.message==='Unauthorized'?401:500,cors(req));}
};
export default { fetch: __handler };
