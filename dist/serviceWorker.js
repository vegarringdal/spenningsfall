(function(){
	var _5512 = {};
	_5512.f = {};
	// cached modules
	_5512.m = {};
	_5512.r = function(id) {
		var cached = _5512.m[id];
		// resolve if in cache
		if (cached) {
			return cached.m.exports;
		}
		var file = _5512.f[id];
		if (!file) return;
		cached = _5512.m[id] = {};
		cached.exports = {};
		cached.m = { exports: cached.exports };
		file.call(cached.exports, cached.m, cached.exports);
		return cached.m.exports;
	};
// default/worker.js
_5512.f[0] =
function(){
self.addEventListener('install', function (_event) {
});
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './app.js'
];
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
    }));
});
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});
}
_5512.r(0)
})();

