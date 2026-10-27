import { getStore } from '../lib/store.mjs';
const store=()=>getStore({name:'flamebachi-media',consistency:'strong'});
const __handler=async req=>{const id=new URL(req.url).searchParams.get('id');if(!id)return new Response('Missing id',{status:400});const data=await store().get(id,{type:'arrayBuffer'});if(!data)return new Response('Not found',{status:404});const meta=await store().get(`meta:${id}`,{type:'json'});const type=meta?.mime||'image/jpeg';return new Response(data,{headers:{'content-type':type,'cache-control':'public,max-age=31536000,immutable'}})};
export default { fetch: __handler };
