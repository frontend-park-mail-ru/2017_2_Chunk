'use strict';
import Block from "../common block/block";

export default class Button extends Block {

	constructor(text, attrs = {}, classes = []) {
		super('button', ['button', ...classes], attrs);
		this.setText(text);
	}
}