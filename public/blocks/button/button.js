'use strict';
import Block from "../commonBlock/block.js";

export default class Button extends Block {

	constructor(text, attrs = {}, classes = []) {
		super('button', ['button', ...classes], attrs);
		this.setText(text);
	}
}