
const CACHE_NAME = 'hcss-hub-cache-v7';
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

  // Use a network-first strategy for alerts.json.
  // This ensures the data is always fresh if the user is online.
  if (requestUrl.pathname.endsWith('/alerts.json')) {
    event.respondWith(
      fetch(event.request).then(networkResponse => {
        // If the fetch is successful, update the cache with the new version.
        return caches.open(CACHE_NAME).then(cache => {
          if (networkResponse.ok) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        // If the fetch fails (e.g., user is offline), try to serve from the cache.
        return caches.match(event.request);
      })
    );
    return;
  }

  // Use a cache-first strategy for all other (app shell) requests.
  // This makes the app load quickly.
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