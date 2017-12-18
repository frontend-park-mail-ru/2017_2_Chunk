'use strict';

import eventBus from '../../modules/eventBus';

new class startJS {
	constructor() {
		eventBus.on('JSReady', () => {
			this.waitAndOpenMenu();
		})
	}


	waitAndOpenMenu() {
		setTimeout(() => {
			this.removeStartCssLoader();
			eventBus.emit('showApp');
		}, 200);
	}


	removeStartCssLoader() {
		const startLoader = document.body.getElementsByClassName('startLoader')[0];
		document.body.removeChild(startLoader);
	};
};