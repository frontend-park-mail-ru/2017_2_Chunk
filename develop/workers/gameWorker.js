'use strict';

const gameWorker = new class GameWorker {
	constructor(eventBus) {
		this.bus = eventBus;
		this.queue = [];
		this.stepIndicator = true;

	}

	getUserID(data) {
		this.userID = data.userID;
		this.figureType = this.detectFigureByUserID(this.userID);
		const request = {
			func: 'figureType',
			figureType: this.figureType,
			username: this.gamers[this.figureType+1].username
		};
		return request;
	}

	fullWinOrLose(data) {
		let win = false;
		const finishArray = data.field.field;
		this.result = this.findMaxFiguresCount(this.countFigure(finishArray));
		if (this.result === this.figureType) {
			win = true;
		}
		let playerString = '';
		if (win) {
			playerString = this.playerString(1) + '\n' + 'You win! :)';
		} else {
			playerString = this.playerString(1) + '\n' + 'You lose! :(';
		}
		let request = {
			func: 'winnerOrLooser',
			playerString: playerString,
			win: win
		};

		self.postMessage(request);
	}

	stepEnable(data) {
		let array = data.array;
		const fieldSize = array.length;
		let x = data.x;
		let z = data.z;
		let reqArray = [];
		for (let i = 0; i < fieldSize; i++) {
			for (let j = 0; j < fieldSize; j++) {
				if (!(Math.abs(i - x) >= 3 ||
						Math.abs(j - z) >= 3 ||
						array[i][j] !== 0 )) {
					let coord = {
						x: i,
						z: j
					};
					reqArray.push(coord);
				}
			}
		}
		const request = {
			func: 'stepEnable',
			arrayAfterStep: reqArray
		};
		return request;
	}

	startArray(data) {
		this.currentPlayer = 2;
		this.fieldSize = data.game.field.maxX;
		this.arrayOfField = data.game.field.field;
		this.gamers = data.game.gamers;
		this.countPlayers = 0;
		for (let key in this.gamers) {
			this.countPlayers++;
		}

		let request = {
			func: 'startDiv',
			playerString: this.playerString('start'),
			nowUsername: this.gamers[this.currentPlayer-1].username
		};
		self.postMessage(request);

		this.fullStep();
	}

	step(data) {
		this.queue.push(data);
	}

	winOrLose(data) {
		this.queue.push(data);
	}

	fullStep() {
		if (typeof this.queue !== 'undefined' && this.queue !== null &&
			this.queue.length > 0 && this.stepIndicator
		) {
			this.stepIndicator = false;
			const response = this.queue.shift();
			if (response.code === 204) {
				this.fullWinOrLose(response);
				this.stepIndicator = true;
				return;
			}
			const src = response.step.src;
			const dst = response.step.dst;
			let figureForPaint = [];
			let step = {
				src: response.step.src,
				dst: response.step.dst
			};
			let vector = {
				x: 0,
				z: 0,
			};
			let clone = false;
			vector.x = dst.x - src.x;
			vector.z = dst.z - src.z;
			if (Math.abs(dst.x - src.x) <= 1 && Math.abs(dst.z - src.z) <= 1) {
				clone = true;
				this.arrayOfField[dst.x][dst.z] = this.arrayOfField[src.x][src.z];
			} else {
				this.arrayOfField[dst.x][dst.z] = this.arrayOfField[src.x][src.z];
				this.arrayOfField[src.x][src.z] = 0;
			}
			for (let i = 0; i < this.fieldSize; i++) {
				for (let j = 0; j < this.fieldSize; j++) {
					// Первые два условия проверяют, что перебираемая в цикле клетка находится вплотную к заданной.
					if (Math.abs(i - dst.x) <= 1 &&
						Math.abs(j - dst.z) <= 1) {
						// Затем идет проверка, что на этой клетке есть фигура и что она отлична от той, которая совершила ход.
						if (this.arrayOfField[i][j] !== 0 &&
							this.arrayOfField[i][j] !== this.arrayOfField[dst.x][dst.z]) {
							// Если там стоит вражеская фигура, то ее цвет меняется на цвет той, которая совершила ход.
							let figure = {
								x: i,
								z: j,
								color: this.arrayOfField[dst.x][dst.z]
							};
							figureForPaint.push(figure);
							// И затем в массив клеток вносятся соответствующие изменения по фигурам.
							this.arrayOfField[i][j] = this.arrayOfField[dst.x][dst.z];
						}
					}
				}
			}
			if (this.gamers[this.currentPlayer] === undefined) {
				this.currentPlayer = this.returnNextPlayer(this.currentPlayer);
			}
			if (this.gamers[this.currentPlayer] === undefined) {
				this.currentPlayer = this.returnNextPlayer(this.currentPlayer);
			}
			const request = {
				func: 'coordinatesForStep',
				vector: vector,
				clone: clone,
				step: step,
				figureForPaint: figureForPaint,
				nowUsername: this.gamers[this.currentPlayer].username,
				playerString: this.playerString(),
			};
			this.currentPlayer = this.returnNextPlayer(this.currentPlayer);
			this.stepIndicator = true;
			self.postMessage(request);
		}

		setTimeout(this.fullStep.bind(this), 800);
	}

	countFigure(array) {
		const countFigure = [];
		for (let i = 0; i < this.countPlayers; i++) {
			countFigure[i] = 0;
		}
		for (let i = 0; i < this.fieldSize; i++) {
			for (let j = 0; j < this.fieldSize; j++) {
				if (array[i][j] > 0) {
					countFigure[array[i][j] - 1]++;
				}
			}
		}
		return countFigure;
	}

	playerString(param) {
		let playerString = '';
		let countFigure = this.countFigure(this.arrayOfField);
		for (let key in this.gamers) {
			playerString += `${this.gamers[key].username}` + ': ' + `${countFigure[key-1]}` + '\n';
		}
		if (!param)
			playerString += '\n' + 'Now moving: ' + `${this.gamers[this.currentPlayer].username}` + '\n';
		if (param === 'start')
			playerString += '\n' + 'Now moving: ' + `${this.gamers[this.currentPlayer-1].username}` + '\n';
		return playerString;
	}

	playerBlocked(data) {
		let username = data.player.username;
		console.log('username Blocked: ' + username);
		for (let key in this.gamers) {
			if (this.gamers[key].username === username) {
				console.log("KEY DELETED");
				console.log(key);
				delete this.gamers[key];
			}
		}
		console.log("BLOCKED");
	}

	returnNextPlayer(currentPlayer) {
		currentPlayer++;
		if (currentPlayer > this.countPlayers)
			currentPlayer = 1;

		console.log("CURRENTPLAYER");
		console.log(currentPlayer);

		return currentPlayer;
	}

	findMaxFiguresCount(array) {
		let max = 0;
		let maxI = 0;
		for (let i = 0; i < array.length; i++) {
			if (array[i] > max) {
				max = array[i];
				maxI = i;
			}
		}
		return maxI;
	}

	detectFigureByUserID(userID) {
		for (let key in this.gamers) {
			if (this.gamers[key].userID == userID) {
				return key-1;
			}
		}
	}

	azimuthAngle(data) {
		let xAnlge = (data.x * 5 + 2.5) - 15;
		let zAnlge = (data.z * 5 + 2.5) - 15;
		let angle = xAnlge/zAnlge;
		
		let angleRotate = 0;
		let azimuthAngle = data.currentAngle;
		let speed = 0;

		if (angle > 0) {
			if (angle === 1)
				angleRotate = Math.atan2(zAnlge, xAnlge);
			else if (xAnlge > 0 && zAnlge > 0)
				angleRotate = Math.atan(angle);
			else
				angleRotate = Math.atan(angle) - Math.PI;
		}
		if (xAnlge < 0 && zAnlge > 0)
			angleRotate = Math.atan(angle);
		if (xAnlge > 0 && zAnlge < 0)
			angleRotate = Math.atan(angle) + Math.PI;

		if (azimuthAngle > 0 && angleRotate > 0 ||
			azimuthAngle < 0 && angleRotate < 0) {
			if (azimuthAngle > angleRotate)
				speed = 10;
			else
				speed = -10;
		}
		if (azimuthAngle > 0 && angleRotate < 0) {
			if (azimuthAngle - Math.PI > angleRotate)
				speed = -10;
			else
				speed = 10;
		}
		if (azimuthAngle < 0 && angleRotate > 0) {
			if (azimuthAngle + Math.PI > angleRotate)
				speed = -10;
			else
				speed = 10;
		}

		const request = {
			func: 'azimuthAngle',
			speed: speed,
			angle: angleRotate
		};

		return request;
	}
};
self.onmessage = (workerRequest) => {
	let data = workerRequest.data;
	let workerResponse;
	switch (`${data.code}`) {
		case '204':
			gameWorker.winOrLose(data);
			break;
		case 'stepEnable':
			workerResponse = gameWorker.stepEnable(data);
			break;
		case 'rotateAngle':
			workerResponse = gameWorker.azimuthAngle(data);
			break;
		case '200':
			gameWorker.startArray(data);
			break;
		case '203':
			gameWorker.playerBlocked(data);
			break;
		case '103':
			if (gameWorker.gamers !== undefined)
				workerResponse = gameWorker.getUserID(data);
			break;
		case '201':
			gameWorker.step(data);
			break;
		default:
			console.log('Error');
	}
	if (workerResponse !== undefined)
		self.postMessage(workerResponse);
};
