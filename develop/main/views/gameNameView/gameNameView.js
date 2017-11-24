'use strict';
import Block from '../../blocks/block/block.js';


/**
 * Класс кнопки возврата в меню
 * @module backButtonView
 */
export default class GameNameView extends Block {
	/**
	 * @constructor - конструктор класса кнопки возврата в меню
	 */
	constructor() {
		const gameName = Block.create('div', {}, ['gameNameView', 'gameName'], 'NOT DEFENSE');
		super(gameName.el);
		this.gameName = gameName;
		this.hide();
		this.gameName.on('click', () => {
			this.bus.emit('goToMenu');
		});
	}
}
