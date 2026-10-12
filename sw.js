/* OpenWeight service worker.
   Everything is cached on first load, so the app opens with no signal.
   Cached files are served instantly and refreshed in the background, so an
   update shows up the next time you open the app. Bump CACHE to force a
   full re-download of every file. */
const CACHE = "openweight-v2";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "fonts/archivo-latin-400-normal.woff2",
  "fonts/archivo-latin-500-normal.woff2",
  "fonts/archivo-latin-600-normal.woff2",
  "fonts/archivo-latin-700-normal.woff2",
  "fonts/big-shoulders-display-latin-700-normal.woff2"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("openweight-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;
  /* every page load is the one-page app, whatever the URL */
  const key = req.mode === "navigate" ? new URL("index.html", self.registration.scope).href : req;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(key, {ignoreSearch:true});
    const refresh = fetch(key === req ? req : key, {cache:"no-cache"}).then(res => {
      if(res && res.ok && res.type === "basic") cache.put(key, res.clone());
      return res;
    }).catch(() => null);
    if(cached){ e.waitUntil(refresh); return cached; }
    return (await refresh) || Response.error();
  })());
});
