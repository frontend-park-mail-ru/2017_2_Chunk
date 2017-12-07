'use strict';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


/**
 * Класс кнопки возврата в меню
 * @module backButtonView
 */
export default class GameNameView extends Block {
	/**
	 * @constructor - конструктор класса кнопки возврата в меню
	 */
	constructor() {
		const gameName = Block.create('div', {}, ['gameNameView', 'gameName'], 'GUARDIANS OF THE GALAXY');
		super(gameName.el);
		this.gameName = gameName;
		this.hide();
		this.gameName.on('click', () => {
			eventBus.emit('goToMenu');
		});
	}
}
