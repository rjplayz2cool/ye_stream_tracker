"""Prepare requested public audio as temporary artifacts for Drive transfer."""
import concurrent.futures,hashlib,html,json,math,re,subprocess,urllib.parse,urllib.request
from pathlib import Path
OUT=Path('drive-audio');OUT.mkdir(exist_ok=True)
queue=json.loads(Path('data/drive-import-queue.json').read_text())
def request(url):
    parsed=urllib.parse.urlsplit(url)
    if parsed.scheme!='https' or not (parsed.hostname=='imgur.gg' or (parsed.hostname or '').endswith('.imgur.gg')):raise ValueError('Unexpected source host')
    return urllib.request.Request(url,headers={'User-Agent':'YeTrackerAudioImporter/1.0'})
def duration(path):
    data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration:stream=codec_type','-of','json',str(path)],text=True))
    value=float(data.get('format',{}).get('duration',0))
    if not math.isfinite(value) or value<=0 or not any(s.get('codec_type')=='audio' for s in data.get('streams',[])):raise ValueError('No valid audio stream')
    return value
def prepare(item):
    key=item['id'];raw=None
    if not re.fullmatch(r'[A-Za-z0-9_-]+',key) or item['source']!='https://imgur.gg/f/'+key:raise ValueError('Invalid source mapping')
    try:
        with urllib.request.urlopen(request(item['source']),timeout=35) as response:page=response.read(2000000).decode('utf-8')
        urls=re.findall(r'<audio\b[^>]*\bsrc=["\']([^"\']+)',page,re.I)
        if not urls:raise ValueError('No playable audio on source page')
        media=urllib.parse.urljoin(item['source'],html.unescape(urls[0]))
        ext=Path(urllib.parse.unquote(urllib.parse.urlsplit(media).path)).suffix.lower()
        if ext not in {'.mp3','.wav','.flac','.m4a','.ogg','.opus','.aac','.aiff','.aif'}:raise ValueError('Unsupported audio type '+ext)
        raw=OUT/(key+'.original'+ext)
        with urllib.request.urlopen(request(media),timeout=60) as response,raw.open('wb') as target:
            size=0
            while True:
                chunk=response.read(1024*1024)
                if not chunk:break
                size+=len(chunk)
                if size>750000000:raise ValueError('Source exceeds processing limit')
                target.write(chunk)
        length=duration(raw);dest=OUT/(key+'.mp3')
        subprocess.run(['ffmpeg','-v','error','-y','-i',str(raw),'-vn','-ac','2','-ar','44100','-codec:a','libmp3lame','-b:a','192k',str(dest)],check=True,timeout=300)
        if abs(duration(dest)-length)>3:raise ValueError('Duration mismatch')
        record={**item,'status':'ready','fileName':dest.name,'duration':length,'bytes':dest.stat().st_size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}
    except Exception as error:record={**item,'status':'unavailable','error':str(error)}
    finally:
        if raw and raw.is_file():raw.unlink()
    print(json.dumps({'id':key,'status':record['status'],'error':record.get('error')}),flush=True)
    return record
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:records=list(pool.map(prepare,queue))
ready=[r for r in records if r['status']=='ready']
for offset in range(0,len(ready),40):
    group=ready[offset:offset+40];folder=OUT/('batch-%02d'%(offset//40+1));folder.mkdir(exist_ok=True)
    for record in group:(OUT/record['fileName']).replace(folder/record['fileName'])
    (folder/'records.json').write_text(json.dumps(group,ensure_ascii=False,indent=2))
(OUT/'report.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
print(json.dumps({'requested':len(queue),'ready':len(ready),'unavailable':len(records)-len(ready)}))
