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
		el.classList.add('message');
		super(el);
	}


	/**
	 * Сбрасывает атрибуты HTMLElement
	 */
	reset() {
		this.el.reset();
	}
}
