'use strict';

export default class GameWorker {

	constructor(eventBus) {
		this.bus = eventBus;
		this.queue = [];
		this.stepIndicator = true;

		this.step();
		this.stepEnable();
		this.startArray();
		this.fullStep();
		this.getUserID();
		this.winOrLose();
	}

	getUserID() {
		this.bus.on('getUserID', (response) => {
			this.userID = response.userID;
			this.figureType = this.detectFigureByUserID(this.userID);
			this.bus.emit('figureType', this.figureType);
		});
	}

	winOrLose() {
		this.bus.on('winOrLose', (response) => {
			let win = false;
			const finishArray = response.field.field;
			this.result = this.findMaxFiguresCount(this.countFigure(finishArray));
			if (this.result === this.figureType) { win = true; }
			let request = {
				win: win
			};
			this.bus.emit('winnerOrLooser', request);
		});
	}

	stepEnable() {
		this.bus.on('stepEnableInWorker', (response) => {
			let array = response.array;
			const fieldSize = array.length;
			let x = response.x;
			let z = response.z;
			let request = [];
			for (let i = 0; i < fieldSize; i++) {
				for (let j = 0; j < fieldSize; j++) {
					const idx2 = array[i][j].x;
					const idz2 = array[i][j].z;
					if (!(Math.abs(idx2 - x) >= 3 ||
							Math.abs(idz2 - z) >= 3 ||
							array[i][j].figure !== 0 )) {
						let coord = {
							x: i,
							z: j
						};
						request.push(coord);
					}
				}
			}
			this.bus.emit('stepEnable', request);
		});
	}

	startArray() {
		this.bus.on('startArray', (response) => {
			this.fieldSize = response.game.field.maxX;
			this.arrayOfField = response.game.field.field;
			this.gamers = response.game.gamers;
			this.countPlayers = this.gamers.length;
		});
	}

	step() {
		this.bus.on('step', (response) => {
			this.queue.push(response);
		});
	}

	fullStep() {
		if (typeof this.queue !== 'undefined' && this.queue !== null &&
			this.queue.length > 0 && this.stepIndicator
		) {
			this.stepIndicator = false;
			const response = this.queue.shift();
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

			const request = {
				vector: vector,
				clone: clone,
				step: step,
				figureForPaint: figureForPaint
			};
			this.bus.emit('coordinatesForStep', request);
			this.stepIndicator = true;
		}

		requestAnimationFrame(this.fullStep.bind(this));
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
		for (let i = 0; i < this.gamers.length; i++) {
			if (this.gamers[i].userID === userID) {
				return i;
			}
		}
	}
}