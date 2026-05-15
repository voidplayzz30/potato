const CACHE_NAME = "potato-v6";
const urlsToCache = [
    "./", "./index.html", "./style.css", "./script.js",
    "./manifest.json", "./bg.jpg", "./icon.png"
];
self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache).catch(err => console.log("Cache failed:", err))));
    self.skipWaiting();
});
self.addEventListener("fetch", event => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
self.addEventListener("activate", event => {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))));
    self.clients.claim();
});
