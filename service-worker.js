self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("cubaby-")).map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      client.postMessage({ type: "CUBABY_CACHE_CLEARED" });
    }
  })());
});

self.addEventListener("fetch", () => {
  // No interceptamos peticiones. El navegador obtiene siempre la versión real del servidor.
});
