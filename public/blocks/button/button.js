'use strict';
import Block from "../common block/block";

export class Button extends Block {

	constructor(text, classes, attrs) {
		super('button', ['button', ...classes], attrs);
		this.setText(text);
	}
}