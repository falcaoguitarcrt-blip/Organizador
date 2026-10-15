const CACHE_NAME='minha-agenda-pro-v13';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.svg','./icon-512.svg'];

const UI_PATCH=String.raw`<style id="ui-production-v7">
/* =========================================================
   FASE 6.2 — DASHBOARD VISUAL FINAL
   Somente apresentação. Nenhuma regra de dados/função é alterada.
   ========================================================= */
:root{
  --ui-bg:#f4f7fb;
  --ui-surface:#ffffff;
  --ui-surface-2:#f8fafc;
  --ui-border:#dbe4ee;
  --ui-text:#102033;
  --ui-muted:#66788c;
  --ui-accent:#18c6c9;
  --ui-accent-strong:#0ea5a8;
  --ui-danger:#ef4444;
  --ui-warning:#f59e0b;
  --ui-success:#10b981;
  --ui-shadow:0 8px 24px rgba(15,23,42,.055);
}
body[data-ui-theme="dark"],body[data-theme="dark"],body.dark{
  --ui-bg:#08121f;
  --ui-surface:#0f1b29;
  --ui-surface-2:#132235;
  --ui-border:#26384d;
  --ui-text:#f4f8fc;
  --ui-muted:#93a6bb;
  --ui-accent:#22d3d6;
  --ui-accent-strong:#14b8a6;
  --ui-shadow:0 12px 30px rgba(0,0,0,.24);
}

html{background:var(--ui-bg)!important;scroll-behavior:smooth}
body{background:var(--ui-bg)!important;color:var(--ui-text)!important}
#main{background:transparent!important;color:var(--ui-text)!important;padding:20px 26px 34px!important}

/* Sidebar: mais leve, menos "caixa" */
#sidebar{width:220px!important;background:var(--ui-surface)!important;border-right:1px solid var(--ui-border)!important;box-shadow:6px 0 22px rgba(15,23,42,.035)!important}
#main{margin-left:220px!important}
.user-profile{padding:14px 12px!important;border-bottom:1px solid var(--ui-border)!important}
.user-name{color:var(--ui-text)!important;font-weight:750!important}
.btn-logout{color:var(--ui-muted)!important}
.nav-group{padding:10px 7px 70px!important}
.nav-section-title{color:var(--ui-muted)!important;font-size:.66rem!important;letter-spacing:.9px!important;margin:14px 7px 7px!important}
.nav-item{min-height:38px!important;border-radius:9px!important;color:var(--ui-muted)!important;font-size:.83rem!important;padding:7px 9px!important;margin-bottom:2px!important;border:1px solid transparent!important}
.nav-item:hover{background:rgba(24,198,201,.055)!important;color:var(--ui-text)!important}
.nav-item.active{background:rgba(24,198,201,.10)!important;color:var(--ui-accent-strong)!important;border-color:rgba(24,198,201,.25)!important;box-shadow:inset 3px 0 0 var(--ui-accent)!important}
.nav-item.sub{padding-left:28px!important;font-size:.79rem!important}
.folder-badge{background:var(--ui-surface-2)!important;color:var(--ui-muted)!important;border:1px solid var(--ui-border)!important}
.chevron-btn,.folder-menu-btn{color:var(--ui-muted)!important}

/* Topo: busca clara + ações realmente alinhadas */
#main>.top-bar{display:grid!important;grid-template-columns:minmax(300px,1fr) auto auto auto!important;align-items:center!important;gap:9px!important;margin:0 0 9px!important;min-height:42px!important}
#main>.top-bar .search-input{width:100%!important;height:42px!important;min-height:42px!important;border-radius:11px!important;background:var(--ui-surface)!important;border:1px solid var(--ui-border)!important;color:var(--ui-text)!important;box-shadow:0 2px 8px rgba(15,23,42,.035)!important;padding:10px 14px!important}
#main>.top-bar .search-input::placeholder{color:var(--ui-muted)!important;opacity:1!important}
#main>.top-bar button,#main>.top-bar .btn{height:42px!important;min-height:42px!important;padding:0 14px!important;border-radius:10px!important;background:var(--ui-surface)!important;color:var(--ui-text)!important;border:1px solid var(--ui-border)!important;box-shadow:none!important;font-weight:700!important}
#main>.top-bar button:hover,#main>.top-bar .btn:hover{border-color:rgba(24,198,201,.4)!important;background:rgba(24,198,201,.045)!important;color:var(--ui-accent-strong)!important}
#main>.top-bar .btn-primary,#main>.top-bar .primary,#main>.top-bar button[class*="primary"]{background:var(--ui-accent)!important;border-color:var(--ui-accent)!important;color:#062629!important;box-shadow:0 7px 16px rgba(24,198,201,.16)!important}

/* Atalhos */
.phase-f-quick-filters,#main .shortcuts,.shortcuts-row,#main .quick-filters{display:flex!important;align-items:center!important;gap:6px!important;flex-wrap:wrap!important;margin:0 0 12px!important}
.phase-f-quick-label{color:var(--ui-muted)!important;font-size:.68rem!important}
.phase-f-chip,#main .shortcuts button,#main .quick-filters button,.shortcut-chip{height:31px!important;min-height:31px!important;padding:0 11px!important;border-radius:999px!important;background:var(--ui-surface)!important;border:1px solid var(--ui-border)!important;color:var(--ui-muted)!important;font-size:.7rem!important;font-weight:650!important;box-shadow:none!important}
.phase-f-chip:hover,#main .shortcuts button:hover,#main .quick-filters button:hover,.shortcut-chip:hover{color:var(--ui-text)!important;border-color:rgba(24,198,201,.35)!important;background:rgba(24,198,201,.045)!important}
.phase-f-chip.active{background:rgba(24,198,201,.10)!important;border-color:rgba(24,198,201,.35)!important;color:var(--ui-accent-strong)!important}

/* Captura rápida */
.quick-capture{min-height:52px!important;margin:0 0 16px!important;padding:6px 7px 6px 13px!important;border-radius:12px!important;background:var(--ui-surface)!important;border:1px solid var(--ui-border)!important;box-shadow:var(--ui-shadow)!important}
.quick-capture input,.quick-capture textarea{height:38px!important;background:transparent!important;border:0!important;color:var(--ui-text)!important;box-shadow:none!important}
.quick-capture input::placeholder{color:var(--ui-muted)!important}
.quick-capture button{height:38px!important;border-radius:9px!important;background:var(--ui-accent)!important;color:#062629!important;border:0!important;font-weight:750!important}

/* Meu Dia: uma única linguagem visual */
.myday-v2{display:flex!important;flex-direction:column!important;gap:14px!important;margin-bottom:18px!important}
.myday-hero-v2{position:relative!important;overflow:hidden!important;min-height:108px!important;padding:19px 20px!important;border:1px solid var(--ui-border)!important;border-radius:17px!important;background:linear-gradient(115deg,rgba(24,198,201,.075),var(--ui-surface) 52%,rgba(99,102,241,.035))!important;box-shadow:var(--ui-shadow)!important;color:var(--ui-text)!important}
.myday-hero-v2:before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--ui-accent)!important}
.myday-eyebrow,.myday-section-kicker{color:var(--ui-accent-strong)!important;font-size:.65rem!important;font-weight:800!important;letter-spacing:1.1px!important;text-transform:uppercase!important}
.myday-title{font-size:1.58rem!important;line-height:1.12!important;font-weight:800!important;letter-spacing:-.035em!important;color:var(--ui-text)!important;margin-top:2px!important}
.myday-subtitle{color:var(--ui-muted)!important;font-size:.78rem!important;margin-top:5px!important}
.myday-header-actions{gap:8px!important}
.myday-primary-action{height:38px!important;min-height:38px!important;border-radius:10px!important;background:var(--ui-accent)!important;color:#062629!important;border:0!important;font-weight:750!important;box-shadow:0 7px 16px rgba(24,198,201,.15)!important}

/* Métricas: o HTML atual possui 2 indicadores + progresso. Não forçar 5 colunas. */
.myday-stats{display:grid!important;grid-template-columns:minmax(190px,.75fr) minmax(190px,.75fr) minmax(320px,1.5fr)!important;gap:0!important;min-height:82px!important;height:82px!important;overflow:hidden!important;background:var(--ui-surface)!important;border:1px solid var(--ui-border)!important;border-radius:14px!important;box-shadow:var(--ui-shadow)!important}
.myday-stat{height:82px!important;min-height:82px!important;padding:14px 15px!important;border:0!important;border-right:1px solid var(--ui-border)!important;border-radius:0!important;background:transparent!important;color:var(--ui-text)!important;box-shadow:none!important}
.myday-stat:hover,.myday-stat.active{background:rgba(24,198,201,.045)!important;border-color:var(--ui-border)!important}
.myday-stat strong{font-size:1.35rem!important;line-height:1!important;color:var(--ui-text)!important}
.myday-stat small{font-size:.65rem!important;letter-spacing:.04em!important;text-transform:uppercase!important;color:var(--ui-muted)!important;margin-top:5px!important}
.myday-stat-icon{width:30px!important;height:30px!important;border-radius:9px!important;background:var(--ui-surface-2)!important;border:1px solid var(--ui-border)!important}
.myday-stat-icon.danger{color:var(--ui-danger)!important}.myday-stat-icon.warning{color:var(--ui-warning)!important}.myday-stat-icon.accent{color:var(--ui-accent)!important}.myday-stat-icon.success{color:var(--ui-success)!important}
.myday-progress{height:82px!important;min-height:82px!important;min-width:0!important;padding:13px 17px!important;border:0!important;border-radius:0!important;background:linear-gradient(90deg,rgba(24,198,201,.035),transparent)!important;color:var(--ui-text)!important;box-shadow:none!important}
.myday-progress-head{color:var(--ui-muted)!important;font-size:.67rem!important;margin-bottom:7px!important}.myday-progress-head strong{color:var(--ui-text)!important;font-size:1.15rem!important}.myday-progress-track{height:6px!important;background:#e8eef4!important}.myday-progress-track span{background:var(--ui-accent)!important}.myday-progress small{color:var(--ui-muted)!important;font-size:.63rem!important}
body[data-ui-theme="dark"] .myday-progress-track,body[data-theme="dark"] .myday-progress-track,body.dark .myday-progress-track{background:#223246!important}

/* Grid principal: foco + agenda */
.myday-grid{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important}
.myday-grid>div{gap:14px!important}
.myday-section,.myday-next-card,.timeline-panel{background:var(--ui-surface)!important;color:var(--ui-text)!important;border:1px solid var(--ui-border)!important;border-radius:15px!important;box-shadow:var(--ui-shadow)!important}
.myday-section{padding:15px!important}.myday-next-card{padding:16px!important}
.myday-section-head{padding-bottom:10px!important;margin-bottom:10px!important;border-bottom:1px solid var(--ui-border)!important}
.myday-section-title{font-size:.9rem!important;color:var(--ui-text)!important;font-weight:800!important}
.myday-section-icon{color:var(--ui-accent-strong)!important;background:rgba(24,198,201,.07)!important;border:1px solid rgba(24,198,201,.2)!important}
.myday-focus-list{gap:6px!important}
.myday-focus-item{min-height:56px!important;padding:9px 10px!important;background:var(--ui-surface-2)!important;border:1px solid var(--ui-border)!important;border-radius:10px!important;color:var(--ui-text)!important}
.myday-focus-item:hover{background:rgba(24,198,201,.045)!important;border-color:rgba(24,198,201,.28)!important;transform:translateY(-1px)!important}
.myday-focus-index{background:rgba(24,198,201,.09)!important;border:1px solid rgba(24,198,201,.18)!important;color:var(--ui-accent-strong)!important}
.myday-focus-copy strong{color:var(--ui-text)!important;font-size:.8rem!important;line-height:1.3!important}.myday-focus-copy small{color:var(--ui-muted)!important;font-size:.66rem!important}
.myday-arrow{color:var(--ui-muted)!important}.myday-focus-item:hover .myday-arrow{color:var(--ui-accent-strong)!important}
.myday-next-card{background:linear-gradient(135deg,rgba(24,198,201,.055),var(--ui-surface) 65%)!important;min-height:128px!important}
.myday-next-title{color:var(--ui-text)!important;font-size:.9rem!important;font-weight:800!important}.myday-next-meta{color:var(--ui-muted)!important;font-size:.68rem!important}.myday-next-card .btn-sm{color:var(--ui-accent-strong)!important;border-color:rgba(24,198,201,.28)!important;background:rgba(24,198,201,.06)!important}

/* Agenda: corrigir contraste que estava praticamente invisível no claro */
.timeline-panel{padding:15px!important;overflow:hidden!important}
.timeline-list{gap:0!important}
.timeline-row{display:grid!important;grid-template-columns:48px 12px minmax(0,1fr)!important;gap:9px!important;min-height:58px!important;padding:10px 3px!important;border-bottom:1px solid var(--ui-border)!important;background:transparent!important;color:var(--ui-text)!important}
.timeline-row:hover{background:rgba(24,198,201,.035)!important}
.timeline-time{color:var(--ui-text)!important;font-size:.68rem!important;font-weight:750!important}
.timeline-dot{background:var(--ui-accent)!important;border-color:var(--ui-surface)!important;box-shadow:0 0 0 4px rgba(24,198,201,.09)!important}
.timeline-copy strong{color:var(--ui-text)!important;font-size:.78rem!important;font-weight:750!important;opacity:1!important}
.timeline-copy small{color:var(--ui-muted)!important;font-size:.64rem!important;opacity:1!important}
.timeline-more{border-top:1px solid var(--ui-border)!important}.timeline-more button{color:var(--ui-accent-strong)!important}

/* Estados e botões */
.btn,.btn-sm,.phase-d-action{transition:transform .16s ease,border-color .16s ease,background .16s ease,box-shadow .16s ease!important}
.btn:focus-visible,.btn-sm:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid var(--ui-accent)!important;outline-offset:2px!important}

/* Demais visões continuam usando a mesma superfície */
.view-selector{background:var(--ui-surface)!important;border:1px solid var(--ui-border)!important;border-radius:10px!important;padding:3px!important}
.view-btn{color:var(--ui-muted)!important;border-radius:8px!important}.view-btn.active{background:rgba(24,198,201,.10)!important;color:var(--ui-accent-strong)!important;border:1px solid rgba(24,198,201,.22)!important}
.card,.task-card,.event-card,.cal-item{background:var(--ui-surface)!important;color:var(--ui-text)!important;border-color:var(--ui-border)!important;box-shadow:0 4px 14px rgba(15,23,42,.045)!important}
.card-title{color:var(--ui-text)!important}.card-meta,.card-desc{color:var(--ui-muted)!important}

/* Remover somente o botão artificial criado pela rodada anterior */
#ui-theme-switch{display:none!important}

/* Tema escuro: mesma geometria, somente superfícies/cores */
body[data-ui-theme="dark"] #main>.top-bar .search-input,body[data-theme="dark"] #main>.top-bar .search-input,body.dark #main>.top-bar .search-input,
body[data-ui-theme="dark"] .quick-capture,body[data-theme="dark"] .quick-capture,body.dark .quick-capture,
body[data-ui-theme="dark"] .myday-section,body[data-theme="dark"] .myday-section,body.dark .myday-section,
body[data-ui-theme="dark"] .myday-next-card,body[data-theme="dark"] .myday-next-card,body.dark .myday-next-card,
body[data-ui-theme="dark"] .timeline-panel,body[data-theme="dark"] .timeline-panel,body.dark .timeline-panel{background:var(--ui-surface)!important;color:var(--ui-text)!important}
body[data-ui-theme="dark"] .myday-focus-item,body[data-theme="dark"] .myday-focus-item,body.dark .myday-focus-item{background:var(--ui-surface-2)!important}
body[data-ui-theme="dark"] .myday-progress-track,body[data-theme="dark"] .myday-progress-track,body.dark .myday-progress-track{background:#24364a!important}

/* Responsivo */
@media(max-width:1100px){
  #main>.top-bar{grid-template-columns:minmax(240px,1fr) auto auto!important}
  #main>.top-bar>.btn:last-child{grid-column:auto}
  .myday-stats{grid-template-columns:minmax(170px,.8fr) minmax(170px,.8fr) minmax(260px,1.3fr)!important}
}
@media(max-width:900px){
  #main{padding:16px!important}
  #sidebar{width:220px!important}#main{margin-left:220px!important}
  .myday-grid{grid-template-columns:1fr!important}
}
@media(max-width:768px){
  #main{margin-left:0!important;padding:12px!important}
  #sidebar{width:min(88vw,300px)!important}
  #main>.top-bar{display:flex!important;flex-wrap:wrap!important}
  #main>.top-bar .search-input{flex:1 1 100%!important}
  .myday-hero-v2{min-height:0!important;padding:16px!important;align-items:flex-start!important;flex-direction:column!important}
  .myday-header-actions{width:100%!important}.myday-primary-action{width:100%!important}
  .myday-stats{display:flex!important;height:auto!important;overflow-x:auto!important;scroll-snap-type:x proximity!important;border-radius:13px!important}
  .myday-stat,.myday-progress{min-width:190px!important;height:80px!important;min-height:80px!important;scroll-snap-align:start!important}
  .myday-grid{grid-template-columns:1fr!important}
}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}*,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}
</style>`;

/* Mantém a vinculação Semana/Mês com as mesmas tarefas/áreas, sem tocar nos dados. */
const CALENDAR_JS=String.raw`<script>(function(){function key(v){if(v==null||v==='')return '';try{if(typeof v==='object'&&typeof v.toDate==='function')v=v.toDate();if(v instanceof Date&&!isNaN(v))return v.getFullYear()+'-'+String(v.getMonth()+1).padStart(2,'0')+'-'+String(v.getDate()).padStart(2,'0')}catch(e){}var s=String(v).trim(),m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+'-'+m[2]+'-'+m[3];m=s.match(/^(\d{2})[\/](\d{2})[\/](\d{4})/);if(m)return m[3]+'-'+m[2]+'-'+m[1];var d=new Date(s);return isNaN(d)?'':d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}function ids(root){var r=new Set([root]),q=[root];while(q.length){var p=q.shift();(S.areas||[]).forEach(function(a){if(a&&a.parentId===p&&!r.has(a.id)){r.add(a.id);q.push(a.id)}})}return r}function expand(list){var a=Array.isArray(list)?list.slice():[];if(typeof currentArea!=='undefined'&&currentArea!=='all'&&currentArea){var ok=ids(currentArea),seen=new Set(a.map(function(x){return x.id}));(S.items||[]).forEach(function(x){if(x&&ok.has(x.area)&&!seen.has(x.id)){a.push(x);seen.add(x.id)}})}return a.map(function(x){var d=key(x.date);return d&&d!==x.date?Object.assign({},x,{date:d}):x})}if(typeof renderViewCalendar==='function'){var w=renderViewCalendar;renderViewCalendar=function(l,c){return w(expand(l),c)}}if(typeof renderViewMonth==='function'){var m=renderViewMonth;renderViewMonth=function(l,c){return m(expand(l),c)}}})();</script>`;

self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));

async function patchResponse(response){
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;
  try{
    const html=await response.text();
    const head=html.lastIndexOf('</head>');
    if(head<0) return response;
    let out=html.slice(0,head)+UI_PATCH+'\n'+html.slice(head);
    const body=out.lastIndexOf('</body>');
    if(body>=0) out=out.slice(0,body)+CALENDAR_JS+'\n'+out.slice(body);
    const headers=new Headers(response.headers);headers.delete('content-length');
    return new Response(out,{status:response.status,statusText:response.statusText,headers});
  }catch(e){return response}
}

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin!==self.location.origin) return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(patchResponse).then(async r=>{caches.open(CACHE_NAME).then(c=>c.put('./index.html',r.clone())).catch(()=>{});return r}).catch(()=>caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone())).catch(()=>{});return r})).catch(()=>caches.match('./index.html')));
});

self.addEventListener('notificationclick',e=>{e.notification.close();const id=e.notification?.data?.itemId||null;e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const msg={type:'AGENDA_NOTIFICATION_CLICK',itemId:id};for(const c of cs){if('focus'in c){c.postMessage(msg);return c.focus()}}return self.clients.openWindow?self.clients.openWindow('./index.html').then(c=>c&&c.postMessage(msg)):null}))});