'use strict';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';
import gamePrepareCodes from '../../messageCodes/gamePrepareCodes';
import gameCodes from '../../messageCodes/gameCodes';


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
		this.url = 'waiting-hall';
		this.button.on('click', () => {
			eventBus.emit('waitingBackend');
			let request = {};
			if (this.url === 'waiting-hall') {
				 request = {
					code: `${gamePrepareCodes.exit.code}`,
				};
			}
			else {
				request = {
					code: `${gameCodes.playerOffline.code}`,
				};
			}
			eventBus.emit(`${gamePrepareCodes.requestEventName}`, request);
		});
	}


	show(url) {
		this.url = url;
		super.show();
	}
}
