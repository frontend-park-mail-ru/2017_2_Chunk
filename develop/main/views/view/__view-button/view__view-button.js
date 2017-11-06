'use strict';

import Block from '../../../blocks/block/block';


export default class ViewButton extends Block {
	constructor(button) {
		super(button.el);
	}

	static Create (attrs = {}, classes = [], text) {
		const _classes = classes;
		_classes.push('view__view-button');
		const button = Block.Create('a', attrs, _classes, text);
		return new ViewButton(button);
	}
}

