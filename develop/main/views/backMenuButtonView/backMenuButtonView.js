'use strict';
import CommonView from '../view/view';
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
		const backButton = Block.create('a', {href: '/menu'},
			['backMenuButtonView', 'view__view-button_theme-black-orange', 'button'], 'Menu');
		super(backButton.el);

		this.button = backButton;
		this.hide();
	}
}
