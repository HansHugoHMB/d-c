const CACHE_NAME = 'v1'; // Incrémentez la version pour forcer la mise à jour du cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest1.json',
  '/offline.html',
  '/print.html',
  '/shortcut.html'
  // Ajoutez ici tous les autres assets importants (images, polices, etc.)
];

// Installation du Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert et assets mis en cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Ancien cache supprimé:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interception des requêtes et réponse depuis le cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la requête est dans le cache, on la retourne
        if (response) {
          return response;
        }

        // Sinon, on fait une requête au réseau
        return fetch(event.request).catch(() => {
          // Si la requête réseau échoue, on affiche la page hors ligne
          return caches.open(CACHE_NAME)
            .then(cache => {
              return cache.match('/offline.html');
            });
        });
      })
  );
});