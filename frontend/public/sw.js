// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sw-cache').then((cache) => cache.addAll([
      '/JustToDo/',
      '/JustToDo/index.html',
      '/JustToDo/assets/',
      // '/JustToDo/assets/index.*.css',
      // '/JustToDo/assets/index.*.js',
      // '/JustToDo/assets/vendor.*.js',
    ])),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)),
  );
});
