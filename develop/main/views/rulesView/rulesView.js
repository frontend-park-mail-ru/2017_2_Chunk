'use strict';

import View from '../view/view';
import Block from '../../blocks/block/block.js';


export default class rulesView extends View {
	constructor(emitBus) {
		const rules = Block.Create('div', {}, ['rulesText'], 'text Text text');

		debugger;

		super({rules});

		this.bus = emitBus;

		this.bus.on('openRules', () => {
			this.show();
		});

		this.hide();
	}
}
