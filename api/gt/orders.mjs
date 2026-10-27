import {json,requireMember,handleError,supa} from '../../lib/gt.mjs';
const allowed={NEW:['ACCEPTED','CANCELLED'],ACCEPTED:['PREPARING','CANCELLED'],PREPARING:['READY','CANCELLED'],READY:['COMPLETED'],COMPLETED:[],CANCELLED:[]};
const __handler=async req=>{try{const x=await requireMember(req);if(req.method==='GET'){
 const status=new URL(req.url).searchParams.get('status');
 let q=`orders?restaurant_id=eq.${x.restaurantId}&select=*&order=created_at.desc&limit=100`;
 if(status) q=`orders?restaurant_id=eq.${x.restaurantId}&status=eq.${encodeURIComponent(status)}&select=*&order=created_at.desc&limit=100`;
 return json({orders:await supa(q)});
 }
 if(req.method!=='PATCH') return json({error:'Method not allowed'},405);
 const b=await req.json();const rows=await supa(`orders?id=eq.${encodeURIComponent(b.orderId)}&restaurant_id=eq.${x.restaurantId}&select=id,status&limit=1`);const o=rows[0];if(!o)return json({error:'Order not found'},404);
 if(!allowed[o.status]?.includes(b.status))return json({error:`Cannot move ${o.status} to ${b.status}`},409);
 const patch={status:b.status,updated_at:new Date().toISOString()};if(b.status==='ACCEPTED')patch.accepted_at=new Date().toISOString();if(b.status==='COMPLETED')patch.completed_at=new Date().toISOString();if(b.status==='CANCELLED')patch.cancelled_at=new Date().toISOString();
 const out=await supa(`orders?id=eq.${encodeURIComponent(o.id)}&restaurant_id=eq.${x.restaurantId}`,{method:'PATCH',body:JSON.stringify(patch)});await supa('audit_logs',{method:'POST',body:JSON.stringify({restaurant_id:x.restaurantId,user_id:x.user.id,action:`ORDER_${b.status}`,entity_type:'order',entity_id:o.id,metadata:{from:o.status,to:b.status}})});return json({order:out[0]});
}catch(e){return handleError(e)}};
export default { fetch: __handler };
