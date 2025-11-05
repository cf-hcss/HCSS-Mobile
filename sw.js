
const CACHE_NAME = 'hcss-hub-cache-v9'; // Bumped version to trigger update
const urlsToCache = [
  './',
  './index.html',
  './index.tsx',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // If the request is for the Google GenAI API, always go to the network.
  // This prevents the service worker from caching API requests, which is crucial for dynamic content.
  if (requestUrl.hostname === 'generativelanguage.googleapis.com') {
    event.respondWith(fetch(event.request));
    return;
  }

  // For all other requests, use a cache-first strategy.
  // This makes the app load quickly from the cache.
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});