"""Shared metadata/covers for account cards and separated account controls."""
from pathlib import Path
import re
p=Path('index.html');s=p.read_text();marker='<!-- account-card-layout-v1 -->'
if marker not in s:
 assert '<body><div id="moneyPill"' in s
 s=s.replace('<body><div id="moneyPill"','<body><div class="siteControls">'+marker+'<div class="walletControls"><div id="moneyPill"',1)
 s=s.replace('</button><button id="accountBtn"','</button></div><button id="accountBtn"',1)
 s=s.replace('<main id="yeTrackerScreen"','</div><main id="yeTrackerScreen"',1)
 s=s.replace('</head>','<link rel="stylesheet" href="cards/layout.css?v=1"></head>',1)
 s=s.replace('<script src="data/metadata.js"></script>','')
 s=s.replace('<script src="data/history.js"></script>','<script src="data/history.js"></script><script src="data/card-metadata.js"></script>',1)
 # These declarations are single-line functions in the original site.
 helpers=Path('cards/helpers.js').read_text()
 for name in ['specialRollByRecord','serverCoverSrc','serverItemInfo','canonicalServerRecord']:
  assert re.search(r'^function '+name+r'\(.*$',s,re.M),name
  s=re.sub(r'^function '+name+r'\(.*$',lambda _: '// '+name+' is supplied by the shared card resolver',s,count=1,flags=re.M)
 s=s.replace('function fallbackCoverForRecord(r)',helpers+'\nfunction fallbackCoverForRecord(r)',1)
 s=s.replace('function slotCandidateRecord(x){',"function slotCandidateRecord(x){if(x?.title&&x?.rarity&&!x.name)return canonicalServerRecord(x);",1)
 s=s.replace('function rollCardHTML(r,history=false){let coverHtml=', 'function rollCardHTML(r,history=false){r=canonicalServerRecord(r);let coverHtml=',1)
 s=s.replace("let md=META[x.spotify]||{}", "let md={...(META[x.spotify]||{}),...(window.CARD_METADATA?.[(x.spotify||'').split('/').pop()]||{})}")
 p.write_text(s)
 print('Installed shared card metadata and account layout')
else:print('Shared card metadata and layout already installed')
