/* Minha Agenda Pro service worker
   Deliberadamente sem cache de HTML/JS para não servir versões antigas da agenda. */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
