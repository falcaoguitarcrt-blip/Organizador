const CACHE_NAME = 'minha-agenda-pro-v8';
const APP_SHELL = ['./','./index.html','./manifest.webmanifest','./icon-192.svg','./icon-512.svg'];

const UI_THEME_PATCH = String.raw`
/* UI-THEME-PATCH-V2 */
(function(){
  const css = String.raw`
    :root{--ui-bg:#f5f8fc;--ui-card:#fff;--ui-card-2:#f8fbff;--ui-border:#dbe5ef;--ui-text:#102033;--ui-muted:#64748b;--ui-accent:#16c7d8;--ui-accent-2:#0891b2;--ui-shadow:0 8px 24px rgba(15,23,42,.07);--ui-sidebar:rgba(255,255,255,.96)}
    body[data-ui-theme="dark"]{--ui-bg:#07111d;--ui-card:#0d1a29;--ui-card-2:#101f31;--ui-border:#203247;--ui-text:#f4f8fc;--ui-muted:#91a4ba;--ui-accent:#22d3ee;--ui-accent-2:#14b8a6;--ui-shadow:0 12px 32px rgba(0,0,0,.24);--ui-sidebar:rgba(7,17,29,.97)}
    body{background:var(--ui-bg)!important;color:var(--ui-text)!important;transition:background-color .2s ease,color .2s ease}
    #sidebar{width:248px!important;background:var(--ui-sidebar)!important;border-right:1px solid var(--ui-border)!important;backdrop-filter:blur(18px);box-shadow:8px 0 28px rgba(15,23,42,.035);overflow:hidden}
    #main{margin-left:248px!important;padding:22px 26px!important}
    .user-profile{padding:15px 14px!important;border-bottom:1px solid var(--ui-border)!important;min-height:68px}
    .user-avatar{width:36px!important;height:36px!important;background:linear-gradient(135deg,var(--ui-accent),#4f46e5)!important;box-shadow:0 0 0 4px rgba(34,211,238,.08)}
    .user-name{color:var(--ui-text)!important;font-weight:750!important}.btn-logout{color:var(--ui-muted)!important}
    .nav-group{padding:12px 9px 70px!important}
    .nav-section-title{margin:15px 8px 7px!important;font-size:.67rem!important;letter-spacing:1px!important;text-transform:uppercase!important;color:var(--ui-muted)!important}
    .nav-item{min-height:40px!important;padding:8px 10px!important;margin-bottom:3px!important;border:1px solid transparent!important;border-radius:10px!important;color:var(--ui-muted)!important;font-size:.86rem!important;transition:background .16s ease,border-color .16s ease,color .16s ease,transform .16s ease!important}
    .nav-item:hover{background:rgba(34,211,238,.055)!important;color:var(--ui-text)!important;transform:translateX(1px)}
    .nav-item.active{background:linear-gradient(90deg,rgba(34,211,238,.16),rgba(34,211,238,.07))!important;color:var(--ui-accent)!important;border-color:rgba(34,211,238,.22)!important;box-shadow:inset 3px 0 0 var(--ui-accent)}
    .nav-item.sub{padding-left:30px!important;font-size:.82rem!important}
    .folder-badge{background:rgba(148,163,184,.11)!important;color:var(--ui-muted)!important;border:1px solid var(--ui-border)!important;min-width:20px;text-align:center}
    .chevron-btn,.folder-menu-btn{color:var(--ui-muted)!important;border-radius:7px!important}
    .folder-menu-btn:hover,.chevron-btn:hover{background:rgba(34,211,238,.08)!important;color:var(--ui-text)!important}
    #main .top-bar{gap:10px!important;margin-bottom:12px!important}
    .search-input{background:var(--ui-card)!important;border-color:var(--ui-border)!important;color:var(--ui-text)!important;border-radius:12px!important;box-shadow:0 2px 8px rgba(15,23,42,.035)}
    .quick-capture{margin-bottom:18px!important}.quick-capture input,.quick-preview-field{background:var(--ui-card)!important;border-color:var(--ui-border)!important;color:var(--ui-text)!important}
    button,.btn,.view-btn{border-radius:10px!important;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease,background .16s ease!important}
    button:hover,.btn:hover,.view-btn:hover{transform:translateY(-1px)}
    .btn-primary,.primary,.quick-capture button{box-shadow:0 7px 18px rgba(22,199,216,.18)!important}
    .dropdown{background:var(--ui-card)!important;border-color:var(--ui-border)!important;box-shadow:0 16px 36px rgba(0,0,0,.22)!important}.dropdown-item{color:var(--ui-text)!important}.dropdown-item:hover{background:rgba(34,211,238,.07)!important}
    .myday-hero-v2{border-color:var(--ui-border)!important;background:linear-gradient(135deg,rgba(34,211,238,.10),rgba(255,255,255,.035) 58%,rgba(99,102,241,.07))!important;box-shadow:var(--ui-shadow)!important}
    .myday-section,.myday-next-card,.myday-stat,.phase-h-metric,.metric-card,.stat-card,.week-stat-card{background:var(--ui-card)!important;border-color:var(--ui-border)!important;box-shadow:var(--ui-shadow)!important}
    .myday-stat:hover,.myday-stat.active{border-color:var(--ui-accent)!important;background:rgba(34,211,238,.07)!important}
    .myday-progress,.myday-focus-item{border-color:var(--ui-border)!important;background:var(--ui-card-2)!important}
    .phase-h-folder-header,.folder-header,.folder-panel{border-color:var(--ui-border)!important;background:linear-gradient(135deg,rgba(34,211,238,.07),rgba(255,255,255,.015))!important;box-shadow:var(--ui-shadow)!important}
    .view-tabs,.views-bar,.toolbar,.week-toolbar,.calendar-nav{border-color:var(--ui-border)!important;background:var(--ui-card)!important}.view-btn.active,.tab.active{background:rgba(34,211,238,.13)!important;color:var(--ui-accent)!important;border-color:rgba(34,211,238,.3)!important}
    .week-day,.day-column,.month-cell,.kanban-col,.card,.task-card,.list-row{background:var(--ui-card)!important;border-color:var(--ui-border)!important}.week-day.today,.day-column.today,.month-cell.today{background:rgba(34,211,238,.065)!important;border-color:var(--ui-accent)!important}
    .cal-item,.event-card,.task-card{box-shadow:0 4px 14px rgba(15,23,42,.07)!important;border-radius:9px!important}body[data-ui-theme="dark"] .cal-item,body[data-ui-theme="dark"] .event-card,body[data-ui-theme="dark"] .task-card{box-shadow:0 5px 18px rgba(0,0,0,.22)!important}
    #ui-theme-switch{position:fixed;left:9px;bottom:10px;width:230px;height:40px;z-index:250;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 6px 4px 11px;border:1px solid var(--ui-border);border-radius:11px;background:var(--ui-card);color:var(--ui-text);box-shadow:var(--ui-shadow);cursor:pointer;font-size:.76rem;font-weight:700}
    #ui-theme-switch .ui-theme-label{display:flex;align-items:center;gap:8px;min-width:0}#ui-theme-switch .ui-theme-icon{font-size:1rem}#ui-theme-switch .ui-theme-track{width:54px;height:28px;border-radius:99px;background:rgba(148,163,184,.18);border:1px solid var(--ui-border);display:flex;align-items:center;padding:2px;position:relative;flex-shrink:0}#ui-theme-switch .ui-theme-thumb{width:22px;height:22px;border-radius:50%;display:grid;place-items:center;background:var(--ui-accent);color:#04202a;transition:transform .18s ease;box-shadow:0 3px 8px rgba(0,0,0,.16)}body[data-ui-theme="dark"] #ui-theme-switch .ui-theme-thumb{transform:translateX(24px)}
    button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{outline:2px solid var(--ui-accent)!important;outline-offset:2px}
    @media(max-width:768px){#sidebar{width:248px!important}#main{margin-left:0!important;padding:14px!important}#ui-theme-switch{left:10px;width:226px}.nav-group{padding-bottom:62px!important}}
    @media(prefers-reduced-motion:reduce){*,*::before,*::after{transition-duration:.01ms!important;animation-duration:.01ms!important}}
  `;
  const style=document.createElement('style');style.id='ui-theme-patch-v2';style.textContent=css;document.head.appendChild(style);
  function applyTheme(theme){const value=theme==='dark'?'dark':'light';document.body.dataset.uiTheme=value;localStorage.setItem('minha-agenda-theme',value);const btn=document.getElementById('ui-theme-switch');if(btn){btn.setAttribute('aria-pressed',value==='dark'?'true':'false');btn.querySelector('.ui-theme-icon').textContent=value==='dark'?'🌙':'☀️';btn.querySelector('.ui-theme-name').textContent=value==='dark'?'Tema escuro':'Tema claro';btn.title=value==='dark'?'Alternar para tema claro':'Alternar para tema escuro'}}
  function mountThemeSwitch(){if(!document.body||document.getElementById('ui-theme-switch'))return;const btn=document.createElement('button');btn.id='ui-theme-switch';btn.type='button';btn.innerHTML='<span class="ui-theme-label"><span class="ui-theme-icon">☀️</span><span class="ui-theme-name">Tema claro</span></span><span class="ui-theme-track"><span class="ui-theme-thumb">●</span></span>';btn.addEventListener('click',function(){applyTheme(document.body.dataset.uiTheme==='dark'?'light':'dark')});document.body.appendChild(btn);applyTheme(localStorage.getItem('minha-agenda-theme')||'light')}
  function init(){applyTheme(localStorage.getItem('minha-agenda-theme')||'light');mountThemeSwitch()};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
/* UI-THEME-PATCH-V2-END */
`;

const CALENDAR_SYNC_PATCH = String.raw`
/* CALENDAR-FOLDER-SYNC-V1 */
(function(){
  function calendarSyncDateKey(value){if(value==null||value==='')return '';try{if(typeof value==='object'&&typeof value.toDate==='function')value=value.toDate();if(value instanceof Date&&!isNaN(value.getTime()))return value.getFullYear()+'-'+String(value.getMonth()+1).padStart(2,'0')+'-'+String(value.getDate()).padStart(2,'0')}catch(_){}var s=String(value).trim(),iso=s.match(/^(\\d{4})-(\\d{2})-(\\d{2})/);if(iso)return iso[1]+'-'+iso[2]+'-'+iso[3];var br=s.match(/^(\\d{2})[\\/](\\d{2})[\\/](\\d{4})/);if(br)return br[3]+'-'+br[2]+'-'+br[1];var parsed=new Date(s);if(!isNaN(parsed.getTime()))return parsed.getFullYear()+'-'+String(parsed.getMonth()+1).padStart(2,'0')+'-'+String(parsed.getDate()).padStart(2,'0');return ''}
  function calendarSyncFolderIds(rootId){var ids=new Set([rootId]),queue=[rootId];while(queue.length){var parent=queue.shift();(S.areas||[]).forEach(function(area){if(area&&area.parentId===parent&&!ids.has(area.id)){ids.add(area.id);queue.push(area.id)}})}return ids}
  function calendarSyncExpandedList(list){var source=Array.isArray(list)?list.slice():[];if(currentArea==='all'||!currentArea)return source.map(function(item){var date=calendarSyncDateKey(item.date);return date&&date!==item.date?Object.assign({},item,{date:date}):item});var allowed=calendarSyncFolderIds(currentArea),seen=new Set(source.map(function(item){return item.id}));(S.items||[]).forEach(function(item){if(!item||!allowed.has(item.area)||seen.has(item.id))return;source.push(item);seen.add(item.id)});return source.map(function(item){var date=calendarSyncDateKey(item.date);return date&&date!==item.date?Object.assign({},item,{date:date}):item})}
  var calendarSyncOriginalWeek=renderViewCalendar,calendarSyncOriginalMonth=renderViewMonth;renderViewCalendar=function(list,container){return calendarSyncOriginalWeek(calendarSyncExpandedList(list),container)};renderViewMonth=function(list,container){return calendarSyncOriginalMonth(calendarSyncExpandedList(list),container)};
})();
/* CALENDAR-FOLDER-SYNC-V1-END */
`;

self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
async function injectPatches(response){const contentType=response.headers.get('content-type')||'';if(!contentType.includes('text/html'))return response;try{const html=await response.text();const marker='</script>';const pos=html.lastIndexOf(marker);if(pos<0)return new Response(html,{status:response.status,statusText:response.statusText,headers:response.headers});const patched=html.slice(0,pos)+'\n'+CALENDAR_SYNC_PATCH+'\n'+UI_THEME_PATCH+'\n'+html.slice(pos);const headers=new Headers(response.headers);headers.delete('content-length');return new Response(patched,{status:response.status,statusText:response.statusText,headers})}catch(_){return response}}
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>injectPatches(response)).then(async response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy)).catch(()=>{});return response}).catch(()=>caches.match('./index.html')));return}event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy)).catch(()=>{});return response})).catch(()=>caches.match('./index.html')))});
self.addEventListener('notificationclick',event=>{event.notification.close();const itemId=event.notification?.data?.itemId||null;event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{const message={type:'AGENDA_NOTIFICATION_CLICK',itemId};for(const client of clients){if('focus'in client){client.postMessage(message);return client.focus()}}if(self.clients.openWindow)return self.clients.openWindow('./index.html').then(client=>{if(client)client.postMessage(message)})}))});