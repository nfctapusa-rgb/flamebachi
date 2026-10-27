function env(n){return process.env[n]||''}
const esc=s=>String(s||'').replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
export function receiptHtml(order){
  const rows=(order.items||[]).map(i=>`<tr><td style="padding:7px 0">${i.qty} × ${esc(i.name)}</td><td style="padding:7px 0;text-align:right">$${(Number(i.lineTotalC||0)/100).toFixed(2)}</td></tr>`).join('');
  const reviewUrl='https://www.google.com/maps/search/?api=1&query=Flamebachi%20225%20W%207th%20St%20Los%20Angeles%20CA%2090014';
  const orderAgain='https://flamebachi.com/online-menu/';
  return `<!doctype html><html><body style="margin:0;background:#f5f5f3;font-family:Arial,sans-serif;color:#111"><div style="max-width:600px;margin:0 auto;padding:24px"><div style="background:#fff;border-radius:16px;padding:24px"><h2 style="margin:0 0 6px">Flamebachi</h2><p style="margin:0 0 18px;color:#666">Order <strong>${esc(order.orderNumber)}</strong></p><p>Customer: ${esc(order.customer?.name)}<br>Pickup: ${esc(order.location)}</p><table style="width:100%;border-collapse:collapse">${rows}</table><hr style="border:0;border-top:1px solid #ddd"><p>Subtotal: $${(order.subtotalC/100).toFixed(2)}<br>Tax: $${(order.taxC/100).toFixed(2)}<br><strong>Total: $${(order.totalC/100).toFixed(2)}</strong></p><p>Payment: ${esc(order.paymentMethod||'')}</p><div style="margin-top:24px"><a href="${orderAgain}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:13px 18px;border-radius:10px;margin:0 8px 8px 0;font-weight:bold">Order Again</a><a href="${reviewUrl}" style="display:inline-block;background:#f0f0ed;color:#111;text-decoration:none;padding:13px 18px;border-radius:10px;margin:0 0 8px 0;font-weight:bold">★★★★★ Leave a Review</a></div><p style="margin-top:24px;color:#666;font-size:13px">Thanks for ordering from Flamebachi.</p></div></div></body></html>`;
}

export async function sendEmailReceipt(order,email){
  const key=env('RESEND_API_KEY'); const from=env('RECEIPT_FROM_EMAIL')||'Flamebachi <receipts@flamebachi.com>';
  if(!key) throw new Error('RESEND_API_KEY is not configured.');
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:`Flamebachi receipt ${order.orderNumber}`,html:receiptHtml(order)})});
  const data=await r.json().catch(()=>({})); if(!r.ok)throw new Error(data?.message||'Email provider rejected the receipt.'); return data;
}
export async function sendSmsReceipt(order,phone){
  const sid=env('TWILIO_ACCOUNT_SID'), token=env('TWILIO_AUTH_TOKEN'), from=env('TWILIO_FROM_NUMBER');
  if(!sid||!token||!from) throw new Error('Twilio SMS settings are not configured.');
  const body=`Flamebachi order ${order.orderNumber}: ${order.paymentMethod==='cash'?'Pay cash at pickup.':'Payment received.'} Total $${(order.totalC/100).toFixed(2)}. Pickup ${order.location}.`;
  const auth=Buffer.from(`${sid}:${token}`).toString('base64'); const p=new URLSearchParams({To:phone,From:from,Body:body});
  const r=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,{method:'POST',headers:{Authorization:`Basic ${auth}`,'Content-Type':'application/x-www-form-urlencoded'},body:p});
  const data=await r.json().catch(()=>({})); if(!r.ok)throw new Error(data?.message||'SMS provider rejected the receipt.'); return data;
}
