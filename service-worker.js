const CACHE_NAME = 'minha-agenda-pro-v4';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.svg',
  './icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
      return response;
    }).catch(() => caches.match('./index.html')))
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