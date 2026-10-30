const CACHE='wheellab-pro-2.1.0';
const ASSETS=[
  './',
  './index.html',
  './styles.css',
  './app-01.js',
  './app-02.js',
  './app-03.js',
  './app-04.js',
  './app-05.js',
  './app-06.js',
  './app-07.js',
  './app-08.js',
  './manifest.webmanifest',
  './icon.svg'
];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok&&new URL(event.request.url).origin===self.location.origin){
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
    }
    return response;
  }).catch(()=>caches.match('./index.html'))));
});
