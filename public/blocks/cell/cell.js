'use strict';
import Block from "../commonBlock/block.js";

export default class Cell extends Block {

    constructor(innerBlock = [], attrs = {}, classes = []) {
        super('td', attrs, classes);
	    for (let a = 0; a < innerBlock.length; ++a) {
		    this.appendChild(innerBlock[a]);
	    }
        // innerBlock.forEach(this.appendChild());
    }
}