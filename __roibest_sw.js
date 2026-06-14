const CACHE_NAME = 'wave999-cache-v1';

// Add the files you want to work offline (or load instantly)
const urlsToCache = [
  './roibest_install.html',
  './manifest.json',
  './logo.png'
];

// 1. Install Event: Caches the main files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// 2. Activate Event: Cleans up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Event: THIS IS REQUIRED BY CHROME TO TRIGGER THE INSTALL POPUP
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached version if found, otherwise fetch from the internet
        return response || fetch(event.request);
      })
  );
});