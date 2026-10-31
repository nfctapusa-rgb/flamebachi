// Flamebachi online menu (display only). Ordering happens on ChowNow via /order-picker.js.
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

const $=s=>document.querySelector(s);
const money=n=>'$'+Number(n).toFixed(2);
const esc=v=>String(v??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function isDealLive(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'numeric',hour12:false}).formatToParts(new Date());return Number(parts.find(x=>x.type==='hour')?.value||0)<16}
function renderDeal(){const el=$('#dealStatus');if(el)el.textContent=isDealLive()?'Offer active now':'Offer ends at 4:00 PM daily'}

let navBound=false;
function renderCategories(){const el=$('#categories');const tabs=[{id:'popular',name:'Popular'},...categories.filter(c=>items.some(x=>x[0]===c.id))];el.innerHTML=tabs.map((c,i)=>`<button class="category-button ${i===0?'active':''}" data-cat="${c.id}">${esc(c.name)}</button>`).join('');if(navBound)return;navBound=true;el.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;document.getElementById(b.dataset.cat)?.scrollIntoView({behavior:'smooth',block:'start'});setActiveTab(b.dataset.cat)})}
function setActiveTab(id){document.querySelectorAll('.category-button').forEach(x=>{const on=x.dataset.cat===id;x.classList.toggle('active',on);if(on)x.scrollIntoView({block:'nearest',inline:'center'})})}

function itemCard(it,showBadge){const [cat,name,price,desc,img]=it;const off=it[5]===false;return `<button type="button" class="menu-item${img?' has-img':''}${off?' sold-out':''}" ${off?'disabled':`data-order data-order-item="${esc(name)}"`} aria-label="Order ${esc(name)}"><span class="item-main"><span class="item-name">${esc(name)}</span><span class="item-meta"><span class="item-price">${money(price)}</span>${showBadge&&POPULAR.includes(name)?'<span class="item-badge">Popular</span>':''}${off?'<span class="item-badge muted">Sold out</span>':''}</span>${desc?`<span class="item-desc">${esc(desc)}</span>`:''}</span>${img?`<span class="item-thumb"><img loading="lazy" decoding="async" src="${IMG+esc(img)}" alt=""></span>`:''}${off?'':'<span class="add-button" aria-hidden="true">+</span>'}</button>`}
let observer=null;
function renderMenu(){const menu=$('#menu');const popular=POPULAR.map(n=>items.find(x=>x[1]===n)).filter(Boolean);const out=[];if(popular.length)out.push(`<section class="menu-section" id="popular"><div class="section-head"><h2>Popular</h2><p>The most ordered items at Flamebachi</p></div><div class="menu-grid">${popular.map(it=>itemCard(it,false)).join('')}</div></section>`);for(const c of categories){const its=items.filter(x=>x[0]===c.id);if(!its.length)continue;out.push(`<section class="menu-section" id="${c.id}"><div class="section-head"><h2>${esc(c.name)}</h2>${c.note?`<p>${esc(c.note)}</p>`:''}</div><div class="menu-grid">${its.map(it=>itemCard(it,true)).join('')}</div></section>`)}menu.innerHTML=out.join('');if(observer)observer.disconnect();if('IntersectionObserver' in window){observer=new IntersectionObserver(es=>{const vis=es.filter(x=>x.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];if(vis)setActiveTab(vis.target.id)},{rootMargin:'-130px 0px -65% 0px'});menu.querySelectorAll('.menu-section').forEach(s=>observer.observe(s))}}

// The owner can edit names/prices/availability in the GoodTable dashboard; pull those in when available.
async function syncMenuFromServer(){try{const r=await fetch('/api/menu',{cache:'no-store'});const d=await r.json();if(Array.isArray(d.items)&&d.items.length){items.length=0;d.items.forEach(x=>items.push(x))}}catch(e){console.warn('Using bundled menu',e)}}

renderCategories();renderMenu();renderDeal();setInterval(renderDeal,60000);
syncMenuFromServer().then(()=>{renderCategories();renderMenu()});
