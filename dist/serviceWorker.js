(function(){
	var _cd95 = {};
	_cd95.f = {};
	// cached modules
	_cd95.m = {};
	_cd95.r = function(id) {
		var cached = _cd95.m[id];
		// resolve if in cache
		if (cached) {
			return cached.m.exports;
		}
		var file = _cd95.f[id];
		if (!file) return;
		cached = _cd95.m[id] = {};
		cached.exports = {};
		cached.m = { exports: cached.exports };
		file.call(cached.exports, cached.m, cached.exports);
		return cached.m.exports;
	};
// default/worker.js
_cd95.f[0] =
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
_cd95.r(0)
})();

