import crypto from "node:crypto";
import {getOrder,updateOrder} from "./shared/orders.mjs";

const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const env=(name)=>{const v=Netlify.env.get(name); if(!v) throw new Error(`${name} is not configured`); return v;};

function secureEqual(a,b){
  const aa=Buffer.from(a),bb=Buffer.from(b);
  return aa.length===bb.length && crypto.timingSafeEqual(aa,bb);
}
function verifyStripeSignature(payload,header,secret){
  const parts=String(header||"").split(",");
  const timestamp=parts.find(x=>x.startsWith("t="))?.slice(2);
  const signatures=parts.filter(x=>x.startsWith("v1=")).map(x=>x.slice(3));
  if(!timestamp||!signatures.length) return false;
  const age=Math.abs(Math.floor(Date.now()/1000)-Number(timestamp));
  if(!Number.isFinite(age)||age>300) return false;
  const signed=`${timestamp}.${payload}`;
  const expected=crypto.createHmac("sha256",secret).update(signed).digest("hex");
  return signatures.some(sig=>secureEqual(sig,expected));
}

export default async req=>{
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  try{
    const raw=await req.text();
    const signature=req.headers.get("stripe-signature");
    if(!verifyStripeSignature(raw,signature,env("STRIPE_WEBHOOK_SECRET"))) return json({error:"Invalid signature"},400);

    const event=JSON.parse(raw);
    if(event.type==="payment_intent.succeeded" || event.type==="payment_intent.processing" || event.type==="payment_intent.payment_failed" || event.type==="payment_intent.canceled"){
      const intent=event.data?.object;
      const orderId=intent?.metadata?.order_id;
      if(orderId){
        const order=await getOrder(orderId);
        if(order){
          const patch={
            stripePaymentIntentId:intent.id,
            paymentIntentStatus:intent.status,
            paymentState:intent.status
          };
          if(event.type==="payment_intent.succeeded") Object.assign(patch,{status:"PAID",paymentState:"SUCCEEDED",paidAt:new Date().toISOString()});
          else if(event.type==="payment_intent.payment_failed") Object.assign(patch,{status:order.status==="PAID"?"PAID":"PAYMENT_FAILED"});
          else if(event.type==="payment_intent.canceled") Object.assign(patch,{status:order.status==="PAID"?"PAID":"CANCELED"});
          await updateOrder(orderId,patch);
        }
      }
    }

    // Kept for backwards compatibility with older hosted-checkout orders.
    if(event.type==="checkout.session.completed" || event.type==="checkout.session.async_payment_succeeded"){
      const session=event.data?.object;
      if(session?.payment_status==="paid" || event.type.endsWith("succeeded")){
        const orderId=session?.metadata?.order_id||session?.client_reference_id;
        if(orderId){
          const order=await getOrder(orderId);
          if(order && order.status!=="PAID"){
            await updateOrder(orderId,{status:"PAID",paymentState:"SUCCEEDED",paidAt:new Date().toISOString(),stripeSessionId:session.id,stripePaymentIntentId:session.payment_intent||null});
          }
        }
      }
    }
    return json({received:true});
  }catch(e){return json({error:"Webhook processing failed."},500)}
};
export const config={path:"/api/stripe/webhook"};
