const CACHE = "tapgame-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/splash/apple-splash-1320x2868.png",
  "/splash/apple-splash-1206x2622.png",
  "/splash/apple-splash-1290x2796.png",
  "/splash/apple-splash-1179x2556.png",
  "/splash/apple-splash-1284x2778.png",
  "/splash/apple-splash-1170x2532.png",
  "/splash/apple-splash-1125x2436.png",
  "/splash/apple-splash-1242x2688.png",
  "/splash/apple-splash-828x1792.png",
  "/splash/apple-splash-1242x2208.png",
  "/splash/apple-splash-750x1334.png",
  "/splash/apple-splash-640x1136.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
