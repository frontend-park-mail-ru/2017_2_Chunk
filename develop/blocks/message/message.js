'use strict';

import Block from "../block/block";

/**
 * Базовый класс формы для отправки информационных сообщений в тело html документа
 * @module Message
 */
export default class Message extends Block {
	/**
	 * Создает элемент div CSS класса message
	 * @constructor
	 */
	constructor() {
		const el = document.createElement('div');
		super(el);

		this.el.classList.add("message");

		// el.classList.add('message');

	}


	/**
	 * Сбрасывает атрибуты HTMLElement
	 */
	reset() {
		this.el.reset();
	}
}
