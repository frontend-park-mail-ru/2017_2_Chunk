'use strict';

import eventBus from '../modules/eventBus';
import gameCodes from '../messageCodes/gameCodes';
import gameWorkerMessage from '../messageCodes/gameWorkerMessage';
import internalWorker from '../modules/internalWorker';
// import GameWorker from './gameWorker';

import Draw from './draw';

export default class Game3D {

	constructor(container) {
		this.bus = eventBus;
		this.draw = new Draw(container);
		// this.gameWorker = new GameWorker(this.bus);
		this.gameWorker = new internalWorker('./gameWorker.js');
		this.gameEvents();

		this.bus.on(`${gameWorkerMessage.requestEventName}`, (data) => {
			// console.log("BUS ON IN MAIN");
			// console.log(data);
			const response = data.func;
			this.bus.emit(`${response}`, data);
		});
	}

	gameEvents() {
		this.startGame();
		this.figureClick();
		this.gameStep();
		this.gameEnd();
		this.coordinatesForStep();
		this.figureType();
		this.winDetected();
		this.exitGame();
		this.stepEnable();
	}

	getGameInfo() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.getGameInfo.code}`, (response) => {
			// console.log("GET GAME INFO IN MAIN");
			// console.log(response);
			const request = response;
			// this.bus.emit('getUserID', request);
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	startGame() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.startGame.code}`, (response) => {
			// console.log("START GAME IN MAIN");
			// console.log(response);
			const request = {
				code: `${gameCodes.getGameInfo.code}`
			};
			this.gameID = response.game.gameID;
			this.bus.emit(`${gameCodes.getGameInfo.request}`, request);
			this.draw.startGame(response);
			//this.bus.emit('startArray', response);
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, response);
			this.getGameInfo();
		});
	}

	exitGame() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.exitFromPreparingGame.code}`, (response) => {
			// console.log("EXIT GAME IN MAIN");
			// console.log(response);
			const request = {
				gameID: this.gameID
			};
			this.bus.emit(`${gameCodes.gameDelete.request}`, request);
			// this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	gameStep() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameStep.code}`, (response) => {
			// console.log("GAME STEP IN MAIN");
			// console.log(response);
			const request = response;
			//this.bus.emit('step', request);
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	gameEnd() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameEnd.code}`, (response) => {
			// console.log("GAME END IN MAIN");
			// console.log(response);
			const request = response;
			//this.bus.emit('winOrLose', request);
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	figureClick() {
		this.bus.on('makeStepEnable', (response) => {
			// console.log("FIGURE CLICK IN MAIN");
			// console.log(response);
			const request = response;
			// this.bus.emit('stepEnableInWorker', request);
			this.bus.emit(`${gameWorkerMessage.responseEventName}`, request);
		});
	}

	figureType() {
		this.bus.on('figureType', (response) => {
			// console.log("FIGURE TYPE IN MAIN");
			// console.log(response);
			this.draw.getGameInfo(response);
		});
	}

	winDetected() {
		this.bus.on('winnerOrLooser', (response) => {
			// console.log("WIN DETECTED IN MAIN");
			// console.log(response);
			this.draw.gameEnd(response);
		});
	}

	coordinatesForStep() {
		this.bus.on('coordinatesForStep', (response) => {
			// console.log("COORD FOR STEP IN MAIN");
			// console.log(response);
			this.draw.gameStep(response);
		})
	}

	stepEnable() {
		this.bus.on('stepEnable', (response) => {
			// console.log("STEP ENABLE IN MAIN");
			// console.log(response);
			this.draw.makeStepEnable(response);
		})
	}
}
