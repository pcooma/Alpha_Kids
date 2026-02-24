// Alpha Kids Math Explorer - Service Worker
// Version 2026.1.2

const CACHE_NAME = 'alpha-kids-v2026.4.0';
const urlsToCache = [
  './',
  './index.html',
  './launch-3yr.html', './english-3yr.html', './sinhala-3yr.html',
  './assets/css/style-3yr.css', './assets/js/game-3yr.js',
  './launch-4yr.html', './english-4yr.html', './sinhala-4yr.html',
  './assets/css/style-4yr.css', './assets/js/game-4yr.js',
  './launch-5yr.html', './english-5yr.html', './sinhala-5yr.html',
  './assets/css/style-5yr.css', './assets/js/game-5yr.js',
  './assets/logo.png',
  './assets/splash.png',
  './assets/wallpaper_space.png',
  './manifest.json',
  './404.html',
  './privacy.html',
  './terms.html',
  './contact.html'
];

// Install Service Worker and cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Alpha Kids: Caching app shell');
        return cache.addAll(urlsToCache.map(url => new Request(url, { cache: 'reload' })))
          .catch(err => {
            console.warn('Alpha Kids: Some resources failed to cache', err);
            // Continue even if some resources fail to cache
            return Promise.resolve();
          });
      })
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Alpha Kids: Removing old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If valid response, clone and cache it
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request).then(response => {
          if (response) {
            return response;
          }
          // Return offline page for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return new Response('Offline - Alpha Kids', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Handle background sync (optional - for future features)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-progress') {
    event.waitUntil(syncProgress());
  }
});

async function syncProgress() {
  // Placeholder for syncing user progress when back online
  console.log('Alpha Kids: Syncing progress...');
}

// Handle push notifications (optional - for future features)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New learning activities available!',
    icon: './assets/logo.png',
    badge: './assets/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('Alpha Kids Math Explorer', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./')
  );
});
