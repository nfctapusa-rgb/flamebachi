const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const env=(name)=>{const v=process.env[name]; if(!v) throw new Error(`${name} is not configured`); return v;};

function encodeForm(entries){
  const p=new URLSearchParams();
  for(const [k,v] of entries) p.append(k,String(v));
  return p.toString();
}

const __handler=async (req)=>{
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  try{
    const b=await req.json();
    const orderId=String(b.orderId||"");
    if(!orderId) return json({error:"Order ID is required."},400);

    const {getOrder,updateOrder}=await import("../../lib/orders.mjs");
    const order=await getOrder(orderId);
    if(!order) return json({error:"Order not found."},404);
    if(order.status==="PAID") return json({error:"Order is already paid.",paid:true},409);
    if(!Number.isInteger(order.totalC)||order.totalC<50) return json({error:"Order total is invalid."},400);

    const secret=env("STRIPE_SECRET_KEY");
    const connected=env("STRIPE_CONNECTED_ACCOUNT_ID");

    // Direct charges run on the connected account. Wallets such as Apple Pay and
    // Google Pay require the payment domain to be registered on that same account.
    // Register the current restaurant site automatically so every restaurant
    // package can enable wallets without a manual Stripe-dashboard step.
    const {ensureStripePaymentMethodDomain}=await import("../../lib/stripe-payment-domain.mjs");
    const paymentDomain=await ensureStripePaymentMethodDomain(req,{secretKey:secret,connectedAccount:connected});
    const feePercent=Number(process.env["GOODTABLE_FEE_PERCENT"]||"1");
    if(!Number.isFinite(feePercent)||feePercent<0||feePercent>10) return json({error:"GOODTABLE_FEE_PERCENT must be between 0 and 10."},500);
    const fee=Math.round(order.totalC*(feePercent/100));

    const params=[
      ["amount",order.totalC],
      ["currency","usd"],
      ["automatic_payment_methods[enabled]","true"],
      ["description",`Flamebachi pickup ${order.orderNumber}`],
      ["application_fee_amount",fee],
      ["metadata[order_id]",order.id],
      ["metadata[order_number]",order.orderNumber],
      ["metadata[location]",order.location],
      ["receipt_email",order.customer?.email||""]
    ].filter(([,v])=>v!=="");

    const response=await fetch("https://api.stripe.com/v1/payment_intents",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${secret}`,
        "Stripe-Account":connected,
        "Content-Type":"application/x-www-form-urlencoded",
        "Idempotency-Key":`flamebachi-payment-intent-${order.id}`
      },
      body:encodeForm(params)
    });
    const data=await response.json();
    if(!response.ok) return json({error:"Stripe rejected the payment setup.",code:data?.error?.code||"stripe_error"},502);

    const updated=await updateOrder(order.id,{
      paymentProvider:"stripe",
      paymentIntentId:data.id,
      paymentState:data.status||"requires_payment_method",
      platformFeeC:fee,
      platformFeePercent:feePercent,
      stripeConnectedAccountId:connected,
      stripeChargeType:"direct_charge",
      paymentIntentStatus:data.status||"requires_payment_method",
      paymentMethodDomain:paymentDomain.domain||null,
      paymentMethodDomainRegistered:!!paymentDomain.registered
    });

    return json({clientSecret:data.client_secret,paymentIntentId:data.id,orderId:order.id,totalC:order.totalC,publishableKey:env("STRIPE_PUBLISHABLE_KEY"),stripeConnectedAccountId:connected,paymentMethodDomain:paymentDomain.domain||null,paymentMethodDomainRegistered:!!paymentDomain.registered,order:updated});
  }catch(e){return json({error:e?.message||"Unable to create Stripe payment."},500)}
};
export default { fetch: __handler };
