self.addEventListener('install', function (_event: any) {
    // Perform install steps
});


const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './app.js'
];


self.addEventListener('install', function (event) {
    // Perform install steps
    (<any>event).waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');

                return cache.addAll(urlsToCache);
            })
    );
});



self.addEventListener('fetch', function (event) {
    (<any>event).respondWith(
        caches.match((<any>event).request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch((<any>event).request);
            }
            )
    );
});
