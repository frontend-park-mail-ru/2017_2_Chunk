'use strict';

import eventBus from '../modules/eventBus';
import gameCodes from '../messageCodes/gameCodes';
import GameWorker from './gameWorker';

import Draw from './draw';

export default class Game3D {

	constructor(container) {
		this.bus = eventBus;
		this.draw = new Draw(container);
		this.gameWorker = new GameWorker(this.bus);
		this.gameEvents();
	}

	gameEvents() {
		this.startGame();
		this.figureClick();
		this.gameStep();
		this.gameEnd();
		this.coordinatesForStep();
		this.figureType();
		this.winDetected();
	}

	getGameInfo() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.getGameInfo.code}`, (response) => {
			const request = response;
			this.bus.emit('getUserID', request);
		});
	}

	figureType() {
		this.bus.on('figureType', (response) => {
			this.draw.getGameInfo(response);
		});
	}

	startGame() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.startGame.code}`, (response) => {
			const request = {
				code: gameCodes.getGameInfo.code
			};
			this.bus.emit(`${gameCodes.getGameInfo.request}`, request);
			this.draw.startGame(response);
			this.bus.emit('startArray', response);
			this.getGameInfo();
		});
	}

	figureClick() {
		this.bus.on('makeStepEnable', (response) => {
			const request = response;
			this.stepEnable();
			this.bus.emit('stepEnableInWorker', request);
		});
	}

	gameStep() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameStep.code}`, (response) => {
			const request = response;
			this.bus.emit('step', request);
		});
	}

	gameEnd() {
		this.bus.on(`${gameCodes.responseEventName}${gameCodes.gameEnd.code}`, (response) => {
			const request = response;
			this.bus.emit('winOrLose', request);
		});
	}

	winDetected() {
		this.bus.on('winnerOrLooser', (response) => {
			this.draw.gameEnd(response);
		});
	}

	coordinatesForStep() {
		this.bus.on('coordinatesForStep', (response) => {
			this.draw.gameStep(response);
		})
	}

	stepEnable() {
		this.bus.on('stepEnable', (response) => {
			this.draw.makeStepEnable(response);
		})
	}
}
