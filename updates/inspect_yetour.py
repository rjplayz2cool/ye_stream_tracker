import json,re,os,urllib.request
os.makedirs('recovery-index/yetour',exist_ok=True)
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=30).read()
html=get('https://yetour.xyz/').decode('utf-8','ignore')
open('recovery-index/yetour/index.html','w',encoding='utf-8').write(html)
urls=set(re.findall(r'(?:src|href)="((?:https://yetour\.xyz)?/?(?:js|css|data)/[^"]+)"',html))
rep={'fetched':[],'errors':[]}
for u in sorted(urls):
    full=u if u.startswith('http') else 'https://yetour.xyz/'+u.lstrip('/')
    try:
        t=get(full).decode('utf-8','ignore');n=re.sub(r'[^A-Za-z0-9._-]','_',full.split('yetour.xyz/')[1])
        open('recovery-index/yetour/'+n,'w',encoding='utf-8').write(t);rep['fetched'].append([full,len(t)])
        # follow data references
        for m in re.findall(r'["\'`]((?:/|\.\./)?[\w/.-]+\.(?:json|js))(?:\?[^"\'`]*)?["\'`]',t):
            pass
    except Exception as e:rep['errors'].append([full,str(e)[:100]])
json.dump(rep,open('recovery-index/yetour/report.json','w'),indent=1)
