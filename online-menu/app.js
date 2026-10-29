const IMG='assets/';
// ===== MENU DATA (generated: mirrors the Flamebachi Uber Eats menu, in-store prices) =====
const categories=[{"id": "bowls", "name": "Bachi Bowls", "kind": "bowl", "note": "Choice of fried or white rice & veggies. 1/2 rice + 1/2 garlic noodles +$2.50. Sub garlic noodles +$3.50."}, {"id": "double-bowls", "name": "Double Bowls", "kind": "bowl", "note": "Two proteins over fried or white rice & veggies."}, {"id": "trio-bowls", "name": "Trio Bowls", "kind": "bowl", "note": "Three proteins over fried or white rice & veggies."}, {"id": "burritos", "name": "Burritos", "kind": "burrito", "note": "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of drizzled sauce."}, {"id": "drinks", "name": "Drink", "kind": "drink", "note": ""}, {"id": "sauces", "name": "Sauces", "kind": "simple", "note": ""}, {"id": "single-plates", "name": "Single Plates", "kind": "plate", "note": "Served with your choice of fried rice, half fried rice and half garlic noodles, or garlic noodles, plus veggies."}, {"id": "double-plates", "name": "Double Plates", "kind": "plate", "note": "Two proteins with rice & veggies."}, {"id": "trio-plates", "name": "Trio Plates", "kind": "trio", "note": "Three proteins with rice & veggies. Sub Tuna, Salmon or Scallops for Shrimp +$6 (or any 2 +$8)."}, {"id": "seafood-supreme", "name": "Seafood Supreme", "kind": "plate", "note": ""}, {"id": "sides", "name": "Sides", "kind": "side", "note": ""}, {"id": "a-la-carte", "name": "A La Carte", "kind": "side", "note": "Proteins on their own."}, {"id": "extras", "name": "Extras", "kind": "simple", "note": ""}, {"id": "party-trays", "name": "Single Party Trays", "kind": "simple", "note": "Serves 12."}, {"id": "party-sides", "name": "Party Tray Sides", "kind": "simple", "note": ""}, {"id": "pint-sauces", "name": "1 Pint Sauces", "kind": "simple", "note": ""}];
const POPULAR=["Chicken Bowl", "NY Steak & Lobster Bowl", "Strawberry Jamaica Agua Fresca"];
const items=[
 ["bowls", "Chicken Bowl", 15.5, "Choice of fried or white rice & veggies.", "thumbs/menu-chicken-bowl.jpg"],
 ["bowls", "Shrimp Bowl", 18.5, "Choice of fried or white rice & veggies.", ""],
 ["bowls", "NY Steak Bowl", 18.5, "Choice of fried or white rice & veggies.", ""],
 ["bowls", "Salmon Bowl", 18.5, "Choice of fried or white rice & veggies.", ""],
 ["bowls", "Filet Mignon Bowl", 20.5, "Choice of fried or white rice & veggies.", ""],
 ["bowls", "Seared Rare Ahi Tuna Bowl", 18, "Choice of fried or white rice & veggies.", ""],
 ["bowls", "Scallops Bowl", 18.5, "Choice of fried or white rice & veggies.", ""],
 ["bowls", "Lobster Bowl", 29.5, "Choice of fried or white rice & veggies.", ""],
 ["double-bowls", "Shrimp & Salmon Bowl", 24, "With your choice of fried or white rice & veggies.", "thumbs/food-4.jpg"],
 ["double-bowls", "Chicken & Salmon Bowl", 24, "With your choice of fried or white rice & veggies.", ""],
 ["double-bowls", "Shrimp & Chicken Bowl", 22, "With your choice of fried or white rice & veggies.", ""],
 ["double-bowls", "NY Steak & Shrimp Bowl", 24, "With your choice of fried or white rice & veggies.", ""],
 ["double-bowls", "NY Steak & Chicken Bowl", 23, "With your choice of fried or white rice & veggies.", "thumbs/menu-steak-chicken.jpg"],
 ["double-bowls", "NY Steak & Lobster Bowl", 40, "With your choice of fried or white rice & veggies.", "thumbs/food-1.jpg"],
 ["double-bowls", "Filet Mignon & Salmon Bowl", 27, "With your choice of fried or white rice & veggies.", ""],
 ["double-bowls", "Filet Mignon & Shrimp Bowl", 26, "With your choice of fried or white rice & veggies.", ""],
 ["double-bowls", "Filet Mignon & Chicken Bowl", 25, "With your choice of fried or white rice & veggies.", ""],
 ["double-bowls", "Filet Mignon & Lobster Bowl", 42, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "NY Steak, Chicken & Shrimp Bowl", 30, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "NY Steak, Shrimp & Lobster Bowl", 43, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "NY Steak, Chicken & Salmon Bowl", 33, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "Filet Mignon, Chicken & Shrimp Bowl", 32, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "Filet Mignon, Shrimp & Lobster Bowl", 45, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "Filet Mignon, Chicken & Salmon Bowl", 35, "With your choice of fried or white rice & veggies.", ""],
 ["trio-bowls", "Salmon, Ahi Tuna & Scallops Bowl", 34, "With your choice of fried or white rice & veggies.", ""],
 ["burritos", "Chicken Breast Burrito", 12, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "NY Steak Burrito", 16, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Filet Mignon Burrito", 18, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Shrimp Burrito", 14, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Salmon Burrito", 15, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Scallops Burrito", 15, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Lobster Burrito", 31, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Ahi Tuna Burrito", 15, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Veggie Burrito", 12, "Hibachi veggies, rice and cheese in a flour tortilla.", ""],
 ["burritos", "NY Steak, Chicken & Shrimp Burrito", 27, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["burritos", "Filet Mignon, Chicken & Shrimp Burrito", 29, "Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of sauce.", ""],
 ["drinks", "Coke Can", 2.5, "", ""],
 ["drinks", "Sprite Can", 2.5, "", ""],
 ["drinks", "Water Bottle", 2, "", ""],
 ["drinks", "Strawberry Jamaica Agua Fresca", 6.5, "House-made strawberry jamaica agua fresca.", "thumbs/menu-aguas-frescas.jpg"],
 ["drinks", "Pineapple Cucumber Agua Fresca", 6.5, "House-made pineapple cucumber agua fresca.", ""],
 ["sauces", "Dragon Sauce", 1, "", ""],
 ["sauces", "Smoked Teriyaki Sauce", 1, "", ""],
 ["sauces", "Lava Sauce", 1.5, "", ""],
 ["sauces", "Ginger Soy Sauce", 1, "", ""],
 ["sauces", "Agave Chile", 1, "", ""],
 ["single-plates", "Chicken Plate", 20, "Tender chicken breast served with your choice of fried rice, half fried rice and half garlic noodles, or garlic noodles.", ""],
 ["single-plates", "Shrimp Plate", 23, "Large shrimp served with your choice of fried rice, half fried rice and half garlic noodles, garlic noodles, or fries.", ""],
 ["single-plates", "NY Steak Plate", 26, "Served with your choice of rice or garlic noodles and veggies.", "thumbs/food-6.jpg"],
 ["single-plates", "Filet Mignon Plate", 30, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["single-plates", "Salmon Plate", 25, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["single-plates", "Seared Rare Ahi Tuna Plate", 25, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["single-plates", "Scallops Plate", 25, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["single-plates", "Lobster Plate", 36, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["single-plates", "Double Lobster Plate", 52, "Two lobster tails with rice & veggies.", ""],
 ["double-plates", "NY Steak & Shrimp Plate", 39, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "NY Steak & Salmon Plate", 40, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "NY Steak & Lobster Plate", 45, "Served with your choice of rice or garlic noodles and veggies.", "thumbs/menu-steak-lobster.jpg"],
 ["double-plates", "Chicken & Shrimp Plate", 34, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "Chicken & Salmon Plate", 34, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "Shrimp & Salmon Plate", 36, "Served with your choice of rice or garlic noodles and veggies.", "thumbs/menu-salmon-shrimp.jpg"],
 ["double-plates", "Filet Mignon & Shrimp Plate", 41, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "Filet Mignon & Chicken Plate", 32, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "Filet Mignon & Salmon Plate", 42, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["double-plates", "Filet Mignon & Lobster Plate", 47, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["trio-plates", "NY Steak, Chicken & Shrimp Plate", 41, "Served with your choice of rice or garlic noodles and veggies.", "thumbs/menu-steak-chicken-shrimp.jpg"],
 ["trio-plates", "NY Steak, Shrimp & Lobster Plate", 54, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["trio-plates", "NY Steak, Chicken & Salmon Plate", 43, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["trio-plates", "Porterhouse, Chicken & Shrimp Plate", 43, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["trio-plates", "Filet Mignon, Chicken & Shrimp Plate", 45, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["trio-plates", "Filet Mignon, Shrimp & Lobster Plate", 58, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["trio-plates", "Filet Mignon, Chicken & Salmon Plate", 47, "Served with your choice of rice or garlic noodles and veggies.", ""],
 ["seafood-supreme", "Seafood Supreme", 52, "Lobster, shrimp and your choice of ahi tuna, salmon or scallops (or any 2), with rice & veggies.", ""],
 ["sides", "Side Fried Rice", 9, "", ""],
 ["sides", "Side Garlic Noodles", 9, "", ""],
 ["sides", "Side Veggies", 6, "", ""],
 ["sides", "Side White Rice", 6, "", ""],
 ["sides", "Chicken Fried Rice", 13.5, "", ""],
 ["sides", "Shrimp Fried Rice", 15.5, "", ""],
 ["a-la-carte", "Lobster Tail", 25, "", ""],
 ["a-la-carte", "Double Lobster Tail", 45, "", ""],
 ["a-la-carte", "8oz Chicken", 14, "", ""],
 ["a-la-carte", "12 Shrimp", 18.5, "", ""],
 ["a-la-carte", "8oz NY Steak", 20, "", ""],
 ["a-la-carte", "8oz Filet Mignon", 21, "", ""],
 ["a-la-carte", "8oz Salmon", 19, "", ""],
 ["a-la-carte", "8oz Scallops", 19, "", ""],
 ["a-la-carte", "8oz Seared Rare Tuna", 19, "", ""],
 ["a-la-carte", "8oz Porterhouse", 21, "", ""],
 ["extras", "Plate", 1, "Extra to-go plate.", ""],
 ["extras", "Bowl", 1, "Extra to-go bowl.", ""],
 ["extras", "32oz Cup W/Ice", 1, "", ""],
 ["extras", "32oz Cup w/ Water & Ice", 1, "", ""],
 ["party-trays", "Chicken Breast (12 Person Serving)", 240, "", ""],
 ["party-trays", "NY Steak (12 Person Serving)", 310, "", ""],
 ["party-trays", "Shrimp (12 Person Serving)", 275, "", ""],
 ["party-trays", "Ahi Tuna (12 Person Serving)", 300, "", ""],
 ["party-trays", "Salmon (12 Person Serving)", 300, "", ""],
 ["party-trays", "Scallops (12 Person Serving)", 300, "", ""],
 ["party-sides", "Veggies (6 People)", 24, "", ""],
 ["party-sides", "White Rice (6 People)", 24, "", ""],
 ["party-sides", "Fried Rice (6 People)", 36, "", ""],
 ["party-sides", "Garlic Noodles (6 People)", 36, "", ""],
 ["party-sides", "Veggies (12 People)", 45, "", ""],
 ["party-sides", "White Rice (12 People)", 45, "", ""],
 ["party-sides", "Fried Rice (12 People)", 65, "", ""],
 ["party-sides", "Garlic Noodles (12 People)", 65, "", ""],
 ["party-sides", "Veggies (24 People)", 80, "", ""],
 ["party-sides", "White Rice (24 People)", 80, "", ""],
 ["party-sides", "Fried Rice (24 People)", 120, "", ""],
 ["party-sides", "Garlic Noodles (24 People)", 120, "", ""],
 ["pint-sauces", "Garlic Butter 1 Pint", 12, "", ""],
 ["pint-sauces", "Dragon 1 Pint", 8, "", ""],
 ["pint-sauces", "Agave Chile 1 Pint", 8, "", ""],
 ["pint-sauces", "Ginger Soy 1 Pint", 8, "", ""],
 ["pint-sauces", "Smoked Teriyaki 1 Pint", 8, "", ""],
 ["pint-sauces", "Lava Sauce 1 Pint", 12, "", ""]
];
// ===== END MENU DATA =====
const categoryMap=Object.fromEntries(categories.map(c=>[c.id,c]));
const kind=c=>categoryMap[c]?.kind||'simple';const MAIN_KINDS=['bowl','burrito','plate','trio'];
const sauceOptions=[["None", 0], ["Dragon", 1], ["Smoked Teriyaki", 1], ["Lava", 1.5], ["Ginger Soy", 1], ["Agave Chile", 1], ["Garlic Butter", 1.5]];
const drinkOptions=[["No drink", 0, ""], ["Coke", 2.5, "Can"], ["Sprite", 2.5, "Can"], ["Water Bottle", 2, ""], ["Strawberry Jamaica Agua Fresca", 6.5, "Agua Fresca"], ["Pineapple Cucumber Agua Fresca", 6.5, "Agua Fresca"]];
const baseOptions=[['Fried Rice',0],['White Rice',0],['Garlic Noodles',3],['Half Fried Rice / Half Garlic Noodles',2]];
const addOnOptions=[['Cheese',1.5],['Lemon Wedges',1],['Extra Chicken Breast',9],['Extra Shrimp',10],['Extra NY Steak',10],['Extra Salmon',10],['Extra Scallops',10],['Extra Filet Mignon',11]];
let cart=[];let activeItem=null;let activeOptions={drink:'No drink',drinkPrice:0,sauce:'None',saucePrice:0,baseChoice:'Standard',basePrice:0,substitutions:[],substitutionPrice:0,addons:[],specialInstructions:''};let customer=null;let stripeClient=null;let stripeElements=null;let paymentElement=null;let expressCheckoutElement=null;let paymentReady=false;let expressReady=false;let currentPaymentIntentId=null;let paymentBusy=false;
const $=s=>document.querySelector(s); const money=n=>'$'+Number(n).toFixed(2);
function isDealLive(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());const h=Number(parts.find(x=>x.type==='hour')?.value||0);return h<16}
function itemImage(name, explicit){return explicit?IMG+explicit:''}
let navBound=false;
function renderCategories(){const el=$('#categories');const tabs=[{id:'popular',name:'Popular'},...categories.filter(c=>items.some(x=>x[0]===c.id))];el.innerHTML=tabs.map((c,i)=>`<button class="category-button ${i===0?'active':''}" data-cat="${c.id}">${c.name}</button>`).join('');if(navBound)return;navBound=true;el.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;document.getElementById(b.dataset.cat)?.scrollIntoView({behavior:'smooth',block:'start'});setActiveTab(b.dataset.cat);if(window.innerWidth<=700){el.classList.remove('mobile-open');$('#categoryToggle').setAttribute('aria-expanded','false')}})}
function setActiveTab(id){document.querySelectorAll('.category-button').forEach(x=>{const on=x.dataset.cat===id;x.classList.toggle('active',on);if(on)x.scrollIntoView({block:'nearest',inline:'center'})})}
async function syncMenuFromServer(){try{const r=await fetch("/api/menu",{cache:"no-store"});const d=await r.json();if(Array.isArray(d.items)&&d.items.length){items.length=0;d.items.forEach(x=>items.push(x));}}catch(e){console.warn("Using bundled menu",e)}}
const esc=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function itemCard(it,showBadge){const [cat,name,price,desc,img]=it;const off=it[5]===false;return `<button type="button" class="menu-item${img?' has-img':''}${off?' sold-out':''}" data-add="${esc(cat)}::${esc(name)}" ${off?'disabled':''}><span class="item-main"><span class="item-name">${esc(name)}</span><span class="item-meta"><span class="item-price">${money(price)}</span>${showBadge&&POPULAR.includes(name)?'<span class="item-badge">Popular</span>':''}${off?'<span class="item-badge muted">Sold out</span>':''}</span>${desc?`<span class="item-desc">${esc(desc)}</span>`:''}</span>${img?`<span class="item-thumb"><img loading="lazy" decoding="async" src="${IMG+esc(img)}" alt=""></span>`:''}<span class="add-button" aria-hidden="true">+</span></button>`}
let menuBound=false;
function renderMenu(){const menu=$('#menu');const popular=POPULAR.map(n=>items.find(x=>x[1]===n)).filter(Boolean);const sections=[];if(popular.length)sections.push(`<section class="menu-section" id="popular"><div class="section-head"><h2>Popular</h2><p>The most ordered items at Flamebachi</p></div><div class="menu-grid">${popular.map(it=>itemCard(it,false)).join('')}</div></section>`);for(const c of categories){const its=items.filter(x=>x[0]===c.id);if(!its.length)continue;sections.push(`<section class="menu-section" id="${c.id}"><div class="section-head"><h2>${esc(c.name)}</h2>${c.note?`<p>${esc(c.note)}</p>`:''}</div><div class="menu-grid">${its.map(it=>itemCard(it,true)).join('')}</div></section>`)}menu.innerHTML=sections.join('');if(menuBound)return;menuBound=true;menu.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b||b.disabled)return;const i=b.dataset.add.indexOf('::');const cat=b.dataset.add.slice(0,i),name=b.dataset.add.slice(i+2);const it=items.find(x=>x[0]===cat&&x[1]===name);if(it)openSheet(it)});if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{const vis=es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(vis)setActiveTab(vis.target.id)},{rootMargin:'-130px 0px -65% 0px'});menu.querySelectorAll('.menu-section').forEach(sec=>io.observe(sec))}}
function renderDeal(){const live=isDealLive();$('#dealStatus').textContent=live?'Offer active now':'Offer ends at 4:00 PM daily';}
function substitutionOptions(item){
  const k=kind(item[0]),name=item[1],out=[];
  if(k==='burrito'){out.push(['Half Fried Rice / Half Garlic Noodles',2,'Split your rice with garlic noodles']);out.push(['Sub Garlic Noodles',3,'Replace the rice with garlic noodles']);}
  if(k==='plate'){out.push(['Half Fried Rice / Half Garlic Noodles',2,'Split your rice with garlic noodles']);out.push(['Sub Garlic Noodles',4,'Replace the rice with garlic noodles']);}
  if(k==='bowl'){out.push(['Half Fried Rice / Half Garlic Noodles',2.5,'Split your rice with garlic noodles']);out.push(['Sub Garlic Noodles',3.5,'Replace the rice with garlic noodles']);}
  if(k==='bowl' && name==='Shrimp Bowl'){
    out.push(['Sub Shrimp → Salmon',3,'Swap shrimp for salmon']);
    out.push(['Sub Shrimp → Ahi Tuna',3,'Swap shrimp for seared rare ahi tuna']);
    out.push(['Sub Shrimp → Scallops',3,'Swap shrimp for scallops']);
  }
  if(k==='trio' && name.includes('Shrimp')){
    out.push(['Sub Shrimp → Salmon',6,'Swap the shrimp for salmon']);
    out.push(['Sub Shrimp → Ahi Tuna',6,'Swap the shrimp for ahi tuna']);
    out.push(['Sub Shrimp → Scallops',6,'Swap the shrimp for scallops']);
    out.push(['Sub Any 2 Shrimp → Seafood',8,'Upgrade any two shrimp portions to seafood']);
  }
  return out;
}
function openSheet(item){activeItem=item;activeOptions={drink:'No drink',drinkPrice:0,sauce:'None',saucePrice:0,baseChoice:'Standard',basePrice:0,substitutions:[],substitutionPrice:0,addons:[],specialInstructions:''};$('#sheetCategory').textContent=categoryMap[item[0]]?.name||'Customize';$('#sheetTitle').textContent=item[1];$('#sheetDescription').textContent=item[3];let html='';const main=MAIN_KINDS.includes(kind(item[0]));if(main){html+=`<div class="sheet-section"><h3>Choose your base</h3><div class="option-list"><label class="option selected"><input type="radio" name="baseChoice" value="Standard" data-price="0" checked><span><strong>Standard</strong><small>Default rice & vegetables</small></span><b>Included</b></label>${baseOptions.map(o=>`<label class="option"><input type="radio" name="baseChoice" value="${o[0]}" data-price="${o[1]}"><span><strong>${o[0]}</strong></span><b>${o[1]?'+'+money(o[1]):'Included'}</b></label>`).join('')}</div></div>`;html+=`<div class="sheet-section"><h3>Drink</h3><div class="option-list">${drinkOptions.map((o,i)=>{const [name,price,sub]=o;let effective=price;if(isDealLive()&&kind(item[0])==='bowl'){if(['Coke','Sprite','Water Bottle'].includes(name))effective=0;else if(name.includes('Agua Fresca'))effective=price/2}return `<label class="option ${i===0?'selected':''}"><input type="radio" name="drink" value="${name}" data-price="${effective}" data-base-price="${price}" ${i===0?'checked':''}><span><strong>${name}</strong><small>${sub||''}</small></span><b>${effective===0?'Included':money(effective)}</b></label>`}).join('')}</div></div>`;html+=`<div class="sheet-section"><h3>Sauce</h3><div class="option-list">${sauceOptions.map((o,i)=>`<label class="option ${i===0?'selected':''}"><input type="radio" name="sauce" value="${o[0]}" data-price="${o[1]}" ${i===0?'checked':''}><span><strong>${o[0]}</strong></span><b>${o[1]===0?'None':'+'+money(o[1])}</b></label>`).join('')}</div></div>`;const subs=substitutionOptions(item);if(subs.length){html+=`<div class="sheet-section"><h3>Substitutions</h3><p class="section-help">Swap or upgrade this item before adding it.</p><div class="option-list">${subs.map(o=>`<label class="option"><input type="checkbox" name="substitution" value="${o[0]}" data-price="${o[1]}"><span><strong>${o[0]}</strong><small>${o[2]||''}</small></span><b>+${money(o[1])}</b></label>`).join('')}</div></div>`}html+=`<div class="sheet-section"><h3>Add-ons</h3><div class="option-list">${addOnOptions.map(o=>`<label class="option"><input type="checkbox" name="addon" value="${o[0]}" data-price="${o[1]}"><span><strong>${o[0]}</strong></span><b>+${money(o[1])}</b></label>`).join('')}</div></div>`}else if(kind(item[0])==='side'){html+=`<div class="sheet-section"><h3>Add a sauce?</h3><div class="option-list">${sauceOptions.map((o,i)=>`<label class="option ${i===0?'selected':''}"><input type="radio" name="sauce" value="${o[0]}" data-price="${o[1]}" ${i===0?'checked':''}><span><strong>${o[0]}</strong></span><b>${o[1]===0?'None':'+'+money(o[1])}</b></label>`).join('')}</div></div>`}html+=`<div class="sheet-section"><h3>Special instructions</h3><textarea id="specialInstructions" class="sheet-textarea" maxlength="240" placeholder="Anything we should know? e.g. no onions, sauce on the side…"></textarea></div>`;$('#sheetBody').innerHTML=html;$('#itemSheet').classList.add('open');$('#itemSheet').setAttribute('aria-hidden','false');bindSheetOptions();updateSheetPrice()}
function bindSheetOptions(){document.querySelectorAll('#sheetBody .option input').forEach(input=>input.addEventListener('change',()=>{if(input.type==='radio'){const group=input.name;document.querySelectorAll(`#sheetBody input[name="${group}"]`).forEach(i=>i.closest('.option').classList.toggle('selected',i.checked))}else input.closest('.option').classList.toggle('selected',input.checked);if(input.name==='drink'||input.name==='drinkOnly'){activeOptions.drink=input.value;activeOptions.drinkPrice=Number(input.dataset.basePrice ?? input.dataset.price)}else if(input.name==='sauce'){activeOptions.sauce=input.value;activeOptions.saucePrice=Number(input.dataset.price)}else if(input.name==='baseChoice'){activeOptions.baseChoice=input.value;activeOptions.basePrice=Number(input.dataset.price)}else if(input.name==='substitution'){activeOptions.substitutions=[...document.querySelectorAll('#sheetBody input[name="substitution"]:checked')].map(x=>({name:x.value,price:Number(x.dataset.price)}));activeOptions.substitutionPrice=activeOptions.substitutions.reduce((s,a)=>s+a.price,0)}else if(input.name==='addon'){activeOptions.addons=[...document.querySelectorAll('#sheetBody input[name="addon"]:checked')].map(x=>({name:x.value,price:Number(x.dataset.price)}))}updateSheetPrice()}));$('#specialInstructions').addEventListener('input',e=>activeOptions.specialInstructions=e.target.value.slice(0,240))}
function dealSavingsForItem(i){if(!isDealLive()||!i||kind(i.category)!=='bowl')return 0;let save=i.base*0.10;if(['Coke','Sprite','Water Bottle'].includes(i.drink))save+=2.5;else if(i.drink&&i.drink.includes('Agua Fresca'))save+=3.25;return save}
function updateSheetPrice(){if(!activeItem)return;let drinkExtra=activeOptions.drinkPrice;if(isDealLive()&&kind(activeItem[0])==='bowl'){if(['Coke','Sprite','Water Bottle'].includes(activeOptions.drink))drinkExtra=0;else if(activeOptions.drink.includes('Agua Fresca'))drinkExtra*=0.5}const extra=drinkExtra+activeOptions.saucePrice+activeOptions.basePrice+activeOptions.substitutionPrice+activeOptions.addons.reduce((s,a)=>s+a.price,0);const full=activeItem[2]+extra;const previewSave=isDealLive()&&kind(activeItem[0])==='bowl'?(activeItem[2]*0.10+(activeOptions.drink&&['Coke','Sprite','Water Bottle'].includes(activeOptions.drink)?2.5:activeOptions.drink.includes('Agua Fresca')?3.25:0)):0;$('#sheetPrice').textContent=money(Math.max(0,full-previewSave))}
function closeSheet(){$('#itemSheet').classList.remove('open');$('#itemSheet').setAttribute('aria-hidden','true');activeItem=null}
function addCurrentItem(){if(!activeItem)return;cart.push({id:crypto.randomUUID(),category:activeItem[0],name:activeItem[1],base:activeItem[2],qty:1,drink:activeOptions.drink,drinkPrice:activeOptions.drinkPrice,sauce:activeOptions.sauce,saucePrice:activeOptions.saucePrice,baseChoice:activeOptions.baseChoice,basePrice:activeOptions.basePrice,substitutions:activeOptions.substitutions,substitutionPrice:activeOptions.substitutionPrice,addons:activeOptions.addons,specialInstructions:activeOptions.specialInstructions});closeSheet();renderCart();toast('Added to your order')}
function itemUnit(i){return i.base+i.drinkPrice+i.saucePrice+i.basePrice+i.substitutionPrice+(i.addons||[]).reduce((s,a)=>s+a.price,0)}
function cartSubtotal(){return cart.reduce((s,i)=>s+itemUnit(i)*i.qty,0)}
function bowlDealSavings(){if(!isDealLive())return 0;return cart.reduce((s,i)=>s+dealSavingsForItem(i)*i.qty,0)}
function taxRateForLocation(){return $('#locationSelect')?.value==='Jurupa Valley'?0.0775:0.1025}
function taxAmountCents(baseDollars){return Math.round(Math.max(0,baseDollars)*taxRateForLocation()*100)}
function taxLabel(){return (taxRateForLocation()*100).toFixed(3)+'%'}
function renderCart(){const totalItems=cart.reduce((s,i)=>s+i.qty,0);$('#cartCount').textContent=totalItems;const subtotal=cartSubtotal();const savings=bowlDealSavings();const discounted=Math.max(0,subtotal-savings);const tax=taxAmountCents(discounted)/100;const total=discounted+tax;$('#cartTotal').textContent=money(total);$('#cartEmpty').style.display=cart.length?'none':'block';$('#cartItems').innerHTML=cart.map(i=>`<div class="cart-row"><div><h4>${i.qty} × ${i.name}</h4><p>${[i.baseChoice&&i.baseChoice!=='Standard'?i.baseChoice:'',(i.substitutions||[]).length?i.substitutions.map(a=>a.name).join(', '):'',i.drink!=='No drink'?i.drink:'',i.sauce!=='None'?i.sauce+' sauce':'',(i.addons||[]).length?i.addons.map(a=>a.name).join(', '):'',i.specialInstructions?`Note: ${i.specialInstructions}`:''].filter(Boolean).join(' • ')||'Standard'}</p><div class="qty"><button data-qty="${i.id}::dec">−</button><span>${i.qty}</span><button data-qty="${i.id}::inc">+</button></div></div><div class="cart-row-right"><strong>${money(itemUnit(i)*i.qty)}</strong></div></div>`).join('');$('#cartSummary').innerHTML=cart.length?`<div class="summary-line"><span>Subtotal</span><b>${money(subtotal)}</b></div>${savings?`<div class="summary-line"><span>4 PM offer</span><b>−${money(savings)}</b></div>`:''}<div class="summary-line"><span>CA sales tax (${taxLabel()})</span><b>${money(tax)}</b></div><div class="summary-line total"><span>Total</span><b>${money(total)}</b></div><div class="payment-unavailable-note">Online payments are temporarily unavailable.</div>`:'';$('#checkoutButton').disabled=!cart.length;$('#drawerLocation').textContent=$('#locationSelect').value;$('#pickupLocationLabel').textContent=$('#locationSelect').value;$('#checkoutLocation').textContent=$('#locationSelect').value}
function openCart(){$('#cartDrawer').classList.add('open');$('#cartDrawer').setAttribute('aria-hidden','false');renderCart()}function closeCart(){$('#cartDrawer').classList.remove('open');$('#cartDrawer').setAttribute('aria-hidden','true')}
function openCheckout(){if(!cart.length){toast('Your order is empty.');return;}closeCart();const subtotal=cartSubtotal(),savings=bowlDealSavings(),discounted=Math.max(0,subtotal-savings),tax=taxAmountCents(discounted)/100,total=discounted+tax;$('#checkoutSummary').innerHTML=`<div class="checkout-summary-box">${cart.map(i=>`<div><span>${i.qty} × ${i.name}</span><b>${money(itemUnit(i)*i.qty)}</b></div>`).join('')}<div><span>Subtotal</span><b>${money(subtotal)}</b></div>${savings?`<div><span>4 PM offer</span><b>−${money(savings)}</b></div>`:''}<div><span>CA sales tax (${taxLabel()})</span><b>${money(tax)}</b></div><div><strong>Total</strong><strong>${money(total)}</strong></div></div>`;$('#checkoutModal').classList.add('open');$('#checkoutModal').setAttribute('aria-hidden','false')}
function closeCheckout(){$('#checkoutModal').classList.remove('open');$('#checkoutModal').setAttribute('aria-hidden','true')}
async function buildOrder(paymentMethod='cash'){
  const payload={
    source:"online",
    paymentMethod,
    name:$('#customerName').value.trim(),
    phone:$('#customerPhone').value.trim(),
    location:$('#locationSelect').value,
    items:cart.map(i=>({category:i.category,name:i.name,qty:i.qty,drink:i.drink,sauce:i.sauce,baseChoice:i.baseChoice,substitutions:i.substitutions,addons:i.addons,specialInstructions:i.specialInstructions}))
  };
  const r=await fetch('/api/orders',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
  const data=await r.json().catch(()=>({}));
  if(!r.ok) throw new Error(data.detail ? `${data.error||'Unable to create your order.'}: ${data.detail}` : (data.error||'Unable to create your order.'));
  return data;
}
function cartPayloadItems(){return cart.map(i=>({category:i.category,name:i.name,qty:i.qty,drink:i.drink,sauce:i.sauce,baseChoice:i.baseChoice,substitutions:i.substitutions,addons:i.addons,specialInstructions:i.specialInstructions}))}
async function startPayment(){
  customer={name:$('#customerName').value.trim(),phone:$('#customerPhone').value.trim(),location:$('#locationSelect').value};
  if(!customer.name||!customer.phone)return;
  const button=$('#checkoutForm button[type="submit"]');
  button.disabled=true; button.textContent='Placing cash order…';
  try{
    const order=await buildOrder('cash');
    $('#checkoutModal').classList.remove('open');
    await showSuccess(order.order);
  }catch(e){
    toast(e.message||'Unable to place your order.');
  }finally{
    button.disabled=false; button.textContent='Place cash order';
  }
}

async function confirmStripePayment(){
  if(paymentBusy||!stripeClient||!stripeElements||!currentPaymentIntentId||(!paymentReady&&!expressReady))return;
  paymentBusy=true;
  const button=$('#payNowButton');
  button.disabled=true; button.textContent='Processing payment…'; $('#paymentError').textContent='';
  try{
    const result=await stripeClient.confirmPayment({
      elements:stripeElements,
      redirect:'if_required',
      confirmParams:{return_url:`${window.location.origin}/online-menu/`}
    });
    if(result.error){$('#paymentError').textContent=result.error.message||'Payment could not be completed.';return;}
    let verified=null;
    for(let i=0;i<15;i++){
      const r=await fetch('/api/stripe/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({orderId:sessionStorage.getItem('flamebachi_pending_order'),paymentIntentId:result.paymentIntent?.id||currentPaymentIntentId}),cache:'no-store'});
      if(r.ok) verified=await r.json();
      if(verified?.paid)break;
      await new Promise(res=>setTimeout(res,1000));
    }
    if(!verified?.paid||!verified.order) throw new Error(verified?.detail||verified?.error||'Payment is still being confirmed.');
    $('#paymentModal').classList.remove('open');
    await showSuccess(verified.order);
  }catch(e){$('#paymentError').textContent=e.message||'Payment could not be completed.';}
  finally{paymentBusy=false;button.disabled=!paymentReady;button.textContent='Pay now';}
}

async function confirmPayment(e){
  e?.preventDefault();
  return confirmStripePayment();
}
async function finishPayment(){return confirmStripePayment();}

async function showSuccess(order){
  window.__currentOrderId=order.id||window.__currentOrderId||null;
  cart=[]; customer=order.customer;
  $('#orderNumber').textContent=order.orderNumber;
  $('#receiptName').textContent=order.customer?.name||'';
  $('#receiptLocation').textContent=order.location||'';
  $('#receiptTotal').textContent=money((order.totalC||0)/100);
  $('#successText').textContent=`Thanks, ${(order.customer?.name||'there').split(' ')[0]}. Your cash pickup order is confirmed. Pay at the counter and show order ${order.orderNumber}.`;
  $('#receiptContact').value=''; $('#receiptNote').textContent='';
  setReceiptMethod('email');
  $('#successModal').classList.add('open'); $('#successModal').setAttribute('aria-hidden','false');
}
let receiptMethod='email';
function setReceiptMethod(method){receiptMethod=method;document.querySelectorAll('.receipt-choice-button').forEach(b=>b.classList.toggle('active',b.dataset.receiptMethod===method));const input=$('#receiptContact');input.type=method==='email'?'email':'tel';input.placeholder=method==='email'?'Email address':'Mobile number';input.value='';}
async function finishReceipt(){
  const contact=$('#receiptContact').value.trim();
  if(!contact){$('#receiptNote').textContent=receiptMethod==='email'?'Enter your email address.':'Enter your mobile number.';return;}
  if(receiptMethod==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact)){ $('#receiptNote').textContent='Enter a valid email address.';return; }
  if(receiptMethod==='text'&&!/^[+\d][\d\s().-]{7,}$/.test(contact)){ $('#receiptNote').textContent='Enter a valid mobile number.';return; }
  const button=$('#sendReceipt');button.disabled=true;button.textContent='Saving…';
  try{
    const r=await fetch('/api/receipt',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({orderId:window.__currentOrderId,method:receiptMethod,contact})});
    const data=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(data.detail||data.error||'Receipt could not be saved.');
    $('#receiptNote').textContent=receiptMethod==='email'?'Receipt preference saved. Stripe will use this email for the receipt when available.':'Text receipt preference saved. SMS delivery will be enabled when GoodTable SMS is connected.';
  }catch(e){$('#receiptNote').textContent=e.message||'Receipt could not be saved.';}
  finally{button.disabled=false;button.textContent='Send receipt';}
}
async function handleReturn(){
  // Embedded Stripe Payment Element keeps the customer on this page; no hosted-checkout return is required.
}
function done(){cart=[];customer=null;window.__demoOrder=null;sessionStorage.removeItem('flamebachi_pending_order');$('#successModal').classList.remove('open');renderCart();window.scrollTo({top:0,behavior:'smooth'})}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}
$('#cartButton').addEventListener('click',openCart);$('#closeCart').addEventListener('click',closeCart);$('#drawerBackdrop').addEventListener('click',closeCart);$('#checkoutButton').addEventListener('click',openCheckout);$('#checkoutForm').addEventListener('submit',e=>{e.preventDefault();startPayment()});$('#paymentForm').addEventListener('submit',confirmPayment);$('#sendReceipt').addEventListener('click',finishReceipt);document.querySelectorAll('.receipt-choice-button').forEach(b=>b.addEventListener('click',()=>setReceiptMethod(b.dataset.receiptMethod)));$('#doneButton').addEventListener('click',done);$('#locationSelect').addEventListener('change',()=>{renderCart()});$('#addToCart').addEventListener('click',addCurrentItem);document.addEventListener('click',e=>{if(e.target.matches('[data-close-sheet]'))closeSheet();if(e.target.matches('[data-close-checkout]'))closeCheckout();const q=e.target.closest('[data-qty]');if(q){const [id,dir]=q.dataset.qty.split('::');const i=cart.find(x=>x.id===id);if(!i)return;if(dir==='inc')i.qty++;else i.qty--;if(i.qty<=0)cart=cart.filter(x=>x.id!==id);renderCart()}});
renderCategories();syncMenuFromServer().then(()=>{renderMenu();renderCategories()});document.getElementById('categoryToggle')?.addEventListener('click',()=>{const nav=$('#categories');nav.classList.toggle('mobile-open');$('#categoryToggle').setAttribute('aria-expanded',nav.classList.contains('mobile-open')?'true':'false')});renderDeal();renderCart();handleReturn();setInterval(renderDeal,60000);
