'use strict';
import eventBus from './eventBus';
import gameCodes from '../messageCodes/gameCodes';
import gamePrepareCodes from '../messageCodes/gamePrepareCodes';
import lobbyCodes from '../messageCodes/lobbyCodes';


export default class commonWorker {
	constructor(workerUrl) {
		if (window.Worker) {
			this.listeners = {};
			this.bus = eventBus;
			this.worker = new Worker(workerUrl);
			console.log('web worker constructor');
			this.gameHandler();
			this.workerCallbacks();
		}
		else {
			console.log('no workers');
		}
	}


	gameHandler() {
		this.listeners[`${gameCodes.requestEventName}`] =
			this.bus.on(`${gameCodes.requestEventName}`, (data) => {
				this.worker.postMessage(data);
			});
	}


	workerCallbacks() {
		this.onMessage();
		this.workerClose();
		this.goToMenu();
		this.socketOpen();
	}


	onMessage() {
		this.worker.onmessage = (workerResponse) => {
			this.onMessageCallback(workerResponse)
		};
	}


	workerClose() {
		this.listeners[`worker${lobbyCodes.close}`] =
			this.bus.on(`worker${lobbyCodes.close}`, () => {
				if (this.worker)
					this.close();
			});
	}


	goToMenu() {
		this.listeners[`openMenu`] =
			this.bus.on(`openMenu`, () => {
				if (this.worker)
					this.bus.emit(`worker${lobbyCodes.close}`);
			});
	}


	socketOpen() {
		this.listeners[`${lobbyCodes.responseEventName}${lobbyCodes.open}`] =
			this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.open}`, () => {
				if (this.worker)
					this.close();
			});
	}


	close() {
		console.log('web worker destructor');
		this.worker.terminate();
		this.removeListeners();
		delete this.worker;
		delete this.bus;
	}


	removeListeners() {
		for (let key in this.listeners) {
			this.bus.remove(key, this.listeners[key]);
		}
		delete this.listeners;
	}


	onMessageCallback(workerResponse) {
		const data = workerResponse.data;
		console.log(data);
		this.bus.emit(`${gamePrepareCodes.responseEventName}${data.code}`, (data));
	}
}
