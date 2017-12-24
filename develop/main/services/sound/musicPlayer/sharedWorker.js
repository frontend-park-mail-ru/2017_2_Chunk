'use strict';

import eventBus from '../../../modules/eventBus';

export default class AudioSharedWorker {
	constructor() {
		this.sharedWorker = new SharedWorker('./audioWorker.js');
		this.callback();
	};

	callback() {
		this.sharedWorker.port.onmessage = (event) => {
			this.sharedWorkerMessageHandler(event);
		};
		if (localStorage.getItem('audioIsPlay'))
			this.sharedWorker.port.postMessage('start');
		eventBus.on('pageActive', () => {
			if (localStorage.getItem('audioIsPLay'));
				this.sharedWorker.port.postMessage('playPageActive');
		});
	}

	sharedWorkerMessageHandler(event) {
		if (event.data === 'setPause') {
			this.sharedWorker.port.postMessage('activeFind');
			eventBus.emit('Mute');
		}
		else if (event.data === 'setPlay')
			eventBus.emit('setPlay');
	}

}