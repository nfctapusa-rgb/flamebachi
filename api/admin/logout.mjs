import { json, cors, sessionCookie } from '../../lib/admin-auth.mjs';
const __handler=async req=>{if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});return json({ok:true},200,{...cors(req),'set-cookie':sessionCookie(req,'',0)});};
export default { fetch: __handler };
