'use strict';

import View from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';
import rulesViewTextTemplate from  './rulesView__text/rulesViewText.pug';


/**
 * Класс секции правил
 * @module RulesView
 */
export default class RulesView extends View {
	/**
	 * @param eventBus - общий для всех модулей объект класса
	 * @constructor
	 */
	constructor() {
		const rulesViewText = rulesViewTextTemplate();
		const rules = Block.create('div', {}, ['rulesText', 'main_font-theme-black-orange']);
		rules.el.innerHTML = `${rulesViewText}`;

		super({rules});

		this.bus = eventBus;

		this.bus.on('openRules', () => {
			this.show();
		});

		this.hide();
	}
}
