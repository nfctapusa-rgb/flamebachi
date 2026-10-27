import {json,requireMember,handleError,supa} from '../../lib/gt.mjs';
const __handler=async req=>{try{const x=await requireMember(req,['owner','manager']);if(req.method==='GET'){
 const [r,l,p,pr,k]=await Promise.all([
  supa(`restaurants?id=eq.${x.restaurantId}&select=*`),supa(`locations?restaurant_id=eq.${x.restaurantId}&select=*`),supa(`payment_connections?restaurant_id=eq.${x.restaurantId}&select=id,provider,status,connected_account_id,merchant_id,location_id,updated_at`),supa(`printers?restaurant_id=eq.${x.restaurantId}&select=id,name,role,host,port,enabled,paired,location_id,updated_at`),supa(`kiosks?restaurant_id=eq.${x.restaurantId}&select=id,name,status,last_seen_at,location_id`)
 ]);return json({restaurant:r[0],locations:l,payments:p,printers:pr,kiosks:k});}
 return json({error:'Settings mutation endpoints are being added after the core read path is verified.'},501);
}catch(e){return handleError(e)}};
export default { fetch: __handler };
