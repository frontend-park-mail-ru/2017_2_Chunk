'use strict';
import Block from '../../blocks/block/block.js';
import bus from '../../modules/eventBus';
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
			['backButtonView', 'view__view-button_theme-black-orange', 'button'], 'Back');
		super(backButton.el);
		this.button = backButton;
		this.hide();
		this.button.on('click', () => {
			const request = {
				code: `${gamePrepareCodes.exit.code}`,
			};
			const listener = bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`,
				() => {
					window.history.back();
					bus.remove(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`, listener);
				});
			bus.emit(`${gamePrepareCodes.exit.request}`, request);
		});
	}
}
