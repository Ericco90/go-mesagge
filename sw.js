const CACHE_NAME = 'pijat-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './desa-data.js',
  './logo_pijat.png',
  './pijat_terapis.jpg',
  './pijat_tradisional.jpg',
  './terapi_bekam.jpg',
  './qris.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return from cache
        }
        return fetch(event.request); // Fetch from network
      })
  );
});
