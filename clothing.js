/* Clothing page: Yeezy Archive | Tour Merch | Yeezy.com, plus a Change Theme (yeezy.com-style) view */
(()=>{
const pg=document.getElementById('pg-clothing'),root=document.getElementById('clScreen');if(!pg||!root)return;
const YZ=[["TS-01",["/szn/ts-01-gray","/szn/ts-01-white"]],["TS-02",["/szn/ts-02-white"]],["HD-01",["/szn/hd-01-white","/szn/tour/p/soldierfield-hd-01-black","/szn/tour/p/soldierfield-hd-01-white","/szn/tour/p/algarve-algarve-hdo1-blk","/szn/tour/p/algarve-algarve-hdo1-wht","/szn/tour/p/tampa-tampahdo1-white"]],["WB-01",["/szn/wb-01-black","/szn/wb-01-gray","/szn/tour/p/soldierfield-wb-01-black","/szn/tour/p/cdmx-wbo1-black","/szn/tour/p/cdmx-wbo1-grey","/szn/tour/p/cdmx-wbo1-white"]],["HD-05",[]],["HD-10",[]],["TT-02",["/szn/tt-02-black"]],["BD-03",["/szn/bd-03-black"]],["BD-04",["/szn/bd-04-black"]],["BD-05",[]],["LS-02",[]],["LS-14",[]],["TT-04",["/szn/tt-04-black"]],["TC-01",[]],["TT-09",[]],["JC-03",[]],["RC-02",[]],["TS-05",["/szn/ts-05-dark-blue"]],["HD-02",[]],["HD-03",["/szn/hd-03-black"]],["WB-02",[]],["WB-03",[]],["JC-01",[]],["JC-02",[]],["JC-05",[]],["LS-13",[]],["PL-08",[]],["TT-03",[]],["TT-05",[]],["TS-04",["/szn/ts-04-black"]],["BD-02",[]],["BD-09",[]],["LS-01",[]],["LS-04",["/szn/ls-04-black"]],["LS-06",[]],["LS-15",[]],["BR-09",["/szn/br-09-black"]],["JK-15",[]],["SH-01",["/szn/sh-01-black","/szn/sh-01-gray","/szn/tour/p/cdmx-sho1-black","/szn/tour/p/cdmx-sho1-white"]],["SP-01",["/szn/sp-01-black","/szn/sp-01-white","/szn/tour/p/cdmx-spo1-black","/szn/tour/p/cdmx-spo1-white"]],["SP-06",["/szn/sp-06-black","/szn/sp-06-white","/szn/sp-06-gray"]],["SP-08",[]],["SP-09",["/szn/sp-09-light-gray"]],["LG-01",["/szn/lg-01-black"]],["LG-13",["/szn/lg-13-black"]],["SH-10",[]],["PT-01",[]],["PT-02",[]],["PT-03",[]],["SH-03",[]],["SH-05",[]],["SH-06",["/szn/sh-06-black"]],["LG-04",["/szn/lg-04-black"]],["UW-02",["/szn/uw-02-black"]],["SK-01",["/szn/sk-01-black","/szn/sk-01-gray","/szn/sk-01-white"]],["YS-01",["/szn/ys-01-chocolate","/szn/ys-01-black"]],["SL-01",["/szn/sl-01-white","/szn/sl-01-gray","/szn/sl-01-black"]],["SL-02",["/szn/sl-02-black"]],["HL-01",["/szn/hl-01-black"]],["HL-02",["/szn/hl-02-black"]],["HL-03",["/szn/hl-03-black"]],["HB-01",["/szn/hb-01-black"]],["PD-01",[]],["HT-01",["/szn/tour/p/sofi-hto1","/szn/tour/p/cdmx-hto1-black","/szn/tour/p/cdmx-hto1-white"]],["SG-01",[]],["SG-02",[]],["BP-01",["/szn/bp-01-black"]]];
const KEY='clTheme',get=()=>{try{return localStorage.getItem(KEY)==='1'}catch{return false}},put=v=>{try{localStorage.setItem(KEY,v?'1':'0')}catch{}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let on=get(),tab='arch';
const st=document.createElement('style');st.textContent=`
.clScreen{max-width:1380px;margin:0 auto;padding:84px 22px 90px;color:#fff}
.clScreen .eyebrow{color:var(--accent2);font-weight:800;letter-spacing:.18em;font-size:12px}
.clScreen .title{font-size:clamp(40px,6vw,76px);font-weight:900;letter-spacing:-.055em;margin:4px 0}
.clScreen .muted{color:#bbb}
.clBar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:18px 0 22px}
.clBar .tNav{margin:0}
.clTh{border:1px solid #ffffff40;background:#ffffff0d;color:#fff;border-radius:999px;padding:8px 16px;font:600 12px/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}
.clTh:hover{background:#ffffff24}
.clPane[hidden]{display:none}
.clYz a{color:inherit}
.clNote{margin:0 0 14px;color:#fff9;font-size:13px}
.clNote a{color:#fff}
.clX{display:grid;place-items:center;aspect-ratio:1;background:#ffffff0d;font:700 15px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;color:#fff9}
/* yeezy.com style */
body.clyOn header .mark,body.clyOn header .live,body.clyOn header #upd{color:#000!important;text-shadow:none!important}
.clScreen.clY{position:fixed;inset:0;z-index:50;background:#fff;color:#000;overflow:auto;max-width:none;margin:0;padding:64px 16px 60px;font-family:Helvetica,Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em}
.clScreen.clY .eyebrow,.clScreen.clY .muted,.clScreen.clY .title{display:none}
.clY .clWm{display:block!important}
.clWm{display:none;text-align:center;font:700 22px/1 Helvetica,Arial,sans-serif;letter-spacing:.5em;padding-left:.5em;margin:14px 0 22px}
.clY .clBar{justify-content:center;margin:0 0 18px;gap:18px}
.clY .tNav{gap:22px}
.clY .tNav button{border:0;border-radius:0;background:none;color:#9a9a9a;padding:6px 0;font:400 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.14em;border-bottom:1px solid transparent}
.clY .tNav button:hover{color:#000;background:none}
.clY .tNav button[aria-current=true]{background:none;color:#000;border-bottom-color:#000}
.clY .clTh{border-radius:0;border:1px solid #000;background:#fff;color:#000;font:400 10px/1 Helvetica,Arial,sans-serif}
.clY .clTh:hover{background:#000;color:#fff}
.clY .tHead{justify-content:center;text-align:center;margin:8px 0 14px}
.clY .tHead h2{font:400 12px/1 Helvetica,Arial,sans-serif;letter-spacing:.2em;color:#000}
.clY .tHead p{color:#8a8a8a;font-size:10px;letter-spacing:.14em}
.clY .tChips{justify-content:center}
.clY .tChips button{border:0;border-radius:0;background:none;color:#9a9a9a;padding:4px 6px;font:400 10px/1 Helvetica,Arial,sans-serif;letter-spacing:.14em}
.clY .tChips button.on{background:none;color:#000;text-decoration:underline;text-underline-offset:4px}
.clY .yaQ{display:block;margin:0 auto 20px;border-radius:0;border:0;border-bottom:1px solid #000;background:none;color:#000;text-align:center;font:400 11px Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase}
.clY .yaQ::placeholder{color:#9a9a9a}
.clY .mGrid{gap:26px 14px;grid-template-columns:repeat(auto-fill,minmax(170px,1fr))}
.clY .mc,.clY .yaT{background:none;border-radius:0;color:#000}
.clY .mcI{background:#fff}.clY .mcI img{mix-blend-mode:multiply}
.clY .mcN{padding:8px 0 0;font:400 10px/1.5 Helvetica,Arial,sans-serif;letter-spacing:.12em;text-align:center;color:#000}
.clY .yaT small{color:#555}
.clY .mSec h3{font:400 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.2em;color:#000;text-align:center;margin:26px 0 14px}
.clY .mcI.x,.clY .clX{background:#f2f2f2;color:#888}
.clY .tEmpty,.clY .yaCr,.clY .clNote{color:#8a8a8a;text-align:center;font-size:10px}
.clY .yaCr a,.clY .clNote a{color:#000}
.clY .yaMore{border-radius:0;border:1px solid #000;background:#fff;color:#000;font:400 10px/1 Helvetica,Arial,sans-serif}
.clY .yaMore:hover{background:#000;color:#fff}
.clY .tYBtn{background:#fff;color:#000;border:1px solid #000;border-radius:0;box-shadow:none;font:400 11px/1 Helvetica,Arial,sans-serif;letter-spacing:.14em;padding:8px 12px}
.clY .tYBtn i{border-color:#000}
.clY .tYMenu{background:#fff;border:1px solid #000;border-radius:0;box-shadow:none}
.clY .tYMenu li{color:#000;border-radius:0;font:400 11px/1 Helvetica,Arial,sans-serif}
.clY .tYMenu li:hover,.clY .tYMenu li:focus-visible{background:#f2f2f2;color:#000}
.clY .tYMenu li[aria-selected=true]{background:#000;color:#fff}
.clY .tYMenu li[aria-selected=true]::after{border-color:#fff}
.clScreen.clY.in{animation:clIn .7s cubic-bezier(.2,.8,.2,1) both}
.clScreen.clY.in>*{animation:clUp .7s cubic-bezier(.2,.8,.2,1) both}
.clScreen.clY.in>*:nth-child(2){animation-delay:.1s}.clScreen.clY.in>*:nth-child(3){animation-delay:.18s}.clScreen.clY.in>*:nth-child(4){animation-delay:.26s}
.clScreen.clY.out{animation:clOut .35s ease both;pointer-events:none}
@keyframes clIn{from{clip-path:circle(0% at 50% 20%);opacity:.4}to{clip-path:circle(150% at 50% 20%);opacity:1}}
@keyframes clUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes clOut{to{opacity:0}}
@media(prefers-reduced-motion:reduce){.clScreen.clY.in,.clScreen.clY.in>*,.clScreen.clY.out{animation:none}}
@media(max-width:700px){.clScreen{padding:84px 16px 90px}.clY .mGrid{grid-template-columns:repeat(2,1fr)}}
`;document.head.appendChild(st);
root.innerHTML=`<div class="eyebrow">STYLE</div><h1 class="title">CLOTHING</h1><div class="muted">Every piece in the Yeezy archive, the tour merch, and what's on yeezy.com now.</div>
<div class="clWm">YEEZY</div>
<div class="clBar"><div class="tNav" role="tablist"><button type="button" data-t="arch">Yeezy Archive</button><button type="button" data-t="tour">Tour Merch</button><button type="button" data-t="yz">Yeezy.com</button></div><button type="button" class="clTh" data-th>Change Theme</button></div>
<section class="clPane" data-p="arch"></section><section class="clPane" data-p="tour" hidden></section><section class="clPane clYz" data-p="yz" hidden></section>`;
const P=k=>root.querySelector('[data-p="'+k+'"]'),done={};
function renderYz(){const el=P('yz'),U=window.__tourUI;
 el.innerHTML='<div class="tHead"><div><h2>Yeezy.com</h2><p>Loading…</p></div></div>';
 U.loadYA().then(d=>{const by={};d.items.forEach(it=>by[it[1]]=it);
  const have=YZ.filter(z=>z[1].length).length;
  el.innerHTML=`<div class="tHead"><div><h2>Yeezy.com</h2><p>${YZ.length} products listed now</p></div></div><p class="clNote">Product codes as listed on <a href="https://yeezy.com/" target="_blank" rel="noopener noreferrer">yeezy.com</a>. Photos shown where the Yeezy Archive has them (${have} of ${YZ.length}).</p>
  <div class="mGrid">${YZ.map((z,k)=>{const it=by[z[1][0]],im=it&&U.yaImg(it[2]);return im?`<button type="button" class="yaT mc" data-k="${k}" aria-label="${esc(z[0])}"><div class="mcI"><img loading="lazy" referrerpolicy="no-referrer" alt="" src="${esc(im)}"></div><div class="mcN">${esc(z[0])}</div></button>`:`<div class="yaT mc" aria-label="${esc(z[0])}"><div class="clX">${esc(z[0])}</div><div class="mcN">${esc(z[0])}</div></div>`}).join('')}</div>`;
  el.querySelectorAll('button.yaT').forEach(b=>b.onclick=()=>{const z=YZ[+b.dataset.k],imgs=[];z[1].forEach(u=>{const it=by[u];if(!it)return;((it[6]&&it[6].length)?it[6]:[it[2]]).forEach(x=>{x=U.yaImg(x);if(x&&!imgs.includes(x))imgs.push(x)})});const it=by[z[1][0]];U.openViewer({n:z[0],p:/^\$/.test(it&&it[4])?it[4]:''},imgs)})
 }).catch(()=>{el.innerHTML='<div class="tEmpty">Could not load. Refresh and try again.</div>'})}
function setTab(t){tab=t;root.querySelectorAll('.tNav button').forEach(b=>b.setAttribute('aria-current',b.dataset.t===t?'true':'false'));root.querySelectorAll('.clPane').forEach(p=>p.hidden=p.dataset.p!==t);
 const U=window.__tourUI;if(!U||done[t])return;done[t]=1;if(t==='arch')U.renderArch(P('arch'));else if(t==='tour')U.ready().then(()=>U.renderMerch(P('tour')));else renderYz()}
root.querySelectorAll('.tNav button').forEach(b=>b.onclick=()=>{setTab(b.dataset.t);scrollTo({top:0});root.scrollTo&&root.scrollTo({top:0})});
function sync(){const show=on&&!pg.hidden;document.body.classList.toggle('clyOn',show);
 if(show&&(!root.classList.contains('clY')||root.classList.contains('out'))){clearTimeout(root._t);root.classList.remove('out');root.classList.add('clY');root.classList.remove('in');void root.offsetWidth;root.classList.add('in')}
 else if(!show&&root.classList.contains('clY')){if(pg.hidden){root.classList.remove('clY','in','out')}else{root.classList.remove('in');root.classList.add('out');root._t=setTimeout(()=>root.classList.remove('clY','out'),350)}}}
root.querySelector('[data-th]').onclick=()=>{on=!on;put(on);sync();if(!on)scrollTo({top:0})};
new MutationObserver(sync).observe(pg,{attributes:true,attributeFilter:['hidden']});
window.PH=window.PH||{};PH.clothing={show(){root.classList.add('activeScreen');setTab(tab);sync()},hide(){root.classList.remove('activeScreen');sync()}};
root.querySelector('.tNav button').setAttribute('aria-current','true');sync();
})();
