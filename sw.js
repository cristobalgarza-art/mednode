// MEDNODE service worker: mínimo. Solo cachea el icono y sirve la app SIEMPRE desde la red
// (para que las correcciones lleguen al instante). Si no hay red, muestra un aviso simple.
const VERSION = "v1";
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(fetch(req).catch(() => {
    if (req.mode === "navigate") {
      return new Response("<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><body style='font-family:sans-serif;background:#5b50c7;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;padding:24px'><div><h2>MEDNODE</h2><p>Sin conexión a internet.<br>Conéctate y vuelve a abrir la app.</p><p><a href='/' style='color:#fff'>Reintentar</a></p></div></body>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
    }
    return Response.error();
  }));
});
