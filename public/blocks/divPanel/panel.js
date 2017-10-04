'use strict';
import Block from "../commonBlock/block.js";

export default class Panel extends Block {

	constructor(attrs = {}, classes = []) {
		super('div', attrs, ['panel', 'page', ...classes]);
	}
}