/* The OT Atlas — service worker (offline-capable, cache-first).
 *
 * ┌───────────────────────────────────────────────────────────────────────────┐
 * │  RULE: bump CACHE (e.g. v1 → v2) in ANY session that edits an asset listed  │
 * │  in CORE (or any css/js/data file). Cache-first means users keep the OLD    │
 * │  cached copy until the version string changes and this SW re-installs.      │
 * └───────────────────────────────────────────────────────────────────────────┘
 */
const CACHE = "ot-atlas-v29";

const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./assets/icon.svg",
  "./assets/apple-touch-icon.png",
  "./assets/css/styles.css",
  "./assets/js/app.js",
  "./assets/js/data/foundations.js",
  "./assets/js/data/models.js",
  "./assets/js/data/reasoning.js",
  "./assets/js/data/conditions.js",
  "./assets/js/data/assessments.js",
  "./assets/js/data/evidence.js",
  "./assets/js/data/videos.js",
  "./assets/js/data/resources.js",
  "./assets/js/data/directory.js",
  "./assets/js/data/bulletin.js",
  "./assets/js/data/interventions.js",
  "./assets/js/data/rigor.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  // Let cross-origin requests (Google Fonts, YouTube thumbnails) go straight to the network.
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // runtime-cache successful same-origin responses
          if (res && res.status === 200 && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => (req.mode === "navigate" ? caches.match("./index.html") : undefined));
    })
  );
});
