'use strict';
import Block from '../../blocks/block/block.js';


/**
 * Класс кнопки возврата в меню
 * @module backButtonView
 */
export default class backButtonView extends Block {
	/**
	 * @constructor - конструктор класса кнопки возврата в меню
	 */
	constructor() {
		const backButton = Block.create('div', {}, ['backButtonView', 'view__view-button_theme-black-orange'], 'Back');
		super(backButton.el);
		this.button = backButton;
		this.hide();
		this.button.on('click', () => {
			window.history.back();
		});
	}
}
