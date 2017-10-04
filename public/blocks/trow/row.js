'use strict';
import Block from "../commonBlock/block.js";

export default class Row extends Block {

	constructor(innerBlock = [], attrs = {}, classes = []) {
		super('tr', attrs, classes);
		for (let a = 0; a < innerBlock.length; ++a) {
			this.appendChild(innerBlock[a]);
		}
		// innerBlock.forEach(this.appendChild());
	}
}