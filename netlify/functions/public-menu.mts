import { getStore } from '@netlify/blobs';
import { ITEMS } from './shared/menu.mjs';
const store=()=>getStore({name:'flamebachi-menu',consistency:'strong'});
export default async req=>{try{const saved=await store().get('menu',{type:'json',consistency:'strong'});return new Response(JSON.stringify({items:saved?.items||ITEMS}),{headers:{'content-type':'application/json','cache-control':'no-store'}})}catch(e){return new Response(JSON.stringify({items:ITEMS}),{headers:{'content-type':'application/json'}})}};
export const config={path:'/api/menu'};