import {json,requireMember,handleError,supa} from '../../_lib/gt.mjs';
const __handler=async req=>{try{const x=await requireMember(req);const [orders,customers]=await Promise.all([
  supa(`orders?restaurant_id=eq.${x.restaurantId}&select=id,order_number,status,payment_method,payment_status,total_cents,channel,created_at,customer_id&order=created_at.desc&limit=100`),
  supa(`customers?restaurant_id=eq.${x.restaurantId}&select=id,name,phone,email,order_count,lifetime_spend_cents,last_order_at&order=last_order_at.desc&limit=100`)
]);
const completed=orders.filter(o=>o.status==='COMPLETED');
const sales=completed.reduce((a,o)=>a+o.total_cents,0);
return json({salesCents:sales,ordersToday:orders.filter(o=>new Date(o.created_at).toDateString()===new Date().toDateString()).length,customers,orders})
}catch(e){return handleError(e)}};
export default { fetch: __handler };
