const CACHE_NAME = "kcm-cache-v1";
const urlsToCache = [
    "index.html",
    "style.css",
    "favicon.jpg",
    "blog.html",
    "gallery.html",
    "merch.html",
    "booking.html",
    "images/hb1.jpg",
    "images/hb2.jpg",
    "images/hb3.jpg",
    "images/ab.jpg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
