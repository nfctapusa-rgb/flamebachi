const IMG='assets/';
const categories=[
 {id:'britos',name:'Burritos',note:'Flour tortilla with rice, cheese, zucchini, mushroom, onion and your choice of drizzled sauce. 1/2 rice + 1/2 garlic noodles +$2. Sub garlic noodles +$3.'},
 {id:'plates',name:'Plates',note:'Served with fried or white rice & veggies. 1/2 rice + 1/2 garlic noodles +$2. Sub garlic noodles +$4.'},
 {id:'trios',name:'Trio Plates',note:'Three-protein combinations. Sub Tuna, Salmon or Scallops for Shrimp +$6 (or any 2 +$8).'},
 {id:'bowls',name:'Bachi-Bowls',note:'Choice of fried or white rice & veggies. 1/2 rice + 1/2 garlic noodles +$2.50. Sub garlic noodles +$3.50. Sub Tuna, Salmon or Scallops for Shrimp +$3. Upgrade to Filet Mignon +$2.'},
 {id:'ala',name:'A La Carte',note:'Individual proteins.'},
 {id:'addons',name:'Add-Ons',note:'Extra proteins and sides.'},
 {id:'sides',name:'Sides',note:'Made to pair with your meal.'},
 {id:'sauces',name:'Sauces',note:'Extra sauce for your meal.'},
 {id:'drinks',name:'Drinks',note:'Cold drinks.'},
];
const items=[
 // Britos
 ['britos','Surf & Turf',22,'Flour tortilla with your choice of rice, vegetables and sauce.',''],['britos','Trio',27,'Flour tortilla with three proteins, rice, vegetables and sauce.',''],['britos','NY Steak',16,'Grilled NY steak burrito.',''],['britos','Salmon',15,'Grilled salmon burrito.',''],['britos','Shrimp',14,'Grilled shrimp burrito.',''],['britos','Chicken Breast',12,'Grilled chicken burrito.',''],['britos','Ahi Tuna',15,'Seared rare ahi tuna burrito.',''],['britos','Scallops',15,'Grilled scallop burrito.',''],['britos','Filet Mignon',18,'Grilled filet mignon burrito.',''],['britos','Lobster',31,'Grilled lobster burrito.',''],['britos','Veggie',12,'Vegetable burrito.',''],
 // plates
 ['plates','NY Steak',26,'Grilled NY steak with rice and vegetables.',''],['plates','Filet Mignon',30,'Grilled filet mignon with rice and vegetables.',''],['plates','Porterhouse',28,'Grilled porterhouse with rice and vegetables.',''],['plates','Salmon',25,'Grilled salmon with rice and vegetables.',''],['plates','Shrimp',23,'Grilled shrimp with rice and vegetables.',''],['plates','Chicken Breast',20,'Grilled chicken breast with rice and vegetables.',''],['plates','Seared Rare Ahi Tuna',25,'Seared rare ahi tuna with rice and vegetables.',''],['plates','Scallops',25,'Grilled scallops with rice and vegetables.',''],['plates','Lobster Tail',36,'Lobster tail with rice and vegetables.',''],['plates','Double Lobster Tail',52,'Two lobster tails with rice and vegetables.',''],['plates','NY Steak & Salmon',40,'Two-protein plate with steak and salmon.',''],['plates','NY Steak & Shrimp',39,'Two-protein plate with steak and shrimp.',''],['plates','NY Steak & Chicken',30,'Two-protein plate with steak and chicken.','menu-steak-chicken.jpg'],['plates','NY Steak & Lobster',45,'Two-protein plate with steak and lobster.','menu-steak-lobster.jpg'],['plates','Chicken & Salmon',34,'Two-protein plate with chicken and salmon.',''],['plates','Chicken & Shrimp',34,'Two-protein plate with chicken and shrimp.',''],['plates','Shrimp & Salmon',36,'Two-protein plate with shrimp and salmon.',''],['plates','Seafood Supreme',52,'Lobster, shrimp and your choice of Ahi Tuna, Salmon, Scallops (or any 2).',''],
 // trios
 ['trios','NY Steak, Chicken & Shrimp',41,'Three grilled proteins with rice and vegetables.','menu-steak-chicken-shrimp.jpg'],['trios','Porter House, Chicken & Shrimp',43,'Three grilled proteins with rice and vegetables.',''],['trios','Filet Mignon, Chicken & Shrimp',44,'Three grilled proteins with rice and vegetables.',''],['trios','NY Steak, Shrimp & Lobster',54,'Three-protein plate with steak, shrimp and lobster.',''],['trios','NY Steak, Chicken & Salmon',43,'Three-protein plate with steak, chicken and salmon.',''],['trios','Salmon, Ahi Tuna & Scallops',44,'Three seafood proteins with rice and vegetables.',''],
 // bowls singles
 ['bowls','Shrimp Bowl',18.5,'Shrimp, rice and vegetables.',''],['bowls','NY Steak Bowl',18.5,'NY steak, rice and vegetables.',''],['bowls','Salmon Bowl',18.5,'Salmon, rice and vegetables.',''],['bowls','Chicken Breast Bowl',15.5,'Chicken breast, rice and vegetables.','menu-chicken-bowl.jpg'],['bowls','Scallops Bowl',18.5,'Scallops, rice and vegetables.',''],['bowls','Lobster Bowl',29.5,'Lobster, rice and vegetables.',''],['bowls','Seared Rare Ahi Tuna Bowl',18,'Ahi tuna, rice and vegetables.',''],
 ['bowls','NY Steak & Salmon Bowl',25,'Steak and salmon with rice and vegetables.',''],['bowls','NY Steak & Shrimp Bowl',24,'Steak and shrimp with rice and vegetables.','food-1.jpg'],['bowls','NY Steak & Chicken Bowl',23,'Steak and chicken with rice and vegetables.','menu-steak-chicken.jpg'],['bowls','NY Steak & Lobster Bowl',40,'Steak and lobster with rice and vegetables.','menu-steak-lobster.jpg'],['bowls','Chicken & Salmon Bowl',24,'Chicken and salmon with rice and vegetables.',''],['bowls','Shrimp & Chicken Bowl',22,'Shrimp and chicken with rice and vegetables.',''],['bowls','Shrimp & Salmon Bowl',24,'Shrimp and salmon with rice and vegetables.','menu-salmon-shrimp.jpg'],['bowls','NY Steak, Shrimp & Chicken Breast Bowl',30,'Three grilled proteins with rice and vegetables.','menu-steak-chicken-shrimp.jpg'],['bowls','NY Steak, Shrimp & Lobster Bowl',43,'Steak, shrimp and lobster with rice and vegetables.',''],['bowls','Salmon, Ahi Tuna & Scallops Bowl',34,'Three seafood proteins with rice and vegetables.',''],['bowls','NY Steak, Chicken & Salmon Bowl',33,'Steak, chicken and salmon with rice and vegetables.',''],
 // ala carte
 ['ala','Shrimp',18.5,'Individual grilled shrimp.',''],['ala','NY Steak',20,'Individual grilled NY steak.',''],['ala','Seared Rare Ahi Tuna',19,'Individual seared rare ahi tuna.',''],['ala','Filet Mignon',21,'Individual grilled filet mignon.',''],['ala','Chicken Breast',14,'Individual grilled chicken breast.',''],['ala','Scallops',19,'Individual grilled scallops.',''],['ala','Salmon',19,'Individual grilled salmon.',''],['ala','Lobster Tail',25,'Individual lobster tail.',''],['ala','Double Lobster Tail',45,'Two lobster tails.',''],
 // addons
 ['addons','Salmon',10,'Add grilled salmon.',''],['addons','Scallops',10,'Add grilled scallops.',''],['addons','Shrimp',10,'Add grilled shrimp.',''],['addons','Seared Rare Ahi Tuna',10,'Add seared rare ahi tuna.',''],['addons','Chicken Breast',9,'Add grilled chicken breast.',''],['addons','Filet Mignon',11,'Add grilled filet mignon.',''],['addons','NY Steak',10,'Add grilled NY steak.',''],['addons','Sumo Style: 2 eggs any style',3,'Two eggs any style.',''],['addons','Cheese',1.5,'Add cheese.',''],['addons','Lemon Wedges',1,'Fresh lemon wedges.',''],
 // sides
 ['sides','Garlic Noodles',9,'Garlic noodles.','food-6.jpg'],['sides','Fried Rice',9,'Fried rice.',''],['sides','Chicken Fried Rice',13.5,'Fried rice with chicken.',''],['sides','Shrimp Fried Rice',15.5,'Fried rice with shrimp.',''],['sides','Steak Fried Rice',15.5,'Fried rice with steak.',''],['sides','White Rice',6,'White rice.',''],['sides','Veggies',6,'Hibachi vegetables.',''],
 // sauces
 ['sauces','Lava',1.5,'Spicy lava sauce.',''],['sauces','Dragon',1,'Dragon sauce.',''],['sauces','Ginger-Soy',1,'Ginger-soy sauce.',''],['sauces','Agave Chile',1,'Agave chile sauce.',''],['sauces','Smoked Teriyaki',1,'Smoked teriyaki sauce.',''],['sauces','Garlic Butter',1.5,'Garlic butter sauce.',''],
 // drinks
 ['drinks','Aguas Fresca',6.5,'Fresh agua fresca. Flavors may vary by location.','menu-aguas-frescas.jpg'],['drinks','Coke / Sprite Can',2.5,'Choose Coke or Sprite.',''],['drinks','Bottled Water',2,'Cold bottled water.',''],
];
const categoryMap=Object.fromEntries(categories.map(c=>[c.id,c]));
const sauceOptions=[['None',0],['Lava',1.5],['Dragon',1],['Ginger-Soy',1],['Agave Chile',1],['Smoked Teriyaki',1],['Garlic Butter',1.5]];
const drinkOptions=[['No drink',0,''],['Coke',2.5,'Canned soda'],['Sprite',2.5,'Canned soda'],['Bottled Water',2,'Water'],['Strawberry Agua Fresca',6.5,'Agua Fresca'],['Jamaica Agua Fresca',6.5,'Agua Fresca'],['Pineapple Cucumber Agua Fresca',6.5,'Agua Fresca']];
const baseOptions=[['Fried Rice',0],['White Rice',0],['Garlic Noodles',3],['Half Fried Rice / Half Garlic Noodles',2]];
const addOnOptions=[['Cheese',1.5],['Lemon Wedges',1],['Extra Chicken Breast',9],['Extra Shrimp',10],['Extra NY Steak',10],['Extra Salmon',10],['Extra Scallops',10],['Extra Filet Mignon',11]];
let cart=[];let activeItem=null;let activeOptions={drink:'No drink',drinkPrice:0,sauce:'None',saucePrice:0,baseChoice:'Standard',basePrice:0,substitutions:[],substitutionPrice:0,addons:[],specialInstructions:''};let customer=null;let stripeClient=null;let stripeElements=null;let paymentElement=null;let expressCheckoutElement=null;let paymentReady=false;let expressReady=false;let currentPaymentIntentId=null;let paymentBusy=false;
const $=s=>document.querySelector(s); const money=n=>'$'+Number(n).toFixed(2);
function isDealLive(){const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());const h=Number(parts.find(x=>x.type==='hour')?.value||0);return h<16}
function itemImage(name, explicit){return explicit?IMG+explicit:''}
function renderCategories(){const el=$('#categories');el.innerHTML=categories.map((c,i)=>`<button class="category-button ${i===0?'active':''}" data-cat="${c.id}">${c.name}</button>`).join('');el.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;document.getElementById(b.dataset.cat)?.scrollIntoView({behavior:'smooth',block:'start'});document.querySelectorAll('.category-button').forEach(x=>x.classList.toggle('active',x===b));if(window.innerWidth<=700){el.classList.remove('mobile-open');$('#categoryToggle').setAttribute('aria-expanded','false')}})}
async function syncMenuFromServer(){try{const r=await fetch("/api/menu",{cache:"no-store"});const d=await r.json();if(Array.isArray(d.items)&&d.items.length){items.length=0;d.items.forEach(x=>items.push(x));}}catch(e){console.warn("Using bundled menu",e)}}
function renderMenu(){const menu=$('#menu');menu.innerHTML=categories.map(c=>{const its=items.filter(x=>x[0]===c.id);return `<section class="menu-section" id="${c.id}"><div class="section-head"><h2>${c.name}</h2><p>${c.note||''}</p></div><div class="menu-grid">${its.map(it=>{const [cat,name,price,desc,img]=it;return `<article class="menu-item"><div class="item-main"><h3>${name}</h3><p>${desc}</p></div><div class="item-price">${money(price)}</div><button class="add-button" data-add="${cat}::${name}">Add</button></article>`}).join('')}</div></section>`}).join('');menu.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(!b)return;const [cat,name]=b.dataset.add.split('::');openSheet(items.find(x=>x[0]===cat&&x[1]===name))})}
function renderDeal(){const live=isDealLive();$('#dealStatus').textContent=live?'Offer active now':'Offer ends at 4:00 PM daily';}
function substitutionOptions(item){
  const cat=item[0],name=item[1],out=[];
  if(['britos','plates','trios','bowls'].includes(cat)){
    if(cat==='britos') out.push(['Half Fried Rice / Half Garlic Noodles',2,'Split your rice with garlic noodles']);
    if(cat==='britos') out.push(['Sub Garlic Noodles',3,'Replace the rice with garlic noodles']);
    if(cat==='plates') out.push(['Half Fried Rice / Half Garlic Noodles',2,'Split your rice with garlic noodles']);
    if(cat==='plates') out.push(['Sub Garlic Noodles',4,'Replace the rice with garlic noodles']);
    if(cat==='bowls') out.push(['Half Fried Rice / Half Garlic Noodles',2.5,'Split your rice with garlic noodles']);
    if(cat==='bowls') out.push(['Sub Garlic Noodles',3.5,'Replace the rice with garlic noodles']);
    if(cat==='bowls' && name==='Shrimp Bowl'){
      out.push(['Sub Shrimp → Salmon',3,'Swap shrimp for salmon']);
      out.push(['Sub Shrimp → Ahi Tuna',3,'Swap shrimp for seared rare ahi tuna']);
      out.push(['Sub Shrimp → Scallops',3,'Swap shrimp for scallops']);
    }
    if(cat==='trios' && name.includes('Shrimp')){
      out.push(['Sub Shrimp → Salmon',6,'Swap the shrimp for salmon']);
      out.push(['Sub Shrimp → Ahi Tuna',6,'Swap the shrimp for ahi tuna']);
      out.push(['Sub Shrimp → Scallops',6,'Swap the shrimp for scallops']);
      out.push(['Sub Any 2 Shrimp → Seafood',8,'Upgrade any two shrimp portions to seafood']);
    }
  }
  return out;
}
function openSheet(item){activeItem=item;activeOptions={drink:'No drink',drinkPrice:0,sauce:'None',saucePrice:0,baseChoice:'Standard',basePrice:0,substitutions:[],substitutionPrice:0,addons:[],specialInstructions:''};$('#sheetCategory').textContent=categoryMap[item[0]]?.name||'Customize';$('#sheetTitle').textContent=item[1];$('#sheetDescription').textContent=item[3];let html='';const main=['bowls','britos','plates','trios'].includes(item[0]);if(main){html+=`<div class="sheet-section"><h3>Choose your base</h3><div class="option-list"><label class="option selected"><input type="radio" name="baseChoice" value="Standard" data-price="0" checked><span><strong>Standard</strong><small>Default rice & vegetables</small></span><b>Included</b></label>${baseOptions.map(o=>`<label class="option"><input type="radio" name="baseChoice" value="${o[0]}" data-price="${o[1]}"><span><strong>${o[0]}</strong></span><b>${o[1]?'+'+money(o[1]):'Included'}</b></label>`).join('')}</div></div>`;html+=`<div class="sheet-section"><h3>Drink</h3><div class="option-list">${drinkOptions.map((o,i)=>{const [name,price,sub]=o;let effective=price;if(isDealLive()&&item[0]==='bowls'){if(['Coke','Sprite','Bottled Water'].includes(name))effective=0;else if(name.includes('Agua Fresca'))effective=price/2}return `<label class="option ${i===0?'selected':''}"><input type="radio" name="drink" value="${name}" data-price="${effective}" data-base-price="${price}" ${i===0?'checked':''}><span><strong>${name}</strong><small>${sub||''}</small></span><b>${effective===0?'Included':money(effective)}</b></label>`}).join('')}</div></div>`;html+=`<div class="sheet-section"><h3>Sauce</h3><div class="option-list">${sauceOptions.map((o,i)=>`<label class="option ${i===0?'selected':''}"><input type="radio" name="sauce" value="${o[0]}" data-price="${o[1]}" ${i===0?'checked':''}><span><strong>${o[0]}</strong></span><b>${o[1]===0?'None':'+'+money(o[1])}</b></label>`).join('')}</div></div>`;const subs=substitutionOptions(item);if(subs.length){html+=`<div class="sheet-section"><h3>Substitutions</h3><p class="section-help">Swap or upgrade this item before adding it.</p><div class="option-list">${subs.map(o=>`<label class="option"><input type="checkbox" name="substitution" value="${o[0]}" data-price="${o[1]}"><span><strong>${o[0]}</strong><small>${o[2]||''}</small></span><b>+${money(o[1])}</b></label>`).join('')}</div></div>`}html+=`<div class="sheet-section"><h3>Add-ons</h3><div class="option-list">${addOnOptions.map(o=>`<label class="option"><input type="checkbox" name="addon" value="${o[0]}" data-price="${o[1]}"><span><strong>${o[0]}</strong></span><b>+${money(o[1])}</b></label>`).join('')}</div></div>`}else if(item[0]==='drinks'){html+=`<div class="sheet-section"><h3>Choose your drink</h3><div class="option-list">${drinkOptions.filter(o=>o[0]!=='No drink').map((o,i)=>`<label class="option ${i===0?'selected':''}"><input type="radio" name="drinkOnly" value="${o[0]}" data-price="${o[1]}" ${i===0?'checked':''}><span><strong>${o[0]}</strong><small>${o[2]}</small></span><b>${money(o[1])}</b></label>`).join('')}</div></div>`}else{html+=`<div class="sheet-section"><h3>Add a sauce?</h3><div class="option-list">${sauceOptions.map((o,i)=>`<label class="option ${i===0?'selected':''}"><input type="radio" name="sauce" value="${o[0]}" data-price="${o[1]}" ${i===0?'checked':''}><span><strong>${o[0]}</strong></span><b>${o[1]===0?'None':'+'+money(o[1])}</b></label>`).join('')}</div></div>`}html+=`<div class="sheet-section"><h3>Special instructions</h3><textarea id="specialInstructions" class="sheet-textarea" maxlength="240" placeholder="Anything we should know? e.g. no onions, sauce on the side…"></textarea></div>`;$('#sheetBody').innerHTML=html;$('#itemSheet').classList.add('open');$('#itemSheet').setAttribute('aria-hidden','false');bindSheetOptions();updateSheetPrice()}
function bindSheetOptions(){document.querySelectorAll('#sheetBody .option input').forEach(input=>input.addEventListener('change',()=>{if(input.type==='radio'){const group=input.name;document.querySelectorAll(`#sheetBody input[name="${group}"]`).forEach(i=>i.closest('.option').classList.toggle('selected',i.checked))}else input.closest('.option').classList.toggle('selected',input.checked);if(input.name==='drink'||input.name==='drinkOnly'){activeOptions.drink=input.value;activeOptions.drinkPrice=Number(input.dataset.basePrice ?? input.dataset.price)}else if(input.name==='sauce'){activeOptions.sauce=input.value;activeOptions.saucePrice=Number(input.dataset.price)}else if(input.name==='baseChoice'){activeOptions.baseChoice=input.value;activeOptions.basePrice=Number(input.dataset.price)}else if(input.name==='substitution'){activeOptions.substitutions=[...document.querySelectorAll('#sheetBody input[name="substitution"]:checked')].map(x=>({name:x.value,price:Number(x.dataset.price)}));activeOptions.substitutionPrice=activeOptions.substitutions.reduce((s,a)=>s+a.price,0)}else if(input.name==='addon'){activeOptions.addons=[...document.querySelectorAll('#sheetBody input[name="addon"]:checked')].map(x=>({name:x.value,price:Number(x.dataset.price)}))}updateSheetPrice()}));$('#specialInstructions').addEventListener('input',e=>activeOptions.specialInstructions=e.target.value.slice(0,240))}
function dealSavingsForItem(i){if(!isDealLive()||!i||i.category!=='bowls')return 0;let save=i.base*0.10;if(['Coke','Sprite','Bottled Water'].includes(i.drink))save+=2.5;else if(i.drink&&i.drink.includes('Agua Fresca'))save+=3.25;return save}
function updateSheetPrice(){if(!activeItem)return;let drinkExtra=activeOptions.drinkPrice;if(isDealLive()&&activeItem[0]==='bowls'){if(['Coke','Sprite','Bottled Water'].includes(activeOptions.drink))drinkExtra=0;else if(activeOptions.drink.includes('Agua Fresca'))drinkExtra*=0.5}const extra=drinkExtra+activeOptions.saucePrice+activeOptions.basePrice+activeOptions.substitutionPrice+activeOptions.addons.reduce((s,a)=>s+a.price,0);const full=activeItem[2]+extra;const previewSave=isDealLive()&&activeItem[0]==='bowls'?(activeItem[2]*0.10+(activeOptions.drink&&['Coke','Sprite','Bottled Water'].includes(activeOptions.drink)?2.5:activeOptions.drink.includes('Agua Fresca')?3.25:0)):0;$('#sheetPrice').textContent=money(Math.max(0,full-previewSave))}
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
document.querySelector('.featured-row')?.addEventListener('click',e=>{const b=e.target.closest('.featured-card');if(!b)return;const idx=Number(b.dataset.featured);const featured=[['trios','NY Steak, Chicken & Shrimp'],['plates','NY Steak & Lobster'],['plates','Shrimp & Salmon'],['bowls','Chicken Breast Bowl'],['bowls','NY Steak & Shrimp Bowl'],['bowls','Shrimp & Chicken Bowl'],['plates','NY Steak & Chicken'],['trios','NY Steak, Chicken & Shrimp'],['bowls','Chicken Breast Bowl']];const f=featured[idx];if(f)openSheet(items.find(x=>x[0]===f[0]&&x[1]===f[1]));});renderCategories();syncMenuFromServer().then(()=>{renderMenu();renderCategories()});document.getElementById('categoryToggle')?.addEventListener('click',()=>{const nav=$('#categories');nav.classList.toggle('mobile-open');$('#categoryToggle').setAttribute('aria-expanded',nav.classList.contains('mobile-open')?'true':'false')});renderDeal();renderCart();handleReturn();setInterval(renderDeal,60000);
