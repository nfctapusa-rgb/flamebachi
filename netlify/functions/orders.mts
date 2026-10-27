import { Context } from "@netlify/functions";
import { randomUUID } from "node:crypto";
import { saveOrder } from "./shared/orders.mjs";
import { getStore } from "@netlify/blobs";
import { ITEMS, DRINKS, SAUCES, TAX_RATES, isDealLive } from "./shared/menu.mjs";
import { saveCustomer } from "./shared/customers.mjs";

const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json","cache-control":"no-store"}});
const cents=n=>Math.round(Number(n)*100);
function safeText(v,max=120){ return String(v??"").trim().slice(0,max); }

export default async (req,context)=>{
  if(req.method!=="POST") return json({error:"Method not allowed"},405);
  try{
    const b=await req.json();
    const customer={name:safeText(b.name,80),phone:safeText(b.phone,30),email:safeText(b.email,120).toLowerCase(),emailOptIn:Boolean(b.emailOptIn),smsOptIn:Boolean(b.smsOptIn)};
    const location=safeText(b.location,80);
    const menuStore=getStore({name:"flamebachi-menu",consistency:"strong"});
    const savedMenu=await menuStore.get("menu",{type:"json",consistency:"strong"});
    const activeItems=Array.isArray(savedMenu?.items)?savedMenu.items:ITEMS;
    const source=b.source==="kiosk"?"kiosk":"online";
    const paymentMethod=b.paymentMethod==="cash"?"cash":"card";
    if(!customer.name||!customer.phone||!location) return json({error:"Name, phone and pickup location are required."},400);
    if(!Array.isArray(b.items)||!b.items.length) return json({error:"Cart is empty."},400);

    const dealLive=isDealLive();
    const normalized=[];
    let subtotalC=0, discountC=0;
    for(const raw of b.items){
      const item=activeItems.find(x=>x[0]===raw.category&&x[1]===raw.name&&x[5]!==false)||null;
      if(!item) return json({error:`Unknown menu item: ${safeText(raw.name)}`},400);
      const qty=Math.max(1,Math.min(20,Number(raw.qty)||1));
      let drinkName="No drink", drinkPrice=0, sauceName="None", saucePrice=0, baseChoice="Standard", basePrice=0, substitutionPrice=0;
      const addons=Array.isArray(raw.addons)?raw.addons.slice(0,8).map(a=>({name:safeText(a?.name,60),price:Number(a?.price)||0})):[];
      const specialInstructions=safeText(raw.specialInstructions,240);
      const substitutions=Array.isArray(raw.substitutions)?raw.substitutions.slice(0,4).map(a=>({name:safeText(a?.name,80),price:Number(a?.price)||0})):[];

      if(["bowls","britos","plates","trios"].includes(item[0])){
        const baseMap={"Standard":0,"Fried Rice":0,"White Rice":0,"Garlic Noodles":3,"Half Fried Rice / Half Garlic Noodles":2};
        if(Object.prototype.hasOwnProperty.call(baseMap,String(raw.baseChoice||"Standard"))){baseChoice=String(raw.baseChoice||"Standard");basePrice=baseMap[baseChoice];}
        const d=DRINKS.find(x=>x[0]===raw.drink) || DRINKS[0];
        const s=SAUCES.find(x=>x[0]===raw.sauce) || SAUCES[0];
        drinkName=d[0]; drinkPrice=d[1]; sauceName=s[0]; saucePrice=s[1];
        if(dealLive && item[0]==="bowls"){
          if(["Coke","Sprite","Bottled Water"].includes(drinkName)){ discountC += cents(drinkPrice)*qty; drinkPrice=0; }
          else if(drinkName.includes("Agua Fresca")){ discountC += Math.round(cents(drinkPrice)*0.5)*qty; drinkPrice=drinkPrice*0.5; }
        }
      } else if(item[0]==="drinks"){
        const d=DRINKS.find(x=>x[0]===raw.drink) || null;
        if(d && d[0]!=="No drink"){ drinkName=d[0]; drinkPrice=d[1]; }
        else { drinkName=item[1]; drinkPrice=item[2]; }
      } else if(item[0]==="sauces"){
        sauceName=item[1]; saucePrice=item[2];
      }
      const allowedSubstitutions={
        "Half Fried Rice / Half Garlic Noodles": item[0]==="bowls"?2.5:2,
        "Sub Garlic Noodles": item[0]==="plates"?4:item[0]==="bowls"?3.5:3,
        "Sub Shrimp → Salmon": item[0]==="trios"?6:3,
        "Sub Shrimp → Ahi Tuna": item[0]==="trios"?6:3,
        "Sub Shrimp → Scallops": item[0]==="trios"?6:3,
        "Sub Any 2 Shrimp → Seafood":8
      };
      const safeSubstitutions=substitutions.filter(a=>Object.prototype.hasOwnProperty.call(allowedSubstitutions,a.name)).map(a=>({name:a.name,price:allowedSubstitutions[a.name]}));
      substitutionPrice=safeSubstitutions.reduce((sum,a)=>sum+Number(a.price||0),0);
      const allowedAddons={"Cheese":1.5,"Lemon Wedges":1,"Extra Chicken Breast":9,"Extra Shrimp":10,"Extra NY Steak":10,"Extra Salmon":10,"Extra Scallops":10,"Extra Filet Mignon":11};
      const safeAddons=addons.filter(a=>Object.prototype.hasOwnProperty.call(allowedAddons,a.name)).map(a=>({name:a.name,price:allowedAddons[a.name]}));
      const addonC=safeAddons.reduce((sum,a)=>sum+cents(a.price),0)/100;
      const lineBase=Number(item[2])+drinkPrice+saucePrice+basePrice+substitutionPrice+addonC;
      subtotalC += cents(lineBase)*qty;
      normalized.push({category:item[0],name:item[1],qty,itemPrice:Number(item[2]),drink:drinkName,drinkPrice,sauce:sauceName,saucePrice,baseChoice,basePrice,substitutions:safeSubstitutions,substitutionPrice,addons:safeAddons,specialInstructions,lineTotalC:cents(lineBase)*qty});
    }
    // Current rates for the two locations represented by this prototype. Keep this server-authoritative.
    // CDTFA rates effective October 1, 2026: Los Angeles 10.250%; Jurupa Valley 7.750%.
    const taxRate=Number(TAX_RATES[location] ?? TAX_RATES["Downtown LA"]);
    const taxableSubtotalC=Math.max(0,subtotalC-discountC);
    const taxC=Math.round(taxableSubtotalC*(taxRate/100));
    const totalC=taxableSubtotalC+taxC;
    const order={id:randomUUID(),orderNumber:`FLM-${Math.floor(1000+Math.random()*9000)}`,source,customer,location,status:paymentMethod==="cash"?"CASH_PENDING":"PENDING_PAYMENT",paymentMethod,items:normalized,subtotalC,discountC,taxableSubtotalC,taxRate,taxC,totalC,currency:"USD",dealLive,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
    await saveOrder(order);
    if(customer.email || customer.phone){ await saveCustomer({phone:customer.phone,email:customer.email,name:customer.name,lastOrderAt:order.createdAt}); }
    return json({orderId:order.id,orderNumber:order.orderNumber,totalC,order});
  }catch(e){
    console.error("[orders] create failed", e);
    return json({error:"Unable to create order.",detail:String(e?.message||e||"Unknown server error")},500);
  }
};
export const config={path:"/api/orders"};
