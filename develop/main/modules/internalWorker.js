'use strict';
import eventBus from './eventBus';
import gameWorkerMessage from '../messageCodes/gameWorkerMessage';


export default class internalWorker {
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
		this.bus.on(`${gameWorkerMessage.responseEventName}`, (data) => {
			this.worker.postMessage(data);
		});
	}


	workerCallbacks() {
		this.worker.onmessage = (workerResponse) => { // возвращает не массив ха - ха!
			const data = workerResponse.data;
			console.log(data);
			this.bus.emit(`${gameWorkerMessage.requestEventName}`, (data));
		};

		this.bus.on('workerClose', () => {
			this.worker.close();
		});
	}
}
