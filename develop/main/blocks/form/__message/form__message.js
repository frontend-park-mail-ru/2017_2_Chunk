'use strict';

import Block from "../../block/block";

/**
 * Базовый класс формы для отправки информационных сообщений в тело html документа
 * @module Message
 */
export default class Message extends Block {
	/**
	 * Создает корневой элемент элемент div
	 * @constructor
	 */
	constructor() {
		const block = Block.Create('div', {}, ["form__message", "form__message_theme"]);
		super(block.el);

		this.clear();
		this.hide();
	}


	/**
	 * Сбрасывает атрибуты HTMLElement
	 */
	reset() {
		this.el.reset();
	}
}
