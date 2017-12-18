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
					'/music/playlist/American Horror Story - Lana Banana.mp3',
					'/music/playlist/Andrew Strong - Aint No Mountain High Enough.mp3',
					'/music/playlist/Awesome Mix Vol.2 - Cat Stevens - Father And Son.mp3',
					'/music/playlist/Awesome Mix Vol.2 - 1. Electric Light Orchestra - Mr. Blue Sky (2012).mp3',
					'/music/playlist/Awesome Mix Vol.2 - 3. Aliotta Haynes Jeremiah - Lake Shore Drive.mp3',
					'/music/playlist/Awesome Mix Vol.2 - 6. Glen Campbell - Southern Nights.mp3',
					'/music/playlist/Awesome Mix Vol.2 - 7. George Harrison - My Sweet Lord.mp3',
					'/music/playlist/Awesome Mix Vol.2 - 8. Silver - Wham Bam Shang-A-Lang.mp3',
					'/music/playlist/Awesome Mix Vol.2 - 9. Looking Glass - Brandy (You\'re A Fine Girl).mp3',
					'/music/playlist/Awesome Mix Vol.2 - 13. Parliament - Flashlight.mp3',
					'/music/playlist/Awesome Mix Vol.2 - 14. The Sneepers - Guardians Inferno (feat. David Hasselhoff).mp3',
					'/music/playlist/Awesome Mix Vol. 2 - Sam Cooke - Bring It on Home to Me.mp3',
					'/music/playlist/Blondie - Call Me.mp3',
					'/music/playlist/David Bowie - Fame.mp3',
					'/music/playlist/David Bowie - Young Americans.mp3',
					'/music/playlist/Doris Day - Lolly Pop.mp3',
					'/music/playlist/Graham Blvd - The Chain (From _Guardians of the Galaxy 2_).mp3',
					'/music/playlist/Perry Como - The Best Of Times.mp3',
					'/music/playlist/Richard Cheese - Beat It (Michael Jackson).mp3',
					'/music/playlist/Вячеслав Макаров - Hot and Cold.mp3',
					'/music/serviceSounds/button.mp3',
					'/music/serviceSounds/button1.mp3',
					'/music/serviceSounds/ihaveaplan.mp3',
					'/music/serviceSounds/red_button.mp3',
					'/video/dont_push_this_button.mp4',
					'/images/galaxy.jpg',
					'/images/buttons/buttonTape0.jpg',
					'/images/buttons/buttonTape1.jpg',
					'/images/buttons/buttonTape2.jpg',
					'/images/buttons/buttonTape3.jpg',
					'/images/buttons/buttonTape4.jpg',
					'/images/buttons/buttonTape5.jpg',
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