console.log('Hey from SW!');

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('sw-cache').then(cache => cache.addAll([
      '/JustToDo/',
      // '/JustToDo/css/style.css',
      // '/JustToDo/js/main.js',
      '/JustToDo/index.html',
    ])),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request)),
  );
});
