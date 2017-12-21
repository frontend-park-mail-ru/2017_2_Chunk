'use strict';

const offBot = new class BotWorker {
	constructor() {
		this.arrayOfField = [];
		this.countFigure = [];
		this.playerLastMove = false;
		this.gamers = {};

		this.initCodes();
	}

	initCodes() {
		this.initFullGameInfo();
		this.initUserId();
		this.initNewActive();
		this.initAddBot();
		this.initStartActive();
		this.initStepObject();
		this.initEndGame();
	}

	initFullGameInfo() {
		this.fullGameInfo = {
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

		this.fullGameInfo.games.push(this.gameData);
	}

	initNewActive() {
		this.newActive = {
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

		this.newActive.game.realPlayers.push(this.playerData);
	}

	initUserId() {
		this.returnUserId = {
			code: 103,
			gameID: 1,
			userID: 1,
			reason: "Returns your userID, gameID"
		}
	}

	initAddBot() {
		this.addBot = {
			code: 131,
			botID: null,
			botlvl: 3,
			botsCount: 0,
			botname: "bot",
			reason: "A new bot player joined"
		};
	}

	initStartActive() {
		this.startActive = {
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

	initStepObject() {
		this.stepObject = {}
	}

	initEndGame() {
		this.endGame = {
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

	createNewActive(data) {
		this.newActive.game.maxX = data.maxX;
		this.newActive.game.maxY = data.maxY;
		this.newActive.game.numberOfPlayers = data.numberOfPlayers;

		return this.newActive;
	}

	getUserId() {
		return this.returnUserId;
	}

	addBotPlayer(data) {
		if (this.addBot.botsCount+1 === +this.newActive.game.numberOfPlayers) {
			let request = {
				code: 309,
				gameID: 1,
				reason: "All places in the active are already occupied"
			};
			return request;
		}

		this.addBot.botlvl = data.botlvl;
		this.addBot.botsCount++;
		this.addBot.botID = this.addBot.botsCount+1;
		this.addBot.botname = `bot${this.addBot.botsCount}`;

		this.playerData.userID = null;
		this.playerData.botID = this.addBot.botID;
		this.playerData.username = this.addBot.botname;
		this.playerData.email = `${this.addBot.botname}@com`;
		this.playerData.playerID = this.addBot.botsCount+1;
		this.gamers[this.addBot.botsCount+1] = JSON.parse(JSON.stringify(this.playerData));

		return this.addBot;
	}

	startGame() {
		if (+this.newActive.game.numberOfPlayers !== this.addBot.botsCount+1) {
			let request = {
				code: 304,
				gameID: 1,
				reason: "Not enough players (the active master is able to add bots)"
			};
			return request;
		}

		this.arrayOfField = this.createStartArray(
			this.newActive.game.maxX,
			this.newActive.game.numberOfPlayers
		);
		this.startActive.game.field.field = this.arrayOfField;
		this.startActive.game.field.maxX = this.newActive.game.maxX;
		this.startActive.game.field.maxY = this.newActive.game.maxY;
		this.startActive.game.numberOfPlayers = this.newActive.game.numberOfPlayers;
		this.startActive.game.gamers = this.gamers;

		return this.startActive;
	}

	playerStep(data) {
		this.stepObject = data;
		self.postMessage(this.stepObject);
		this.playerLastMove = true;
		this.returnBotStep();
	}

	returnFullGameInfo() {
		return this.fullGameInfo;
	}

	kickBot(data) {
		let request = {
			code: 133,
			userID: data.botID,
			reason: "The bot player was kicked out from the active"
		};
		this.addBot.botsCount--;
		return request;
	}

	backBotton() {
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

		if (this.isGameOver()) { return; }
		this.playerLastMove = false;

		for (let i = 0; i < this.addBot.botsCount; i++) {
			if (this.isGameOver()) { return; }
			if (this.countFigure[i+1] === 0)
				continue;
			this.botStep(i+2);
			this.moveOrClone(this.stepObject.step);
			this.step(this.stepObject.step);

			if (this.isGameOver()) { return; }

			self.postMessage(this.stepObject);
		}
	}

	isGameOver() {
		if (this.gameOver()) {
			this.endGame.field.field = this.arrayOfField;
			this.endGame.field.maxX = this.newActive.game.maxX;
			this.endGame.field.maxY = this.newActive.game.maxY;

			if (!this.playerLastMove)
				self.postMessage(this.stepObject);

			this.clearGame();

			self.postMessage(this.endGame);
			return true;
		}
		else
			return false;
	}

	clearGame() {
		this.arrayOfField = [];
		this.playerLastMove = false;
		this.gamers = [];

		this.initFullGameInfo();
		this.initUserId();
		this.initNewActive();
		this.initAddBot();
		this.initStartActive();
		this.initStepObject();
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
		for (let i = 0; i < this.newActive.game.maxX; i++) {
			for (let j = 0; j < this.newActive.game.maxY; j++) {
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
		for (let i = 0; i < this.newActive.game.maxX; i++) {
			for (let j = 0; j < this.newActive.game.maxY; j++) {
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
		for (let k = 0; k < this.newActive.game.maxX; k++) {
			for (let m = 0; m < this.newActive.game.maxY; m++) {
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
		for (let k = 0; k < this.newActive.game.numberOfPlayers; k++) {
			this.countFigure[k] = 0;
		}
		for (let i = 0; i < this.newActive.game.maxX; i++) {
			for (let j = 0; j < this.newActive.game.maxY; j++) {
				if (this.arrayOfField[i][j] !== 0) {
					notFreePlane++;
					this.countFigure[this.arrayOfField[i][j]-1]++;
				}
			}
		}
		if (notFreePlane === this.newActive.game.maxX * this.newActive.game.maxY)
			return true;
		for (let m = 0; m < this.newActive.game.numberOfPlayers; m++) {
			if (this.countFigure[m] === 0)
				zeroPlayers++;
		}
		if ((+this.newActive.game.numberOfPlayers === 2 && zeroPlayers === 1) ||
			(+this.newActive.game.numberOfPlayers === 4 && zeroPlayers === 3) ||
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
			workerResponse = offBot.returnFullGameInfo();
			break;
		case '103':
			workerResponse = offBot.getUserId();
			break;
		case '110':
			workerResponse = offBot.createNewActive(data);
			break;
		case '131':
			workerResponse = offBot.addBotPlayer(data);
			break;
		case '132':
			workerResponse = offBot.backBotton();
			break;
		case '133':
			workerResponse = offBot.kickBot(data);
			break;
		case '135':
			workerResponse = offBot.startGame();
			break;
		case '201':
			offBot.playerStep(data);
			break;
		default:
			console.log('Error');
	}
	if (workerResponse !== undefined)
		self.postMessage(workerResponse);
};

