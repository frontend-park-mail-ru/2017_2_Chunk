'use strict';
import Block from "../commonBlock/block.js";

export default class Button extends Block {

	constructor(text, attrs = {}, classes = []) {
		super('button', attrs, ['button', ...classes]);
		this.setText(text);
	}
}