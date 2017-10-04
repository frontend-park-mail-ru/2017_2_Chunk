'use strict';
import Block from "../commonBlock/block.js";

export default class Row extends Block {

	constructor(innerBlock = [], attrs = {}, classes = []) {
		super('tr', attrs, classes);
		innerBlock.forEach(block => this.appendChild(block));
	}
}