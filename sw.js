console.log('Service Worker : Registered');

const cacheFiles = [
	'index.html',
	'restaurant.html',
	'/css/styles.css',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/img/*'
];

//Installing service worker
self.addEventListener("install", function(e) {
	e.waitUntil(
		caches.open('v1').then(function(cache) { 

			return cache.addAll(cacheFiles);

			
		})

	);

});