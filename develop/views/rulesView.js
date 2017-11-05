'use strict';

import CommonView from './commonView';
import Block from '../blocks/block/block.js';


export default class rulesView extends CommonView {
	constructor(emitBus) {
		const rules = {
			back: Block.Create('div', {}, ['rulesText', 'back'], 'text Text text'),
		};

		super(rules);

		this.bus = emitBus;

		this.bus.on('openRules', () => {
			this.show();
		});

		this.hide();
	}
}
