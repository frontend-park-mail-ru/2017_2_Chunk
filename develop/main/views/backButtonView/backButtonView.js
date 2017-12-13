'use strict';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';
import gamePrepareCodes from '../../messageCodes/gamePrepareCodes';


/**
 * Класс кнопки возврата в меню
 * @module backButtonView
 */
export default class backButtonView extends Block {
	/**
	 * @constructor - конструктор класса кнопки возврата в меню
	 */
	constructor() {
		const backButton = Block.create('div', {},
			['backButtonView', 'button'], 'Back');
		super(backButton.el);
		this.button = backButton;
		this.hide();
		this.button.on('click', () => {
			eventBus.emit('waitingBackend');
			const request = {
				code: `${gamePrepareCodes.exit.code}`,
			};
			eventBus.emit(`${gamePrepareCodes.requestEventName}`, request);
		});
	}
}
