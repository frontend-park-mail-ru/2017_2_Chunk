'use strict';
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open('v1')
			.then((cache) => {
				console.log('cache open');
				return cache.addAll([
					'',
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
			.then(() => {
			console.log('fetch');
			return fetch(event.request);
		})
	);
});
