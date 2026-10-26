const CACHE_NAME='minha-agenda-pro-v18-modern-layout';
const APP_SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.svg','./icon-512.svg'];

/* Mantém a vinculação Semana/Mês com as mesmas tarefas/áreas, sem alterar dados. */
const CALENDAR_JS=String.raw`<script>(function(){function key(v){if(v==null||v==='')return '';try{if(typeof v==='object'&&typeof v.toDate==='function')v=v.toDate();if(v instanceof Date&&!isNaN(v))return v.getFullYear()+'-'+String(v.getMonth()+1).padStart(2,'0')+'-'+String(v.getDate()).padStart(2,'0')}catch(e){}var s=String(v).trim(),m=s.match(/^(\d{4})-(\d{2})-(\d{2})/);if(m)return m[1]+'-'+m[2]+'-'+m[3];m=s.match(/^(\d{2})[\/](\d{2})[\/](\d{4})/);if(m)return m[3]+'-'+m[2]+'-'+m[1];var d=new Date(s);return isNaN(d)?'':d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}function ids(root){var r=new Set([root]),q=[root];while(q.length){var p=q.shift();(S.areas||[]).forEach(function(a){if(a&&a.parentId===p&&!r.has(a.id)){r.add(a.id);q.push(a.id)}})}return r}function expand(list){var a=Array.isArray(list)?list.slice():[];if(typeof currentArea!=='undefined'&&currentArea!=='all'&&currentArea){var ok=ids(currentArea),seen=new Set(a.map(function(x){return x.id}));(S.items||[]).forEach(function(x){if(x&&ok.has(x.area)&&!seen.has(x.id)){a.push(x);seen.add(x.id)}})}return a.map(function(x){var d=key(x.date);return d&&d!==x.date?Object.assign({},x,{date:d}):x})}if(typeof renderViewCalendar==='function'){var w=renderViewCalendar;renderViewCalendar=function(l,c){return w(expand(l),c)}}if(typeof renderViewMonth==='function'){var m=renderViewMonth;renderViewMonth=function(l,c){return m(expand(l),c)}}})();</script>`;
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));

async function patchResponse(response){
  const type=response.headers.get('content-type')||'';
  if(!type.includes('text/html')) return response;
  try{
    const html=await response.text();
    const body=html.lastIndexOf('</body>');
    if(body<0) return response;
    // O layout moderno já possui seu CSS no index.html. Não reinjetar o tema V11 legado.
    const out=html;
    const bodyPos=out.lastIndexOf('</body>');
    const patched=out.slice(0,bodyPos)+CALENDAR_JS+'\n'+out.slice(bodyPos);
    const headers=new Headers(response.headers);headers.delete('content-length');
    return new Response(patched,{status:response.status,statusText:response.statusText,headers});
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
