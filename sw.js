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

//fetch service worker
self.addEventListener('fetch', function(e) {

	e.respondWith(

		caches.match(e.request).then(function(response){
			if(response) {
				console.log('Found ', e.request, 'in cache');
				return response;
			}
			else {
				console.log('Could not find ', e.request, 'in cache, Fetching ');
				return fetch(e.request)
				.then(function(response) {
					const cloneResponse = response.clone();
					caches.open('v1').then(function(cache) {
						cache.put(e.request, cloneResponse);

					})

					return response;
				})
				.catch(function(err) {
					console.log(err);
				});
			}//end else

		})

	);

});