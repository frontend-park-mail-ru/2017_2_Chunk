'use strict';
let version = '19';
self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(version)
			.then((cache) => {
				console.log('cache open');
				return cache.addAll([
					// './galaxy2-a81f392a9671ed0258e1899a3986505a.jpg',
					// './galaxy2',
					// 'worker.js',
					'/music/playlist/Billy Preston - Nothing From Nothing.mp3',
					'/music/playlist/Hooked on a Feeling.mp3.mp3',
					'/music/serviceSounds/button.mp3',
					'/music/serviceSounds/button1.mp3',
					'/music/serviceSounds/ihaveaplan.mp3',
					'/music/serviceSounds/red_button.mp3',
					'/video/dont_push_this_button.mp4',
					'/images/galaxy.jpg',
					'menu',
					// 'menu/application.css',
					// 'menu/application.js',
					// 'menu/index.html',
					'login',
					// 'login/application.css',
					// 'login/application.js',
					// 'login/index.html',
					'signup',
					// 'signup/application.css',
					// 'signup/application.js',
					// 'signup/index.html',
					'update',
					// 'update/application.css',
					// 'update/application.js',
					// 'update/index.html',
					'game',
					// 'game/application.css',
					// 'game/application.js',
					// 'game/index.html',
					'lobby',
					// 'lobby/application.css',
					// 'lobby/application.js',
					// 'lobby/index.html',
					'rules',
					// 'rules/application.css',
					// 'rules/application.js',
					// 'rules/index.html',
					'scoreboard',
					// 'scoreboard/application.css',
					// 'scoreboard/application.js',
					// 'scoreboard/index.html',
					'waiting-hall',
					// 'waiting-hall/application.css',
					// 'waiting-hall/application.js',
					// 'waiting-hall/index.html',
					'/css/application.css',
					'application.js',
					'index.html',
				]);
			})
			.catch((err) => {
				console.log('service Worker err: ', err);
			})
	)
});
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request)
			.then((cachedResponse) => {
				return fetch(event.request)
					.then((response) => {
						return caches.open(version)
							.then((cache) => {
								cache.put(event.request, response.clone());
								return response;
							})
					})
					.catch((error) => {
						console.log(error);
						return cachedResponse;
					})
			})
			.catch((error) => {
				console.log(error);
			})
	)
})
;