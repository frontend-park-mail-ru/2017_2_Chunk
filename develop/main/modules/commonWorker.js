'use strict';
import eventBus from './eventBus';
import gameCodes from '../messageCodes/gameCodes';
import gamePrepareCodes from '../messageCodes/gamePrepareCodes';


export default class commonWorker {
	constructor(workerUrl) {
		if (window.Worker) {
			this.bus = eventBus;
			this.worker = new Worker(workerUrl);
			console.log('web worker constructor');
			this.gameHandler();
			this.workerCallbacks();
		} else { console.log('no workers'); }
	}


	gameHandler() {
		this.bus.on(`${gameCodes.requestEventName}`, (data) => {
			this.worker.postMessage(data);
		});
	}


	workerCallbacks() {
		this.worker.onmessage = (workerResponse) => { // возвращает не массив ха - ха!
			const data = workerResponse.data;
			console.log(data);
			this.bus.emit(`${gamePrepareCodes.responseEventName}${data.code}`, (data));
		};

		this.bus.on('workerClose', () => {
			this.worker.close();
		});
	}
}
