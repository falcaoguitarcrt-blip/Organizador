const CACHE_NAME = 'minha-agenda-pro-v6';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.svg',
  './icon-512.svg'
];

/*
 * Sincronização de calendário:
 * a aplicação mantém a fonte de dados intacta e, somente na renderização,
 * amplia pastas/subpastas de qualquer profundidade e normaliza datas para
 * YYYY-MM-DD. Isso faz Semana e Mês enxergarem os mesmos itens das demais
 * visões sem alterar registros no Firestore.
 */
const CALENDAR_SYNC_PATCH = String.raw`
/* CALENDAR-FOLDER-SYNC-V1 */
(function(){
  function calendarSyncDateKey(value){
    if (value == null || value === '') return '';
    try {
      if (typeof value === 'object' && typeof value.toDate === 'function') value = value.toDate();
      if (value instanceof Date && !isNaN(value.getTime())) {
        return value.getFullYear() + '-' + String(value.getMonth()+1).padStart(2,'0') + '-' + String(value.getDate()).padStart(2,'0');
      }
    } catch (_) {}
    var s = String(value).trim();
    var iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (iso) return iso[1] + '-' + iso[2] + '-' + iso[3];
    var br = s.match(/^(\d{2})[\/]([\d]{2})[\/]([\d]{4})/);
    if (br) return br[3] + '-' + br[2] + '-' + br[1];
    var parsed = new Date(s);
    if (!isNaN(parsed.getTime())) {
      return parsed.getFullYear() + '-' + String(parsed.getMonth()+1).padStart(2,'0') + '-' + String(parsed.getDate()).padStart(2,'0');
    }
    return '';
  }

  function calendarSyncFolderIds(rootId){
    var ids = new Set([rootId]);
    var queue = [rootId];
    while(queue.length){
      var parent = queue.shift();
      (S.areas || []).forEach(function(area){
        if(area && area.parentId === parent && !ids.has(area.id)){
          ids.add(area.id);
          queue.push(area.id);
        }
      });
    }
    return ids;
  }

  function calendarSyncExpandedList(list){
    var source = Array.isArray(list) ? list.slice() : [];
    if(currentArea === 'all' || !currentArea) return source.map(function(item){
      var date = calendarSyncDateKey(item.date);
      return date && date !== item.date ? Object.assign({}, item, {date:date}) : item;
    });

    var allowed = calendarSyncFolderIds(currentArea);
    var seen = new Set(source.map(function(item){ return item.id; }));
    (S.items || []).forEach(function(item){
      if(!item || !allowed.has(item.area) || seen.has(item.id)) return;
      source.push(item);
      seen.add(item.id);
    });

    return source.map(function(item){
      var date = calendarSyncDateKey(item.date);
      return date && date !== item.date ? Object.assign({}, item, {date:date}) : item;
    });
  }

  var calendarSyncOriginalWeek = renderViewCalendar;
  var calendarSyncOriginalMonth = renderViewMonth;
  renderViewCalendar = function(list, container){
    return calendarSyncOriginalWeek(calendarSyncExpandedList(list), container);
  };
  renderViewMonth = function(list, container){
    return calendarSyncOriginalMonth(calendarSyncExpandedList(list), container);
  };

  console.info('[Minha Agenda] Sincronização Semana/Mês ativa: pastas recursivas + datas normalizadas.');
})();
/* CALENDAR-FOLDER-SYNC-V1-END */
`;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

async function injectCalendarSync(response) {
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  try {
    const html = await response.text();
    if (html.includes('CALENDAR-FOLDER-SYNC-V1')) return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

    const marker = '</script>';
    const pos = html.lastIndexOf(marker);
    if (pos < 0) return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

    const patched = html.slice(0, pos) + '\n' + CALENDAR_SYNC_PATCH + '\n' + html.slice(pos);
    const headers = new Headers(response.headers);
    headers.delete('content-length');
    return new Response(patched, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  } catch (_) {
    return response;
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => injectCalendarSync(response))
        .then(async response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy)).catch(() => {});
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      }))
      .catch(() => caches.match('./index.html'))
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const itemId = event.notification?.data?.itemId || null;

  event.waitUntil(
    self.clients.matchAll({type:'window', includeUncontrolled:true}).then(clients => {
      const message = { type:'AGENDA_NOTIFICATION_CLICK', itemId };

      for (const client of clients) {
        if ('focus' in client) {
          client.postMessage(message);
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow('./index.html').then(client => {
          if (client) client.postMessage(message);
        });
      }
    })
  );
});