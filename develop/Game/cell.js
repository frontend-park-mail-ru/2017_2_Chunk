"use strict";

'use strict';

export default class Cell {

	constructor() {
	}

	setCoordinates(x, y) {
		this.x = x;
		this.y = y;
	}

	setFigure(num) {
		this.figure = num;
	}

	setId(idx, idy) {
		this.idx = idx;
		this.idy = idy;
	}

	setBrightness(br) {
		this.brightness = br;
	}
}