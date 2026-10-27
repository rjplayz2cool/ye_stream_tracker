/* Tours: Map / Recordings / Merch screens */
(()=>{
const root=document.getElementById('toursScreen'),pg=document.getElementById('pg-tours');if(!root||!pg)return;
const css=`
.tNav{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 0}
.tNav button{border:1px solid #ffffff26;background:#ffffff0d;color:#fffc;border-radius:999px;padding:8px 16px;font:600 12px/1 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.tNav button:hover{background:#ffffff1c;color:#fff}
.tNav button[aria-current=true]{background:#fff;color:#000;border-color:#fff}
.tScr{display:none}.tScr.on{display:block;animation:tScrIn .38s cubic-bezier(.2,.8,.2,1)}
.tScr.fromL.on{animation-name:tScrInL}
@keyframes tScrIn{from{opacity:0;transform:translateX(36px)}to{opacity:1;transform:none}}
@keyframes tScrInL{from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:none}}
.tEdge{position:fixed;top:50%;right:8px;translate:0 -50%;z-index:40;display:grid;place-items:center;gap:6px;width:56px;height:96px;padding:0;border:0;background:none;color:#fff;cursor:pointer;-webkit-tap-highlight-color:transparent}
.tEdge.left{right:auto;left:8px}
.tEdge[hidden]{display:none}
.tEdge b{display:block;width:26px;height:26px;border-top:6px solid #fff;border-right:6px solid #fff;border-radius:3px;rotate:45deg;font-size:0;filter:drop-shadow(0 2px 12px #000b);animation:nudge 2s ease-in-out infinite;transition:scale .3s cubic-bezier(.34,1.45,.5,1)}
.tEdge.left b{rotate:-135deg;animation-name:nudgeL}
.tEdge span{font:700 10px/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fffc;text-shadow:0 1px 8px #000}
.tEdge:hover b,.tEdge:focus-visible b{scale:1.25}
.tEdge:focus-visible{outline:3px solid #fff;outline-offset:2px;border-radius:14px}
@media(min-width:701px){.tScr[data-s=rec],.tScr[data-s=merch]{padding:0 50px}}
@media(max-width:700px){.tEdge{width:36px;left:2px}.tEdge:not(.left){right:2px;left:auto}.tEdge span{display:none}.tScr[data-s=rec],.tScr[data-s=merch]{padding:0 26px}.tEdge b{width:20px;height:20px;border-width:5px}}
.tHead{display:flex;align-items:flex-end;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:22px 0 14px}
.tHead h2{margin:0;font:800 clamp(22px,3.4vw,34px)/1 system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase}
.tHead p{margin:6px 0 0;color:#fff9;font-size:13px}
.tYSel{position:relative}
.tYSel select{appearance:none;-webkit-appearance:none;background:#ffffff12;color:#fff;border:1px solid #ffffff33;border-radius:12px;padding:10px 38px 10px 16px;font:700 15px/1 system-ui,sans-serif;letter-spacing:.08em;cursor:pointer}
.tYSel select:hover{background:#ffffff1f}.tYSel select option{color:#000}
.tYSel::after{content:"";position:absolute;right:15px;top:50%;width:8px;height:8px;border-right:2px solid #fffc;border-bottom:2px solid #fffc;translate:0 -70%;rotate:45deg;pointer-events:none}
.tChips{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}
.tChips button{border:1px solid #ffffff26;background:#ffffff0d;color:#fffc;border-radius:999px;padding:7px 14px;font:600 12px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
.tChips button.on{background:#fff;color:#000;border-color:#fff}
.rGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}
.rc{background:#ffffff0b;border:1px solid #ffffff1c;border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .25s cubic-bezier(.2,.8,.2,1),border-color .2s,background .2s;outline:0}
.rc:hover,.rc:focus-visible{transform:translateY(-3px);border-color:#ffffff55;background:#ffffff12}
.rc.na{cursor:default;opacity:.55}.rc.na:hover{transform:none}
.rcImg{position:relative;aspect-ratio:16/9;background:#111 center/cover;overflow:hidden}
.rcImg img{width:100%;height:100%;object-fit:cover;display:block;transition:scale .5s}
.rc:hover .rcImg img{scale:1.05}
.rcTag,.rcSpec{position:absolute;top:10px;padding:4px 8px;border-radius:7px;background:#000a;color:#fff;font:700 10px/1 system-ui,sans-serif;letter-spacing:.1em;backdrop-filter:blur(6px)}
.rcTag{left:10px}.rcSpec{right:10px}
.rcPlay{position:absolute;inset:0;margin:auto;width:52px;height:52px;border-radius:50%;background:#000a;display:grid;place-items:center;opacity:0;transition:opacity .2s;backdrop-filter:blur(6px)}
.rcPlay::after{content:"";border-left:16px solid #fff;border-top:10px solid transparent;border-bottom:10px solid transparent;margin-left:4px}
.rc:hover .rcPlay,.rc:focus-visible .rcPlay{opacity:1}
.rc.na .rcPlay{display:none}
.rcB{padding:12px 14px 14px}
.rcB h3{margin:0 0 7px;font:800 15px/1.2 system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase}
.rcCred{font-size:12px;color:#fffa;line-height:1.4}
.rcCred a{color:#fff;text-decoration:underline;text-underline-offset:2px}
.rcCred.off{color:#fff8}
.tEmpty{padding:60px 10px;text-align:center;color:#fff9}
.rcM{position:fixed;inset:0;z-index:200;background:#000d;backdrop-filter:blur(8px);display:grid;place-items:center;padding:18px;animation:tScrIn .25s}
.rcM[hidden]{display:none}
.rcMBox{width:min(1100px,100%);max-height:94vh;overflow:auto;background:#101014;border:1px solid #ffffff26;border-radius:18px;padding:16px}
.rcMTop{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px}
.rcMTop h3{margin:0;font:800 20px/1.1 system-ui,sans-serif;letter-spacing:.04em;text-transform:uppercase}
.rcMTop small{display:block;margin-top:5px;color:#fff9;font-size:12px}
.rcX{border:0;background:#ffffff1a;color:#fff;border-radius:50%;width:36px;height:36px;font-size:18px;cursor:pointer;flex:none}
.rcX:hover{background:#ffffff33}
.rcMBox video{display:block;width:100%;max-height:60vh;background:#000;border-radius:12px}
.rcErr{margin:8px 0 0;color:#ffb4b4;font-size:13px}
.rcMCred{margin:14px 0 0;padding:12px 14px;border-radius:12px;background:#ffffff0d;font-size:13px;line-height:1.5}
.rcMCred b{display:block;font:700 11px/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fff9;margin-bottom:6px}
.rcMCred a{color:#fff;text-underline-offset:2px}
.rcTs{margin-top:14px}.rcTs>b{display:block;font:700 11px/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fff9;margin-bottom:8px}
.rcTsL{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:4px 14px}
.rcTsL button{display:flex;justify-content:space-between;gap:10px;text-align:left;border:0;background:none;color:#fff;padding:7px 8px;border-radius:8px;font:500 13px/1.2 system-ui,sans-serif;cursor:pointer}
.rcTsL button:hover{background:#ffffff1a}.rcTsL button i{font-style:normal;color:#fff9;font-variant-numeric:tabular-nums}
.mSec{margin:0 0 26px}.mSec h3{margin:0 0 10px;font:800 14px/1 system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#fffc}
.mGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.mc{position:relative;background:#ffffff0b;border:1px solid #ffffff1c;border-radius:14px;overflow:hidden;cursor:pointer;padding:0;color:#fff;text-align:left;transition:transform .25s cubic-bezier(.2,.8,.2,1),border-color .2s}
.mc:hover,.mc:focus-visible{transform:translateY(-3px);border-color:#ffffff55;outline:0}
.mcI{aspect-ratio:1;background:#16161a;position:relative}
.mcI img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .3s}
.mcI img.bk{opacity:0}.mc.flip .mcI img.bk,.mc:hover .mcI img.bk.h{opacity:1}.mc.flip .mcI img.fr,.mc:hover .mcI img.fr.h{opacity:0}
.mcN{padding:9px 10px 11px;font:700 11px/1.25 system-ui,sans-serif;letter-spacing:.07em;text-transform:uppercase}
.mcF{position:absolute;right:7px;top:7px;font:700 9px/1 system-ui,sans-serif;letter-spacing:.1em;background:#000a;padding:4px 6px;border-radius:6px}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

/* ---- structure ---- */
const top=root.querySelector('.top');
const mapScr=document.createElement('div');mapScr.className='tScr on';mapScr.dataset.s='map';
[...root.children].forEach(ch=>{if(ch!==top)mapScr.appendChild(ch)});
const recScr=document.createElement('div');recScr.className='tScr';recScr.dataset.s='rec';
const merScr=document.createElement('div');merScr.className='tScr';merScr.dataset.s='merch';
root.append(mapScr,recScr,merScr);
const SC=[{k:'map',n:'Map',el:mapScr},{k:'rec',n:'Recordings',el:recScr},{k:'merch',n:'Merch',el:merScr}];
const nav=document.createElement('div');nav.className='tNav';nav.setAttribute('role','tablist');
SC.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.textContent=s.n;b.onclick=()=>show(i);nav.appendChild(b);s.btn=b});
top.after(nav);
const eL=document.createElement('button'),eR=document.createElement('button');
eL.className='tEdge left';eR.className='tEdge';eL.type=eR.type='button';
eL.innerHTML='<b aria-hidden="true">›</b><span></span>';eR.innerHTML='<b aria-hidden="true">›</b><span></span>';
eL.onclick=()=>show(cur-1);eR.onclick=()=>show(cur+1);pg.append(eL,eR);

let cur=0,A=null,year=null,recFilter='all',merchFilter='all',loading=null;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function show(i){if(i<0||i>=SC.length||i===cur)return;const dir=i<cur;cur=i;
 SC.forEach((s,j)=>{s.el.classList.toggle('on',j===i);s.el.classList.toggle('fromL',dir);s.btn.setAttribute('aria-current',j===i?'true':'false')});
 eL.hidden=i===0;eR.hidden=i===SC.length-1;
 if(i>0)eL.querySelector('span').textContent=SC[i-1].n;if(i<SC.length-1)eR.querySelector('span').textContent=SC[i+1].n;
 eL.setAttribute('aria-label','Go to '+(SC[i-1]?.n||''));eR.setAttribute('aria-label','Go to '+(SC[i+1]?.n||''));
 scrollTo({top:0});if(i>0)ensure().then(()=>render())}
SC[0].btn.setAttribute('aria-current','true');eL.hidden=true;eR.querySelector('span').textContent='Recordings';eR.setAttribute('aria-label','Go to Recordings');
function ensure(){if(A)return Promise.resolve();if(loading)return loading;
 loading=new Promise((res,rej)=>{const s=document.createElement('script');s.src='tours-archive.js';s.onload=()=>{A=window.TOUR_ARCHIVE;year=Object.keys(A).sort().pop();res()};s.onerror=()=>{loading=null;rej()};document.head.appendChild(s)})
  .catch(()=>{[recScr,merScr].forEach(e=>e.innerHTML='<div class="tEmpty">Could not load the archive. Refresh and try again.</div>')});return loading}
document.addEventListener('keydown',e=>{if(pg.hidden||modal&&!modal.hidden||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1)});
new MutationObserver(()=>{[eL,eR].forEach(b=>b.style.display=pg.hidden?'none':'')}).observe(pg,{attributes:true,attributeFilter:['hidden']});[eL,eR].forEach(b=>b.style.display=pg.hidden?'none':'');

function yearSel(){const ys=Object.keys(A).sort().reverse();return `<div class="tYSel"><select aria-label="Year">${ys.map(y=>`<option value="${y}"${y===year?' selected':''}>${y}</option>`).join('')}</select></div>`}
function bindYear(el){el.querySelector('select').onchange=e=>{year=e.target.value;recFilter='all';merchFilter='all';render()}}
function render(){if(!A)return;if(cur===1)renderRec();if(cur===2)renderMerch()}

/* ---- Recordings ---- */
const CAT={live:'Live',visualizer:'Visualizer'};
const ytName={};
function ytTitle(url){if(ytName[url]!==undefined)return Promise.resolve(ytName[url]);
 try{const c=localStorage.getItem('ytn:'+url);if(c){ytName[url]=c;return Promise.resolve(c)}}catch{}
 return fetch('https://noembed.com/embed?url='+encodeURIComponent(url)).then(r=>r.json()).then(j=>{const n=j.author_name||'';ytName[url]=n;try{if(n)localStorage.setItem('ytn:'+url,n)}catch{}return n}).catch(()=>{ytName[url]='';return ''})}
function credHTML(s){return s.cr?`Credit · <a href="${esc(s.cr)}" target="_blank" rel="noopener noreferrer" data-yt="${esc(s.cr)}">YouTube</a>`:(s.c==='visualizer'?'Official visualizer from Ye':'Official stream from Ye')}
function renderRec(){const Y=A[year];if(!Y){recScr.innerHTML='';return}
 const cats=[...new Set(Y.shows.map(s=>s.c))];if(recFilter!=='all'&&!cats.includes(recFilter))recFilter='all';
 const list=Y.shows.filter(s=>recFilter==='all'||s.c===recFilter);
 recScr.innerHTML=`<div class="tHead"><div><h2>Show Recordings</h2><p>${Y.shows.filter(s=>s.v).length} recordings · ${year}</p></div>${yearSel()}</div>
 ${cats.length>1?`<div class="tChips">${['all',...cats].map(c=>`<button type="button" data-c="${c}" class="${c===recFilter?'on':''}">${c==='all'?'All':(CAT[c]||c)}</button>`).join('')}</div>`:''}
 ${list.length?`<div class="rGrid">${list.map(s=>{const i=Y.shows.indexOf(s);return `<article class="rc${s.v?'':' na'}" data-i="${i}" ${s.v?'tabindex="0" role="button"':''} aria-label="${esc(s.n)}"><div class="rcImg"><img loading="lazy" referrerpolicy="no-referrer" alt="" src="${esc(s.img)}"><span class="rcTag">${esc(s.v?(CAT[s.c]||s.c):'Not yet available')}</span>${s.sp?`<span class="rcSpec">${esc(s.sp)}</span>`:''}<i class="rcPlay"></i></div><div class="rcB"><h3>${esc(s.n)}</h3><div class="rcCred${s.cr?'':' off'}">${s.v?credHTML(s):'Recording not released yet'}</div></div></article>`}).join('')}</div>`:'<div class="tEmpty">No recordings for this year yet.</div>'}`;
 bindYear(recScr);
 recScr.querySelectorAll('.tChips button').forEach(b=>b.onclick=()=>{recFilter=b.dataset.c;renderRec()});
 recScr.querySelectorAll('.rc:not(.na)').forEach(c=>{const open=()=>openModal(Y.shows[+c.dataset.i]);c.onclick=e=>{if(e.target.closest('a'))return;open()};c.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}});
 recScr.querySelectorAll('a[data-yt]').forEach(a=>ytTitle(a.dataset.yt).then(n=>{if(n)a.textContent=n+' (YouTube)'}))}

/* ---- modal ---- */
let modal=null;
function secs(t){return String(t).split(':').reduce((a,x)=>a*60+(+x||0),0)}
function openModal(s){if(!modal){modal=document.createElement('div');modal.className='rcM';modal.hidden=true;modal.innerHTML='<div class="rcMBox" role="dialog" aria-modal="true"></div>';document.body.appendChild(modal);modal.onclick=e=>{if(e.target===modal)closeModal()};document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal()})}
 const box=modal.firstChild;
 box.innerHTML=`<div class="rcMTop"><div><h3>${esc(s.n)}</h3><small>${esc([CAT[s.c]||s.c,s.sp,year].filter(Boolean).join(' · '))}</small></div><button type="button" class="rcX" aria-label="Close">✕</button></div>
 <video controls playsinline preload="metadata" poster="${esc(s.img)}" src="${esc(s.v)}"></video><div class="rcErr" hidden>This video could not be played here. <a href="https://yetour.xyz/" target="_blank" rel="noopener noreferrer" style="color:#fff">Open it on yetour.xyz</a>.</div>
 <div class="rcMCred"><b>Credits</b>${s.cr?`Video by <a href="${esc(s.cr)}" target="_blank" rel="noopener noreferrer" data-yt="${esc(s.cr)}">the original uploader on YouTube</a>`:(s.c==='visualizer'?'Official visualizer from Ye.':'Official stream from Ye.')}</div>
 ${s.ts.length?`<div class="rcTs"><b>Timestamps</b><div class="rcTsL">${s.ts.map(t=>`<button type="button" data-t="${secs(t[1])}"><span>${esc(t[0])}</span><i>${esc(t[1])}</i></button>`).join('')}</div></div>`:''}`;
 const v=box.querySelector('video');v.onerror=()=>{box.querySelector('.rcErr').hidden=false};
 box.querySelector('.rcX').onclick=closeModal;
 box.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{v.currentTime=+b.dataset.t;v.play().catch(()=>{});v.scrollIntoView({block:'nearest',behavior:'smooth'})});
 box.querySelectorAll('a[data-yt]').forEach(a=>ytTitle(a.dataset.yt).then(n=>{if(n)a.textContent=n+' on YouTube'}));
 modal.hidden=false;document.body.style.overflow='hidden';box.querySelector('.rcX').focus()}
function closeModal(){if(!modal||modal.hidden)return;const v=modal.querySelector('video');if(v){v.pause();v.removeAttribute('src');v.load()}modal.hidden=true;document.body.style.overflow=''}

/* ---- Merch ---- */
function vlabel(k){return (window.TOUR_ARCHIVE_VENUES||{})[k]||k.toUpperCase()}
function renderMerch(){const Y=A[year];if(!Y){merScr.innerHTML='';return}
 const vs=[...new Set(Y.merch.map(m=>m.v))];if(merchFilter!=='all'&&!vs.includes(merchFilter))merchFilter='all';
 const groups=vs.filter(v=>merchFilter==='all'||v===merchFilter);
 merScr.innerHTML=`<div class="tHead"><div><h2>Tour Merch</h2><p>${Y.merch.length} items · ${year}</p></div>${yearSel()}</div>
 ${vs.length>1?`<div class="tChips">${['all',...vs].map(v=>`<button type="button" data-v="${esc(v)}" class="${v===merchFilter?'on':''}">${v==='all'?'All':esc(vlabel(v))}</button>`).join('')}</div>`:''}
 ${groups.length?groups.map(v=>`<section class="mSec"><h3>${esc(vlabel(v))}</h3><div class="mGrid">${Y.merch.filter(m=>m.v===v).map(m=>{const base='https://media.yetour.xyz/merch/'+encodeURIComponent(m.v)+'/';return `<button type="button" class="mc" aria-label="${esc(m.n)}"><div class="mcI"><img class="fr${m.b?' h':''}" loading="lazy" referrerpolicy="no-referrer" alt="${esc(m.n)}" src="${base+encodeURIComponent(m.f)}">${m.b?`<img class="bk h" loading="lazy" referrerpolicy="no-referrer" alt="" src="${base+encodeURIComponent(m.b)}"><span class="mcF">FLIP</span>`:''}</div><div class="mcN">${esc(m.n)}</div></button>`}).join('')}</div></section>`).join(''):'<div class="tEmpty">No merch listed for this year.</div>'}`;
 bindYear(merScr);
 merScr.querySelectorAll('.tChips button').forEach(b=>b.onclick=()=>{merchFilter=b.dataset.v;renderMerch()});
 merScr.querySelectorAll('.mc').forEach(c=>c.onclick=()=>c.classList.toggle('flip'))}
})();
