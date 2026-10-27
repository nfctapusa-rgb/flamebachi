import {json,requireMember,handleError,supa} from './shared/gt.mjs';
export default async req=>{try{const x=await requireMember(req);const r=await supa(`restaurants?id=eq.${x.restaurantId}&select=id,name,slug,status`);return json({user:{id:x.user.id,email:x.user.email},role:x.role,restaurant:r[0]||null})}catch(e){return handleError(e)}};
export const config={path:'/api/gt/session'};
