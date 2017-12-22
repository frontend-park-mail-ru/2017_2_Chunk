'use strict';

import eventBus from '../modules/eventBus';
import gameCodes from '../messageCodes/gameCodes';
import gameWorkerMessage from '../messageCodes/gameWorkerMessage';
import InternalWorker from '../modules/internalWorker';


import Draw from './draw';

export default class Game3D {

	constructor(container) {
		this.bus = eventBus;
		this.draw = new Draw(container);
		this.gameWorker = new InternalWorker('./gameWorker.js');

		this.gameEvents();

		this.bus.on(`${gameWorkerMessage.requestEventName}`, (data) => {
			const response = data.func;
			this.bus.emit(`${response}`, data);
		});
	}

	gameEvents() {
		this.startGame();
		this.backFromLobby();
		this.figureClick();
		this.gameStep();
		this.gameEnd();
		this.rotate();
		this.getGameInfo();
		this.timeout();
	}

	getGameInfo() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.getGameInfo.code}`, (response) => {
			const request = response;
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	startGame() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.startGame.code}`, (response) => {
			const request = {
				code: `${gameCodes.getGameInfo.code}`
			};
			this.gameID = response.game.gameID;
			this.bus.emit(`${gameCodes.getGameInfo.request}`, request);
			this.draw.startGame(response);
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, response);
		});
	}

	backFromLobby() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.backFromLobby.code}`, (response) => {
			const request = response;
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	gameStep() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameStep.code}`, (response) => {
			const request = response;
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	timeout() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.timeout.code}`, () => {
			this.draw.timeout();
		});
	}

	gameEnd() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameEnd.code}`, (response) => {
			const request = response;
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	figureClick() {
		this.bus.on('makeStepEnable', (response) => {
			const request = response;
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	rotate() {
		this.bus.on('rotate', (response) => {
			const request = response;
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}
}
