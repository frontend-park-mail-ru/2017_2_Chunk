'use strict';

const offBot = new class BotWorker {
	constructor() {
		this.arrayOfField = [];
		this.countFigure = [];
		this.gamers = {};

		this.initCodes();
	}

	initCodes() {
		this.init102();
		this.init103();
		this.init110();
		this.init131();
		this.init200();
		this.init201();
		this.init204();
	}

	init102() {
		this.code102 = {
			code: 102,
			games: [],
			reason: "Get full information about all preparing games"
		};

		this.gameData = {
			botSize: 1,
			gameID: 1,
			masterUsername: "Player",
			maxX: 6,
			maxY: 6,
			numberOfPlayers: 2,
			realSize: 1
		};

		this.code102.games.push(this.gameData);
	}

	init110() {
		this.code110 = {
			code: 110,
			game: {
				botPlayers: [],
				gameID: 1,
				masterID: 1,
				maxX: 6,
				maxY: 6,
				numberOfPlayers: 2,
				realPlayers: []
			},
			reason: "You have created a new active"
		};

		this.playerData = {
			email: "player@com",
			online: true,
			playerID: 1,
			userID: 1,
			username: "Player"
		};

		this.gamers[this.playerData.userID] = JSON.parse(JSON.stringify(this.playerData));

		this.code110.game.realPlayers.push(this.playerData);
	}

	init103() {
		this.code103 = {
			code: 103,
			gameID: 1,
			userID: 1,
			reason: "Returns your userID, gameID"
		}
	}

	init131() {
		this.code131 = {
			code: 131,
			botID: null,
			botlvl: 3,
			botsCount: 0,
			botname: "bot",
			reason: "A new bot player joined"
		};
	}

	init200() {
		this.code200 = {
			code: 200,
			game: {
				currentPlayerID: 1,
				field: {
					field: [],
					gameOver: false,
					maxX: 6,
					maxY: 6
				},
				gameID: 1,
				gamers: {},
				numberOfPlayers: 2,
				watchers: {}
			},
			reason: "Start the active"
		}
	}

	init201() {
		this.stepObject = {}
	}

	init204() {
		this.code204 = {
			code: 204,
			field: {
				field: [],
				gameOver: true,
				maxX: 6,
				maxY: 6
			},
			gameID: 1,
			reason: "Game had ended, check result"
		}
	}

	handle110(data) {
		this.code110.game.maxX = data.maxX;
		this.code110.game.maxY = data.maxY;
		this.code110.game.numberOfPlayers = data.numberOfPlayers;

		return this.code110;
	}

	handle103() {
		return this.code103;
	}

	handle131(data) {
		this.code131.botlvl = data.lvlbot;
		this.code131.botsCount++;
		this.code131.botname = `bot${this.code131.botsCount}`;

		this.playerData.userID = null;
		this.playerData.username = this.code131.botname;
		this.playerData.email = `${this.code131.botname}@com`;
		this.playerData.playerID = this.code131.botsCount+1;
		this.gamers[this.code131.botsCount+1] = JSON.parse(JSON.stringify(this.playerData));

		return this.code131;
	}

	handle135() {
		this.arrayOfField = this.createStartArray(
			this.code110.game.maxX,
			this.code110.game.numberOfPlayers
		);
		this.code200.game.field.field = this.arrayOfField;
		this.code200.game.field.maxX = this.code110.game.maxX;
		this.code200.game.field.maxY = this.code110.game.maxY;
		this.code200.game.numberOfPlayers = this.code110.game.numberOfPlayers;
		this.code200.game.gamers = this.gamers;

		return this.code200;
	}

	handle201(data) {
		this.stepObject = data;
		self.postMessage(this.stepObject);
		this.returnBotStep();
	}

	handle102() {
		return this.code102;
	}

	handle132() {
		let request = {
			code: 132,
			userID: 1
		};
		return request;
	}

	makeGameField(size) {
		let array = [];
		for (let i = 0; i < size; i++) {
			array[i] = [];
		}
		for (let i = 0; i < size; i ++) {
			for (let j = 0; j < size; j ++) {
				array[i][j] = 0;
			}
		}
		return array;
	}

	createStartArray(size, countOfPlayers) {
		let startArray = this.makeGameField(size);
		if (countOfPlayers === '2') {
			startArray[0][0] = 1;
			startArray[0][size - 1] = 2;
			startArray[size - 1][0] = 2;
			startArray[size - 1][size - 1] = 1;
		} else {
			startArray[0][0] = 1;
			startArray[0][size - 1] = 2;
			startArray[size - 1][0] = 3;
			startArray[size - 1][size - 1] = 4;
		}
		return startArray;
	}

	returnBotStep() {
		this.moveOrClone(this.stepObject.step);
		this.step(this.stepObject.step);

		if (this.isGameOver()) {
			console.log("HERE 1");
			return;
		}

		for (let i = 0; i < this.code131.botsCount; i++) {
			if (this.isGameOver()) {
				console.log("HERE 2");
				return;
			}
			if (this.countFigure[i+1] === 0)
				continue;
			this.botStep(i+2);
			this.moveOrClone(this.stepObject.step);
			this.step(this.stepObject.step);

			if (this.isGameOver()) {
				console.log("HERE 3");
				return;
			}

			self.postMessage(this.stepObject);
		}
	}

	isGameOver() {
		if (this.gameOver()) {
			this.code204.field.field = this.arrayOfField;
			this.code204.field.maxX = this.code110.game.maxX;
			this.code204.field.maxY = this.code110.game.maxY;
			this.clearGame();

			self.postMessage(this.code204);
			return true;
		}
		else
			return false;
	}

	clearGame() {
		this.arrayOfField = [];
		this.gamers = [];

		this.init102();
		this.init103();
		this.init110();
		this.init131();
		this.init200();
		this.init201();
	}

	moveOrClone(step) {
		if (Math.abs(step.src.x - step.dst.x) <= 1 && Math.abs(step.src.z - step.dst.z) <= 1) {
			this.arrayOfField[step.dst.x][step.dst.z] = this.arrayOfField[step.src.x][step.src.z];
		}
		else {
			this.arrayOfField[step.dst.x][step.dst.z] = this.arrayOfField[step.src.x][step.src.z];
			this.arrayOfField[step.src.x][step.src.z] = 0;
		}
	}

	step(step) {
		let idx = step.dst.x;
		let idz = step.dst.z;
		for (let i = 0; i < this.code110.game.maxX; i++) {
			for (let j = 0; j < this.code110.game.maxY; j++) {
				// Первые два условия проверяют, что перебираемая в цикле клетка находится вплотную к заданной.
				if (Math.abs(i - idx) <= 1 &&
					Math.abs(j - idz) <= 1) {
					// Затем идет проверка, что на этой клетке есть фигура и что она отлична от той, которая совершила ход.
					if (this.arrayOfField[i][j] !== 0 &&
						this.arrayOfField[i][j] !== this.arrayOfField[idx][idz]) {
						// И затем в массив клеток вносятся соответствующие изменения по фигурам.
						this.arrayOfField[i][j] = this.arrayOfField[idx][idz];
					}
				}
			}
		}
	}

	botStep(figure) {
		for (let i = 0; i < this.code110.game.maxX; i++) {
			for (let j = 0; j < this.code110.game.maxY; j++) {
				if (this.arrayOfField[i][j] === figure) {
					const step = this.makeStepEnable(i ,j);
					if (step) {
						this.stepObject.step.src.x = i;
						this.stepObject.step.src.z = j;
						this.stepObject.step.dst = step;
						return;
					}
				}
			}
		}
	}

	makeStepEnable(x, z) {
		for (let k = 0; k < this.code110.game.maxX; k++) {
			for (let m = 0; m < this.code110.game.maxY; m++) {
				if (!(Math.abs(k - x) >= 3 || Math.abs(m - z) >= 3 || this.arrayOfField[k][m] !== 0)) {
					const step = {
						x: k,
						z: m
					};
					return step;
				}
			}
		}
		return false;
	}

	gameOver() {
		let notFreePlane = 0;
		let zeroPlayers = 0;
		for (let k = 0; k < this.code110.game.numberOfPlayers; k++) {
			this.countFigure[k] = 0;
		}
		for (let i = 0; i < this.code110.game.maxX; i++) {
			for (let j = 0; j < this.code110.game.maxY; j++) {
				if (this.arrayOfField[i][j] !== 0) {
					notFreePlane++;
					this.countFigure[this.arrayOfField[i][j]-1]++;
				}
			}
		}
		if (notFreePlane === this.code110.game.maxX * this.code110.game.maxY)
			return true;
		for (let m = 0; m < this.code110.game.numberOfPlayers; m++) {
			if (this.countFigure[m] === 0)
				zeroPlayers++;
		}
		if ((+this.code110.game.numberOfPlayers === 2 && zeroPlayers === 1) ||
			(+this.code110.game.numberOfPlayers === 4 && zeroPlayers === 3) ||
			this.countFigure[0] === 0)
			return true;
		return false;
	}
};

self.onmessage = (workerRequest) => {
	let data = workerRequest.data;
	let workerResponse;
	console.log(data);
	switch (data.code) {
		case '102':
			workerResponse = offBot.handle102();
			break;
		case '110':
			workerResponse = offBot.handle110(data);
			break;
		case '103':
			workerResponse = offBot.handle103();
			break;
		case '131':
			workerResponse = offBot.handle131(data);
			break;
		case '132':
			workerResponse = offBot.handle132();
			break;
		case '135':
			workerResponse = offBot.handle135();
			break;
		case '201':
			offBot.handle201(data);
			break;
		default:
			console.log('Error');
	}
	if (workerResponse !== undefined)
		self.postMessage(workerResponse);
};

