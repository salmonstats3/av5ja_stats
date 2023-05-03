import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

declare let self: ServiceWorkerGlobalScope
cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

self.skipWaiting()
clientsClaim()

// Skip SW
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
// self.addEventListener('fetch', (event) => {
// });

// Activate the SW
self.addEventListener('activate', (event) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const casheWhitelist: any[] = [];
  casheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((casheNames) =>
      Promise.all(
        casheNames.map((casheName) => {
          if (!casheWhitelist.includes(casheName)) {
            return caches.delete(casheName);
          }
        })
      )
    )
  );
});
