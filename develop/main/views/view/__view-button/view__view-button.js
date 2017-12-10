'use strict';

import Block from '../../../blocks/block/block';


/**
 * Класс кнопки вьюх
 * @module ViewButton
 */
export default class ViewButton extends Block {
	/**
	 * @param button
	 * @constructor
	 */
	constructor(button) {
		super(button.el);
		const buttonNumber = Math.round(Math.random() * 3);
		this.el.style.backgroundImage = `url(/images/buttons/buttonTape${buttonNumber}.jpg)`;
	}


	/**
	 * Фабричный метод для создания кнопки
	 * @param {*} attrs
	 * @param {string[]} classes
	 * @param {string} text
	 * @returns {ViewButton}
	 * @constructor
	 */
	static Create (attrs = {}, classes = [], text) {
		const _classes = classes;
		_classes.push('view__view-button');
		_classes.push('button');
		_classes.push('view__view-button_theme-black-orange');
		const button = Block.create('a', attrs, _classes, text);
		return new ViewButton(button);
	}

}

