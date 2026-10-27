const STRIPE_API='https://api.stripe.com/v1';

function stripeErrorMessage(data){
  return data?.error?.message || data?.error?.code || 'Stripe payment-method domain request failed.';
}

function hostnameFromRequest(req){
  const override=process.env.PAYMENT_METHOD_DOMAIN || '';
  if(override.trim()) return override.trim().replace(/^https?:\/\//,'').split('/')[0].toLowerCase();
  const origin=req.headers.get('origin') || '';
  try{
    if(origin) return new URL(origin).hostname.toLowerCase();
  }catch{}
  try{return new URL(req.url).hostname.toLowerCase();}catch{return ''}
}

export async function ensureStripePaymentMethodDomain(req,{secretKey,connectedAccount}){
  const domain=hostnameFromRequest(req);
  if(!domain || domain==='localhost' || /^127(?:\.|$)/.test(domain) || domain.endsWith('.local')){
    return {registered:false,domain:null,skipped:true};
  }
  if(!/^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain)){
    throw new Error(`Invalid payment domain: ${domain}`);
  }

  const headers={
    Authorization:`Bearer ${secretKey}`,
    'Stripe-Account':connectedAccount,
    'Content-Type':'application/x-www-form-urlencoded'
  };

  // Registration is idempotent at the application level: if the domain already
  // exists on this connected account, treat it as successfully registered.
  const list=await fetch(`${STRIPE_API}/payment_method_domains?limit=100`,{headers});
  const listed=await list.json().catch(()=>({}));
  if(!list.ok) throw new Error(`Stripe domain lookup failed: ${stripeErrorMessage(listed)}`);
  const existing=(listed.data||[]).find(x=>String(x.domain_name||'').toLowerCase()===domain);
  if(existing){
    return {registered:true,domain,created:false,id:existing.id,applePay:existing.apple_pay?.status||existing.apple_pay?.enabled,googlePay:existing.google_pay?.status||existing.google_pay?.enabled};
  }

  const body=new URLSearchParams({domain_name:domain});
  const created=await fetch(`${STRIPE_API}/payment_method_domains`,{method:'POST',headers,body});
  const data=await created.json().catch(()=>({}));
  if(!created.ok){
    if(data?.error?.code==='resource_already_exists') return {registered:true,domain,created:false};
    throw new Error(`Stripe domain registration failed: ${stripeErrorMessage(data)}`);
  }
  return {registered:true,domain,created:true,id:data.id,applePay:data.apple_pay?.status||data.apple_pay?.enabled,googlePay:data.google_pay?.status||data.google_pay?.enabled};
}
