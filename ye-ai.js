/* Ye AI: chat tab. Retrieval runs in the browser over the Ye Tracker archive + site data,
   the matching entries are sent to the ye-ai edge function (Gemini free tier). */
(()=>{
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CFG=window.YE_SUPABASE||{};
const LIVE=!!(window.supabase&&CFG.url&&CFG.anonKey&&!String(CFG.url).includes('YOUR_'));
let sb=null;try{if(LIVE)sb=window.supabase.createClient(CFG.url,CFG.anonKey)}catch(e){}
let docs=null,loading=null,hist=[],sending=false,built=false;
const STOP=new Set('a an the is are was were be been of to in on at for from by with and or but not do does did what whats which who whom when where why how tell me about any all that this these those it its i you your my can could would should have has had get got give list some more most song songs ye kanye west'.split(' '));
const strip=h=>String(h??'').replace(/<br\s*\/?>/gi,' | ').replace(/<[^>]+>/g,'').replace(/&#x27;|&#39;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();

async function load(){
  if(docs)return docs;
  if(loading)return loading;
  loading=(async()=>{
    const out=[];
    try{
      const r=await fetch('data/ye-tracker-archive.txt');if(!r.ok)throw 0;
      const bin=atob((await r.text()).trim()),b=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)b[i]=bin.charCodeAt(i);
      const data=JSON.parse(await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
      for(const cat of data){
        const H=cat.headers||[];
        for(const row of cat.rows){
          const c=row.cells.map(x=>strip(x[0]));
          const name=c[1]||'',era=row.era?strip(row.era):c[0];
          if(!name)continue;
          const notes=c[2]||'';
          const extra=[];for(let i=3;i<c.length;i++)if(c[i]&&!/^https?:/.test(c[i]))extra.push((H[i]?H[i]+': ':'')+c[i].slice(0,60));
          out.push({k:'t',cat:cat.name,era,name,notes,extra:extra.join('; '),ln:name.toLowerCase(),le:era.toLowerCase(),lo:notes.toLowerCase()});
        }
      }
    }catch(e){}
    try{const r=await fetch('data/ye-tweets.json');if(r.ok){for(const [d,t,l,id] of await r.json()){out.push({k:'x',cat:'Tweet',era:d,name:t,notes:'',extra:'',ln:t.toLowerCase(),le:d,lo:'',id,likes:l})}}}catch(e){}
    try{for(const ev of(window.CALENDAR_ANNUAL_EVENTS||[])){const t=`${ev.title} (${ev.releaseYear||''}, ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][ev.month-1]} ${ev.day})`;out.push({k:'c',cat:'Calendar',era:'',name:t,notes:'',extra:'',ln:t.toLowerCase(),le:'',lo:''})}}catch(e){}
    try{for(const s of(window.TOUR_SHOWS||[])){const t=`${s.date} ${s.venue||''} ${s.city||''}`.trim();out.push({k:'s',cat:'Tour show',era:s.tour||'',name:t,notes:'',extra:'',ln:t.toLowerCase(),le:(s.tour||'').toLowerCase(),lo:''})}}catch(e){}
    docs=out;return out;
  })();
  return loading;
}
function search(q,n,tw){
  const toks=[...new Set(q.toLowerCase().replace(/[^a-z0-9$&' ]/g,' ').split(/\s+/).filter(t=>t.length>1&&!STOP.has(t)))];
  const phrase=q.toLowerCase().replace(/[^a-z0-9$&' ]/g,' ').replace(/\s+/g,' ').trim();
  if(!toks.length||!docs)return[];
  const sc=[];
  for(const d of docs){
    if((d.k==='x')!==!!tw)continue;
    let s=0;
    for(const t of toks){if(d.ln.includes(t))s+=6;if(d.le.includes(t))s+=3;if(d.lo.includes(t))s+=2}
    if(!s)continue;
    if(phrase.length>3&&d.ln.includes(phrase))s+=14;
    if(d.k==='x'){if(s<6)continue;s+=Math.log10((d.likes||0)+1)*.35}
    if(d.cat==='Released'||d.cat==='Best Of'||d.cat==='Unreleased')s+=1.5;else if(/^(Art|Tracklists|Album Copies|Groupbuys|Stems)$/.test(d.cat))s-=1.5;
    if(s<=0)continue;
    sc.push([s,d]);
  }
  sc.sort((a,b)=>b[0]-a[0]);
  return sc.slice(0,n).map(x=>x[1]);
}
const fmtDoc=d=>d.k==='x'?`[Tweet by Ye, ${d.era}${d.likes?', '+(d.likes>=1e3?Math.round(d.likes/1e3)+'K':d.likes)+' likes':''}] ${d.name.replace(/\s+/g,' ').slice(0,420)}`:d.k==='t'?`[${d.cat}] ${d.era} | ${d.name}${d.notes?' | '+d.notes.slice(0,320):''}${d.extra?' | '+d.extra:''}`:`[${d.cat}] ${d.name}${d.era?' | '+d.era:''}`;

/* markdown-lite, escaped first */
function md(t){
  let h=esc(t);
  h=h.replace(/\*\*([^*\n]+)\*\*/g,'<b>$1</b>').replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?]|$)/g,'$1<i>$2</i>');
  const lines=h.split('\n'),out=[];let list=null;
  for(const L of lines){
    const m=L.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)$/);
    if(m){if(!list){list=/^\s*\d+\./.test(L)?'ol':'ul';out.push('<'+list+'>')}out.push('<li>'+m[1]+'</li>')}
    else{if(list){out.push('</'+list+'>');list=null}out.push(L.trim()?'<p>'+L+'</p>':'')}
  }
  if(list)out.push('</'+list+'>');
  return out.join('');
}
const SUGG=['What are the biggest unreleased Ye projects fans still want?','Who produced Runaway and how was it made?','Tell me about the Yandhi era','Which songs feature Kid Cudi?','What has Ye tweeted about his albums?','What\'s the story behind Donda?','Explain the difference between a snippet and a full leak'];
const welcome=()=>`<div class="aiHero"><div class="aiOrb" aria-hidden="true"></div><h2>Ask anything about Ye.</h2><p>Leaks, snippets, eras, producers, features, tours and more. Answers lean on the Ye Tracker archive of ${docs?docs.filter(d=>d.k==='t').length.toLocaleString():'22,000+'} entries and Ye's tweets from the YZY TWTS archive.</p><div class="aiSugg">${SUGG.map(s=>`<button type="button" class="aiChipBtn" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div></div>`;
function paint(){
  const box=$('aiLog');
  if(!hist.length){box.innerHTML=welcome();return}
  box.innerHTML=hist.map(m=>m.role==='user'?`<div class="aiMsg u"><div class="aiB">${esc(m.content)}</div></div>`:`<div class="aiMsg a"><div class="aiAv">AI</div><div class="aiB">${m.html||md(m.content)}${m.src&&m.src.length?`<details class="aiSrc"><summary>${m.src.length} sources used</summary><ul>${m.src.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></details>`:''}</div></div>`).join('')+(sending?'<div class="aiMsg a"><div class="aiAv">AI</div><div class="aiB aiTyping"><i></i><i></i><i></i></div></div>':'');
  box.scrollTop=box.scrollHeight;
  const sc=$('aiScroll');if(sc)sc.scrollTop=sc.scrollHeight;
}
async function authed(){if(!sb)return false;try{const {data}=await sb.auth.getSession();return !!data.session}catch(e){return false}}
async function gate(){
  const ok=await authed();
  $('aiGate').hidden=ok;$('aiChat').hidden=!ok;
  if(ok)paint();
  return ok;
}
function fallback(q,why){
  const hits=search(q,6);
  const body=hits.length?`<p>${esc(why)} Here's what the tracker has on that:</p><ul>${hits.map(d=>`<li><b>${esc(d.name)}</b> <span class="aiDim">${esc(d.cat+(d.era?' · '+d.era:''))}</span>${d.notes?'<br>'+esc(d.notes.slice(0,160)):''}</li>`).join('')}</ul>`:`<p>${esc(why)} I couldn't find matching entries in the tracker either. Try a song or era name.</p>`;
  hist.push({role:'assistant',content:why,html:body});
}
async function send(text){
  text=String(text||'').trim();if(!text||sending)return;
  if(!(await authed())){gate();return}
  $('aiIn').value='';$('aiIn').style.height='';
  hist.push({role:'user',content:text});sending=true;paint();
  await load();
  const prev=[...hist].reverse().find((m,i)=>m.role==='user'&&i>0);
  const q=text.split(/\s+/).length<5&&prev?prev.content+' '+text:text;
  const hits=search(q,24),tws=search(q,8,true);
  const ctx=hits.map(fmtDoc).join('\n')+(tws.length?'\n'+tws.map(fmtDoc).join('\n'):'');
  try{
    const {data:{session}}=await sb.auth.getSession();
    const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),50000);
    const r=await fetch(CFG.url+'/functions/v1/ye-ai',{method:'POST',signal:ctl.signal,headers:{'Content-Type':'application/json',apikey:CFG.anonKey,Authorization:'Bearer '+session.access_token},body:JSON.stringify({messages:hist.slice(-9).map(m=>({role:m.role,content:m.content})),context:ctx})});
    clearTimeout(to);
    const j=await r.json().catch(()=>({}));
    if(r.ok&&j.reply){hist.push({role:'assistant',content:j.reply,src:hits.slice(0,6).map(d=>d.name.slice(0,90)).concat(tws.slice(0,4).map(d=>'Tweet ('+d.era+'): '+d.name.replace(/\s+/g,' ').slice(0,70)))});}
    else if(j.error==='limit')hist.push({role:'assistant',content:`You've hit today's limit of ${j.limit||40} questions. It resets tomorrow (UTC). The Ye Tracker tab is always open in the meantime.`});
    else if(j.error==='signin'){gate()}
    else fallback(q,j.error==='no_key'?'Ye AI isn\'t switched on yet.':j.error==='busy'?'Ye AI is busy right now.':'Ye AI couldn\'t answer just now.');
  }catch(e){fallback(q,e&&e.name==='AbortError'?'Ye AI took too long to answer.':'Couldn\'t reach Ye AI.')}
  sending=false;paint();
  try{localStorage.setItem('yeai:v1',JSON.stringify(hist.slice(-20).map(m=>({role:m.role,content:m.content,src:m.src}))))}catch(e){}
}
function build(){
  if(built)return;built=true;
  try{const h=JSON.parse(localStorage.getItem('yeai:v1')||'[]');if(Array.isArray(h))hist=h.filter(m=>m&&(m.role==='user'||m.role==='assistant')&&typeof m.content==='string')}catch(e){}
  $('aiForm').onsubmit=e=>{e.preventDefault();send($('aiIn').value)};
  $('aiIn').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();send($('aiIn').value)}});
  $('aiIn').addEventListener('input',e=>{const t=e.target;t.style.height='auto';t.style.height=Math.min(140,t.scrollHeight)+'px'});
  $('aiLog').addEventListener('click',e=>{const b=e.target.closest('[data-q]');if(b)send(b.dataset.q)});
  $('aiClear').onclick=()=>{hist=[];try{localStorage.removeItem('yeai:v1')}catch(e){}paint()};
  $('aiSignIn').onclick=()=>{const b=$('acctBtn');if(b)b.click()};
  if(sb)sb.auth.onAuthStateChange(()=>{if(!$('pg-ai').hidden)gate()});
}
window.PH=window.PH||{};
PH.ai={show(){build();$('aiScreen').classList.add('activeScreen');gate();load().then(()=>{if(!hist.length&&!$('aiChat').hidden)paint()})},hide(){$('aiScreen').classList.remove('activeScreen')}};
})();
