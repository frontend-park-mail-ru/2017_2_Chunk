'use strict';
import Block from "../common block/block.js";

export default class Panel extends Block {

	constructor(attrs = {}, classes = []) {
		super('div', attrs, ['panel', 'page', ...classes]);
	}
}