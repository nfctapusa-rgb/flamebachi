import { getStore } from '@netlify/blobs';
import { requireAdmin, json, cors } from './shared/admin-auth.mjs';
import { listOrders } from './shared/orders.mjs';
import { listCustomers } from './shared/customers.mjs';
import { ITEMS } from './shared/menu.mjs';
export default async req=>{
 if(req.method==='OPTIONS')return new Response('',{status:204,headers:cors(req)});
 try{
  requireAdmin(req);
  const [orders,customers,savedMenu,settings,printers,payments]=await Promise.all([
   listOrders(),listCustomers(),
   getStore({name:'flamebachi-menu',consistency:'strong'}).get('menu',{type:'json'}),
   getStore({name:'flamebachi-settings',consistency:'strong'}).get('site',{type:'json'}),
   getStore({name:'flamebachi-printers',consistency:'strong'}).get('config',{type:'json'}),
   getStore({name:'flamebachi-payments',consistency:'strong'}).get('config',{type:'json'})
  ]);
  const active=orders.filter(o=>!['COMPLETED','CANCELLED','REFUNDED','PAYMENT_FAILED','CANCELED'].includes(o.status));
  return json({
   restaurant:{name:settings?.businessName||'Flamebachi',location:'Downtown LA'},
   counts:{orders:orders.length,activeOrders:active.length,customers:customers.length,menuItems:(savedMenu?.items||ITEMS).length},
   integrations:{menu:true,orders:true,customers:true,analytics:true,printerBridge:printers?.bridge?.status||'not_paired',stripe:payments?.stripe?.status||'not_connected',clover:payments?.clover?.status||'awaiting_goodtable_setup'},
   lastOrder:orders[0]?.createdAt||null
  },200,cors(req));
 }catch(e){return json({error:e.message==='Unauthorized'?'Unauthorized':e.message||'Unable to load system status.'},e.message==='Unauthorized'?401:500,cors(req));}
};
export const config={path:'/api/admin/system'};
