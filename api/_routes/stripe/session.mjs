const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const env=(name)=>{const v=process.env[name]; if(!v) throw new Error(`${name} is not configured`); return v;};

const __handler=async req=>{
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  try{
    const b=await req.json();
    const orderId=String(b.orderId||"");
    const paymentIntentId=String(b.paymentIntentId||"");
    if(!orderId||!paymentIntentId) return json({error:"Order ID and payment intent ID are required."},400);

    const {getOrder,updateOrder}=await import("../../_lib/orders.mjs");
    const order=await getOrder(orderId);
    if(!order) return json({error:"Order not found."},404);
    const connected=env("STRIPE_CONNECTED_ACCOUNT_ID");
    if(order.status==="PAID") return json({paid:true,order});

    const r=await fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(paymentIntentId)}`,{
      headers:{Authorization:`Bearer ${env("STRIPE_SECRET_KEY")}`,"Stripe-Account":connected}
    });
    const paymentIntent=await r.json();
    if(!r.ok) return json({error:"Unable to verify Stripe payment.",detail:paymentIntent?.error?.message||paymentIntent},502);
    if(paymentIntent.metadata?.order_id!==order.id) return json({error:"Stripe payment does not match this order."},409);
    if(Number(paymentIntent.amount)!==Number(order.totalC)) return json({error:"Stripe amount does not match the order total."},409);

    if(paymentIntent.status==="succeeded"){
      const paid=await updateOrder(order.id,{
        status:"PAID",
        paymentState:"SUCCEEDED",
        paidAt:new Date().toISOString(),
        stripePaymentIntentId:paymentIntent.id,
        paymentIntentStatus:paymentIntent.status
      });
      return json({paid:true,order:paid});
    }

    if(["processing","requires_action","requires_confirmation","requires_payment_method"].includes(paymentIntent.status)){
      const next=await updateOrder(order.id,{paymentState:paymentIntent.status,paymentIntentStatus:paymentIntent.status});
      return json({paid:false,status:paymentIntent.status,order:next});
    }
    return json({paid:false,status:paymentIntent.status,order});
  }catch(e){return json({error:e?.message||"Unable to verify payment."},500)}
};
export default { fetch: __handler };
