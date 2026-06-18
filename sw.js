const CACHE_NAME = 'jastip-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './desa-data.js',
  './logo.png',
  './admin-profile.png',
  './food-sate.png',
  './food-martabak.png',
  './food-geprek.png',
  './gallery-jastip.png',
  './gallery-antar.png',
  './gallery-ojeg.png',
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
