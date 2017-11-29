'use strict';

export default class GameWorker {

	constructor(eventBus) {
		this.bus = eventBus;

		this.step();
		this.stepEnable();
	}

	stepEnable() {
		this.bus.on('stepEnableInWorker', (response) => {
			let array = response.array;
			let x = response.x;
			let z = response.z;
			let request = [];
			for (let i = 0; i < array.length; i++) {
				for (let j = 0; j < array.length; j++) {
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

	step() {
		this.bus.on('step', (response) => {
			this.fullStep(response);
		});
	}

	fullStep(response) {
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

		const request = {

		};
		this.bus.emit('coordinatesForStep', request);
	}
}