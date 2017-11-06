'use strict';

import View from '../view/view';
import Block from '../../blocks/block/block.js';


/**
 * Класс секции правил
 * @module RulesView
 */
export default class RulesView extends View {
	/**
	 * @param emitBus - общий для всех модулей объект класса
	 * @constructor
	 */
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
