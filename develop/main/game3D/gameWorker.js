'use strict';

export default class GameWorker {

	constructor(eventBus) {
		this.bus = eventBus;
		this.queue = [];
		this.stepIndicator = false;

		this.step();
		this.stepEnable();
		this.startArray();
		this.fullStep();
	}

	stepEnable() {
		this.bus.on('stepEnableInWorker', (response) => {
			let array = response.array;
			this.fieldSize = array.length;
			let x = response.x;
			let z = response.z;
			let request = [];
			for (let i = 0; i < this.fieldSize; i++) {
				for (let j = 0; j < this.fieldSize; j++) {
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
			this.arrayOfField = response;
		});
	}

	step() {
		this.bus.on('step', (response) => {
			console.log("I AM IN STEP IN GAME WORKER");
			this.queue.push(response);
		});
	}

	fullStep() {
		if (typeof this.queue !== 'undefined' && this.queue !== null && this.queue.length > 0) {
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

			console.log(this.arrayOfField);
			for (let i = 0; i < this.fieldSize; i++) {
				for (let j = 0; j < this.fieldSize; j++) {
					// Первые два условия проверяют, что перебираемая в цикле клетка находится вплотную к заданной.
					if (Math.abs(i - dst.x) <= 1 &&
						Math.abs(j - dst.z) <= 1) {
						console.log("FIRST pass");
						// Затем идет проверка, что на этой клетке есть фигура и что она отлична от той, которая совершила ход.
						if (this.arrayOfField[i][j] !== 0 &&
							this.arrayOfField[i][j] !== this.arrayOfField[src.x][src.z]) {
							console.log("SECOND pass");
							// Если там стоит вражеская фигура, то ее цвет меняется на цвет той, которая совершила ход.
							let figure = {
								x: i,
								z: j,
								color: this.arrayOfField[src.x][src.z]
							};
							figureForPaint.push(figure);
							// И затем в массив клеток вносятся соответствующие изменения по фигурам.
							this.arrayOfField[i][j] = this.arrayOfField[src.x][src.z];
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
			console.log("I JUST EMIT COORDINATES FOR STEP");
			this.bus.emit('coordinatesForStep', request);
		}

		requestAnimationFrame(this.fullStep.bind(this));
	}
}