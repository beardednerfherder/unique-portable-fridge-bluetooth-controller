// Unique Chill PWA — Service Worker
// Caches everything on first install so the app works 100% offline.

const CACHE_NAME = "unique-chill-v1";

// All files that make up the app shell
const PRECACHE_URLS = [
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

// Install: cache all app shell files immediately
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => {
      // Force this SW to become active immediately
      return self.skipWaiting();
    })
  );
});

// Activate: delete any old caches from previous versions
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: serve from cache first, fall back to network
// Since this is a BLE app with no external dependencies,
// everything it needs is in the cache after first load.
self.addEventListener("fetch", event => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Not in cache — try network and cache the result
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, toCache);
        });
        return response;
      }).catch(() => {
        // Offline and not cached — return the main app page as fallback
        return caches.match("./index.html");
      });
    })
  );
});
