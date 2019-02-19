(function(){
	var _258b = {};
	_258b.f = {};
	// cached modules
	_258b.m = {};
	_258b.r = function(id) {
		var cached = _258b.m[id];
		// resolve if in cache
		if (cached) {
			return cached.m.exports;
		}
		var file = _258b.f[id];
		if (!file) return;
		cached = _258b.m[id] = {};
		cached.exports = {};
		cached.m = { exports: cached.exports };
		file.call(cached.exports, cached.m, cached.exports);
		return cached.m.exports;
	};
// default/worker.js
_258b.f[0] =
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
_258b.r(0)
})();

