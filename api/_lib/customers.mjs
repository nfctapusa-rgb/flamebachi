import { getStore } from './store.mjs';
const store=()=>getStore({name:'flamebachi-customers',consistency:'strong'});
const key=v=>encodeURIComponent(String(v||'').trim().toLowerCase().replace(/[^a-z0-9@+._-]/g,''));
export async function saveCustomer(c){const identity=c.phone||c.email||c.id;const k=key(identity);const existing=await store().get(k,{type:'json',consistency:'strong'});const next={...(existing||{}),...c,id:existing?.id||crypto.randomUUID(),updatedAt:new Date().toISOString(),orderCount:Number(existing?.orderCount||existing?.order_count||0)+Number(c.incrementOrderCount||0),lifetimeSpendC:Number(existing?.lifetimeSpendC||existing?.lifetime_spend_cents||0)+Number(c.incrementSpendC||0)};delete next.incrementOrderCount;delete next.incrementSpendC;await store().setJSON(k,next);return next;}
export async function getCustomer(identity){return await store().get(key(identity),{type:'json',consistency:'strong'});}
export async function listCustomers(){return await store().values();}