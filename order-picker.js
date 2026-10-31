/* Flamebachi "Order Now" location picker -> ChowNow.
   Any element with [data-order] opens it. Links keep their ChowNow href as a no-JS fallback. */
(function(){
  var LOCATIONS=[
    {name:'Downtown Los Angeles',address:'225 W 7th St, Los Angeles, CA 90014',url:'https://order.chownow.com/order/28837/locations/61131'},
    {name:'Jurupa Valley',address:'10255 Mission Blvd, Jurupa Valley, CA 92509',url:'https://order.chownow.com/order/28837/locations/42682'}
  ];
  var css='.op-backdrop{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.55);display:none;align-items:flex-end;justify-content:center}'+
    '.op-backdrop.open{display:flex}@media(min-width:640px){.op-backdrop{align-items:center}}'+
    '.op-card{width:min(440px,100%);background:#fff;color:#111;border-radius:16px 16px 0 0;padding:22px 20px 24px;font-family:inherit;box-shadow:0 10px 40px rgba(0,0,0,.25)}'+
    '@media(min-width:640px){.op-card{border-radius:16px}}'+
    '.op-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px}'+
    '.op-head h2{font-size:21px;line-height:1.2;margin:0;letter-spacing:-.02em}.op-head p{margin:4px 0 0;font-size:13px;color:#6b6b6b}'+
    '.op-close{width:34px;height:34px;flex:0 0 34px;border:0;border-radius:50%;background:#f0efec;font-size:20px;cursor:pointer;color:#111}'+
    '.op-loc{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px;margin-top:10px;border:1px solid #e3e1dd;border-radius:12px;text-decoration:none;color:#111;transition:border-color .15s,background .15s}'+
    '.op-loc:hover{border-color:#111;background:#faf9f7}.op-loc strong{display:block;font-size:15px;color:#111}.op-loc>span>span{display:block;font-size:12px;color:#6b6b6b;margin-top:2px}'+
    '.op-loc b{flex:0 0 auto;background:#111;color:#fff;border-radius:20px;padding:8px 14px;font-size:13px}'+
    '.op-foot{margin-top:14px;font-size:11px;color:#8a8a8a;text-align:center}';
  var root;
  function build(){
    if(root)return root;
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
    root=document.createElement('div');root.className='op-backdrop';root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-labelledby','opTitle');
    root.innerHTML='<div class="op-card"><div class="op-head"><div><h2 id="opTitle">Choose your location</h2><p id="opSub">Pickup or delivery, ordered through ChowNow.</p></div><button class="op-close" type="button" aria-label="Close">×</button></div>'+
      LOCATIONS.map(function(l){return '<a class="op-loc" href="'+l.url+'" target="_blank" rel="noopener"><span><strong>'+l.name+'</strong><span>'+l.address+'</span></span><b>Order</b></a>'}).join('')+
      '<div class="op-foot">You’ll finish your order on ChowNow.</div></div>';
    document.body.appendChild(root);
    root.addEventListener('click',function(e){if(e.target===root||e.target.closest('.op-close')||e.target.closest('.op-loc'))close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
    return root;
  }
  function open(item){build();var sub=root.querySelector('#opSub');sub.textContent=item?('Order '+item+' for pickup or delivery through ChowNow.'):'Pickup or delivery, ordered through ChowNow.';root.classList.add('open');var f=root.querySelector('.op-loc');if(f)f.focus()}
  function close(){if(root)root.classList.remove('open')}
  window.FlamebachiOrder={open:open,close:close,locations:LOCATIONS};
  document.addEventListener('click',function(e){var t=e.target.closest('[data-order]');if(!t)return;e.preventDefault();open(t.getAttribute('data-order-item')||'')});
})();
