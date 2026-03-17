const CACHE_NAME = 'find-pom-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/level1.png',
  './images/level2.png',
  './images/level3.png',
  './images/level4.png',
  './images/level5.png',
  './images/level6.png',
  './images/level7.png',
  './images/level8.png',
  './images/level9.png',
  './images/level10.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
