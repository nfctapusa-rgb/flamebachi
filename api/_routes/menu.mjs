import { getStore } from '../_lib/store.mjs';
import { ITEMS } from '../_lib/menu.mjs';
const store=()=>getStore({name:'flamebachi-menu',consistency:'strong'});
const __handler=async req=>{try{const saved=await store().get('menu',{type:'json',consistency:'strong'});return new Response(JSON.stringify({items:saved?.items||ITEMS}),{headers:{'content-type':'application/json','cache-control':'no-store'}})}catch(e){return new Response(JSON.stringify({items:ITEMS}),{headers:{'content-type':'application/json'}})}};
export default { fetch: __handler };
