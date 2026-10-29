import json,re,sys
from playwright.sync_api import sync_playwright
out={'media':[],'requests':[],'tabs':{},'html_len':0}
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':1400,'height':900})
    seen=set()
    def onreq(r):
        u=r.url
        if u not in seen and ('yetour' in u or u.endswith('.json')):seen.add(u);out['requests'].append(u)
    pg.on('request',onreq)
    pg.goto('https://yetour.xyz/',wait_until='networkidle',timeout=60000);pg.wait_for_timeout(3000)
    out['html_len']=len(pg.content())
    # click every visible tab / button once, record text and images
    labels=pg.eval_on_selector_all('button,a,[role=tab],li','els=>[...new Set(els.map(e=>(e.innerText||'').trim()).filter(t=>t&&t.length<40))]')
    out['labels']=labels
    for lab in labels:
        if re.search(r'merch|live|recording|jakarta|gelora|bung',lab,re.I):
            try:
                pg.get_by_text(lab,exact=True).first.click(timeout=3000);pg.wait_for_timeout(1500)
                out['tabs'][lab]={'text':pg.inner_text('body')[:6000],'imgs':pg.eval_on_selector_all('img','els=>els.map(i=>({src:i.currentSrc||i.src,alt:i.alt}))')}
            except Exception as e:out['tabs'][lab]={'err':str(e)[:150]}
    out['media']=sorted(u for u in out['requests'] if 'media.yetour' in u)
    out['scripts']=pg.eval_on_selector_all('script[src]','els=>els.map(e=>e.src)')
    # grab text of every same-origin script for data
    data={}
    for s in out['scripts']:
        if 'yetour' in s:
            try:
                t=pg.evaluate('u=>fetch(u).then(r=>r.text())',s)
                data[s]=[m for m in set(re.findall(r'https?://[^"\'\s\\)]+',t)) if 'yetour' in m or re.search(r'jakarta|gelora',m,re.I)][:400]
                data[s+'#jakarta']=[t[max(0,m.start()-200):m.end()+400] for m in re.finditer(r'(?i)gelora|jakarta',t)][:12]
            except Exception as e:data[s]=str(e)[:100]
    out['script_data']=data
    b.close()
import os;os.makedirs('recovery-index',exist_ok=True)
json.dump(out,open('recovery-index/yetour-inspection.json','w'),indent=1)
print('done',len(out['media']))
