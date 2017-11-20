self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('14')
			.then((cache) => {
				console.log('cache open');
				return cache.addAll([
					'menu',
					'menu/application.css',
					'menu/application.js',
					'menu/index.html',
					'login',
					'login/application.css',
					'login/application.js',
					'login/index.html',
					'signup',
					'signup/application.css',
					'signup/application.js',
					'signup/index.html',
					'update',
					'update/application.css',
					'update/application.js',
					'update/index.html',
					'game',
					'game/application.css',
					'game/application.js',
					'game/index.html',
					'lobby',
					'lobby/application.css',
					'lobby/application.js',
					'lobby/index.html',
					'rules',
					'rules/application.css',
					'rules/application.js',
					'rules/index.html',
					'scoreboard',
					'scoreboard/application.css',
					'scoreboard/application.js',
					'scoreboard/index.html',
					'waiting-hall',
					'waiting-hall/application.css',
					'waiting-hall/application.js',
					'waiting-hall/index.html',
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
				debugger;
				if (cachedResponse) {
					return cachedResponse;
				}
				return fetch(event.request)
					.then((response) => {
						return response;
					})
			})
			.catch((error) => {
				debugger;
				console.log(error);
			})
	)
});

