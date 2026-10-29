import json,re,os,urllib.request
os.makedirs('recovery-index/yetour',exist_ok=True)
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0','Accept':'application/json,*/*','Referer':'https://yetour.xyz/'}),timeout=30).read()
rep={}
for n,u in [('catalog2026','https://yetour.xyz/api/catalog/2026'),('eras','https://yetour.xyz/api/eras'),('catalog2025','https://yetour.xyz/api/catalog/2025')]:
    try:
        t=get(u);open('recovery-index/yetour/'+n+'.json','wb').write(t);rep[n]=len(t)
    except Exception as e:rep[n]=str(e)[:150]
json.dump(rep,open('recovery-index/yetour/api-report.json','w'),indent=1)
