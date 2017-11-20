self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('12')
			.then((cache) => {
				console.log('cache open');
				return cache.addAll([
					'menu/application.css',
					'menu/application.js',
					'menu/index.html',
					// '/login/application.css',
					// '/login/application.js',
					// '/login/index.html',
					// '/signup/application.css',
					// '/signup/application.js',
					// '/signup/index.html',
					// '/update/application.css',
					// '/update/application.js',
					// '/update/index.html',
					// '/game/application.css',
					// '/game/application.js',
					// '/game/index.html',
					// '/lobby/application.css',
					// '/lobby/application.js',
					// '/lobby/index.html',
					// '/rules/application.css',
					// '/rules/application.js',
					// '/rules/index.html',
					// '/scoreboard/application.css',
					// '/scoreboard/application.js',
					// '/scoreboard/index.html',
					// '/waiting-hall/application.css',
					// '/waiting-hall/application.js',
					// '/waiting-hall/index.html',
					// '/exit/application.css',
					// '/exit/application.js',
					// '/exit/index.html',
					'application.css',
					'application.js',
					'index.html',
				]);
			})
	)
});
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((cachedResponse) => {
				//debugger;
				if (cachedResponse) {
					return cachedResponse;
				}
				return fetch(event.request);
			})
			.catch((error) => {
				//debugger;
				console.log(error);
			})
	)
});

