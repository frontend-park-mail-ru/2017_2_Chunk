'use strict';

const startArray = [
	[1,0,0,0,0,2],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[0,0,0,0,0,0],
	[2,0,0,0,0,1],
];

const offBot = new class BotWorker {
	constructor() {
		this.arrayOfField = 0;
		this.bots = [];
		this.gamers = [];

		this.connectGameObject = {
			botsCount: 0,
			code: '101',
			gameID: 1,
			gamersCount: 1,
			maxX: 8,
			maxY: 8,
			numberOfPlayers: 2,
			player: {
				userID: 1,
				username: "player",
				email: "player@com",
				playerID: null,
				online: true
			},
			reason: "Connect to preparing game as a player",
			watchersCount: 0
		};

		this.gameInformationObject = {
			code: '104',
			game: {
				bots: this.bots,
				gameID: this.connectGameObject.gameID,
				field: {
					field: this.arrayOfField,
					gameOver: false,
					maxX: this.connectGameObject.maxX,
					maxY: this.connectGameObject.maxY
				},
				gamers: this.gamers,
				masterID: 1,
				numberOfPlayers: this.connectGameObject.numberOfPlayers,
				watchers: this.connectGameObject.watchersCount
			},
			gameID: this.connectGameObject.gameID,
			player: null,
			reason: "Get full information about explicit game"
		};

		this.startGameObject = {
			code: '200',
			game: {
				currentPlayerID: 1,
				field: {
					field: this.arrayOfField,
					gameOver: false,
					maxX: this.connectGameObject.maxX,
					maxY: this.connectGameObject.maxY
				},
				gameID: this.connectGameObject.gameID,
				gamers: this.gamers,
				numberOfPlayers: this.connectGameObject.numberOfPlayers,
				watchers: this.connectGameObject.watchersCount
			},
			reason: "start the game"
		};

		this.gameEndObject = {
			code: '204',
			gameID: null,
			field: {
				field: this.arrayOfField,
				gameOver: true,
				maxX: this.connectGameObject.maxX,
				maxY: this.connectGameObject.maxY
			},
			reason: "Game had ended, check result"
		};

		this.playerData = {
			userID: 1,
			username: "player",
			email: "player@com",
			playerID: null,
			online: true
		};

		this.stepObject = {
			code: '201',
			step: {
				src: { x: 0, z: 0 },
				dst: {x: 0, z: 0 }
			},
			reason: "Game step"
		};

		this.userID = this.connectGameObject.player.userID;

		this.userIdObject = {
			code: '112',
			gameID: this.connectGameObject.gameID,
			reason: "Returns your userID",
			userID: this.userID
		};

		this.exitGameObject = {
			code: '110',
			gameID: this.connectGameObject.gameID
		}
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

	createGame(data) {
		this.connectGameObject.maxX = data.maxX;
		this.connectGameObject.maxY = data.maxY;
		this.arrayOfField = this.makeGameField(data.maxX);
		this.arrayOfField = startArray;
		this.connectGameObject.numberOfPlayers = +data.numberOfPlayers;

		return this.connectGameObject;
	}

	getGameInfo() {
		this.gamers.push(this.connectGameObject.player);
		this.gameInformationObject.game.bots = this.bots;
		this.gameInformationObject.game.gameID = this.connectGameObject.gameID;
		this.gameInformationObject.game.field.field = this.arrayOfField;
		this.gameInformationObject.game.field.maxX = this.connectGameObject.maxX;
		this.gameInformationObject.game.field.maxY = this.connectGameObject.maxY;
		this.gameInformationObject.game.gamers = this.gamers;
		this.gameInformationObject.game.numberOfPlayers = this.connectGameObject.numberOfPlayers;
		this.gameInformationObject.game.watchers = this.connectGameObject.watchersCount;
		this.gameInformationObject.game.gameID = this.connectGameObject.gameID;

		return this.gameInformationObject;
	}

	startGame() {
		this.arrayOfField = startArray;
		this.startGameObject.game.field.field = this.arrayOfField;
		this.startGameObject.game.field.maxX = this.connectGameObject.maxX;
		this.startGameObject.game.field.maxY = this.connectGameObject.maxY;
		this.startGameObject.game.gamers = this.gamers;
		this.startGameObject.game.gameID = this.connectGameObject.gameID;
		this.startGameObject.game.numberOfPlayers = this.connectGameObject.numberOfPlayers;
		this.startGameObject.game.watchers = this.connectGameObject.watchersCount;

		return this.startGameObject;
	}

	addBot() {
		this.connectGameObject.botsCount++;
		this.playerData.username = `bot`;
		this.playerData.userID++;
		this.playerData.email = `bot@com`;
		this.bots.push(this.playerData);
		this.connectGameObject.player = this.playerData;

		return this.connectGameObject;
	}

	getUserID() {
		this.userIdObject.gameID = this.connectGameObject.gameID;
		return this.userIdObject;
	}

	returnPlayerStep(data) {
		this.stepObject.step.src.x = data.step.src.x;
		this.stepObject.step.src.z = data.step.src.z;
		this.stepObject.step.dst.x = data.step.dst.x;
		this.stepObject.step.dst.z = data.step.dst.z;

		return this.stepObject;
	}

	returnBotStep() {
		this.moveOrClone(this.stepObject.step);
		this.step(this.stepObject.step);

		if (this.gameOver()) {
			this.gameEndObject.field.field = this.arrayOfField;
			this.clearGame();
			return this.gameEndObject;
		}

		this.botStep();
		this.moveOrClone(this.stepObject.step);
		this.step(this.stepObject.step);

		if (this.gameOver()) {
			this.gameEndObject.field.field = this.arrayOfField;
			this.clearGame();
			return this.gameEndObject;
		}

		return this.stepObject;
	}

	clearGame() {
		this.arrayOfField = 0;
		this.bots = [];
		this.gamers = [];

		this.playerData = {
			userID: 1,
			username: "player",
			email: "player@com",
			playerID: null,
			online: true
		};

		this.connectGameObject = {
			botsCount: 0,
			code: '101',
			gameID: 1,
			gamersCount: 1,
			maxX: 8,
			maxY: 8,
			numberOfPlayers: 2,
			player: {
				userID: 1,
				username: "player",
				email: "player@com",
				playerID: null,
				online: true
			},
			reason: "Connect to preparing game as a player",
			watchersCount: 0
		};
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
		for (let i = 0; i < this.connectGameObject.maxX; i++) {
			for (let j = 0; j < this.connectGameObject.maxY; j++) {
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

	botStep() {
		for (let i = 0; i < this.connectGameObject.maxX; i++) {
			for (let j = 0; j < this.connectGameObject.maxY; j++) {
				if (this.arrayOfField[i][j] === 2) {
					const step = this.makeStepEnable(i ,j);
					if (step) {
						this.stepObject.step.src.x = i;
						this.stepObject.step.src.z = j;
						this.stepObject.step.dst.x = step.x;
						this.stepObject.step.dst.z = step.z;
						return;
					}
				}
			}
		}
	}

	makeStepEnable(x, z) {
		for (let k = 0; k < this.connectGameObject.maxX; k++) {
			for (let m = 0; m < this.connectGameObject.maxY; m++) {
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
		let countFigure = [];
		for (let k = 0; k < this.connectGameObject.numberOfPlayers; k++) {
			countFigure[k] = 0;
		}
		for (let i = 0; i < this.connectGameObject.maxX; i++) {
			for (let j = 0; j < this.connectGameObject.maxY; j++) {
				if (this.arrayOfField[i][j] !== 0) {
					notFreePlane++;
					countFigure[this.arrayOfField[i][j]-1]++;
				}
			}
		}
		if (notFreePlane === this.connectGameObject.maxX * this.connectGameObject.maxY)
			return true;
		for (let m = 0; m < this.connectGameObject.numberOfPlayers; m++) {
			if (countFigure[m] === 0)
				return true;
		}
		return false;
	}

	exitGame() {
		this.clearGame();
		return this.exitGameObject;
	}
};

self.onmessage = (workerRequest) => {
	let data = workerRequest.data;
	let workerResponse;
	console.log(data);
	switch (data.code) {
		case '100':
			workerResponse = offBot.createGame(data);
			break;
		case '103':
			workerResponse = offBot.exitGame();
			break;
		case '104':
			workerResponse = offBot.getGameInfo();
			break;
		case '105':
			workerResponse = offBot.startGame();
			break;
		case '108':
			workerResponse = offBot.addBot();
			break;
		case '112':
			workerResponse = offBot.getUserID();
			break;
		case '201':
			workerResponse = offBot.returnPlayerStep(data);
			self.postMessage(workerResponse);
			workerResponse = offBot.returnBotStep();
			break;
		default:
			console.log('Error');
	}
	self.postMessage(workerResponse);
};

