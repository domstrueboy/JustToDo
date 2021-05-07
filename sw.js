// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sw-cache').then((cache) => cache.addAll([
      '/JustToDo/',
      '/JustToDo/css/style.css',
      '/JustToDo/js/main.js',
      '/JustToDo/index.html',
    ])),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});
