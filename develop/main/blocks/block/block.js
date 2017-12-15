'use strict';
/**
 * Базовый класс блока
 * @module Block
 */
export default class Block {
	/**
	 * @param {HTMLElement} el - корневой элемент блока
	 * @constructor
	 */
	constructor(el) {
		this.el = el;
		this.hidden = false;
	}

	/**
	 * Фабричный метод, который ползволяет удобро создавать блоки с заданными характеристиками
	 * @param {string} [tagName='div'] - tagName блока
	 * @param {*} [attrs={}] - объект с атрибутами блока
	 * @param {string[]} [classes=[]] - список имён классов
	 * @param {string|null} [text=null] - опциональный текст блока
	 * @return {Block}
	 */
	static create(tagName = 'div', attrs = {}, classes = [], text = null) {
		const el = document.createElement(tagName);
		classes.forEach(function (className) {
			el.classList.add(className);
		});
		for (const name in attrs) {
			el.setAttribute(name, attrs[name]);
		}
		if (text) {
			el.textContent = text;
		}
		return new Block(el);
	}


	/**
	 * Установить новый текст для блока
	 * @param {string} text
	 */
	setText(text) {
		this.el.textContent = text;
	}

	/**
	 * Очищает содержимое блока
	 */
	clear() {
		this.el.innerHTML = '';
	}

	/**
	 * Скрывает блок
	 */
	hide() {
		this.hidden = true;
		this.el.classList.add('main_hidden');
		this.el.setAttribute('hidden', 'true');
	}

	/**
	 * Отображает блок
	 */
	show() {
		this.hidden = false;
		this.el.removeAttribute('hidden');
		this.el.classList.remove('main_hidden');
	}

	/**
	 * Добавляет к текущему блоку дочерний
	 * @param {Block} block
	 * @return {Block} this - возвращает ссылку на самого себя
	 */
	append(block) {
		this.el.appendChild(block.el);
		return this;
	}

	/**
	 * Удаляет у текущего блока дочерний
	 * @param {Block} block
	 * @return {Block} this - возвращает ссылку на самого себя
	 */
	remove(block) {
		this.el.removeChild(block.el);
		return this;
	}

	/**
	 * Позволяет подписаться на событие
	 * @param {string} event
	 * @param {EventListener} callback
	 * @return {function(this:Block)} - функция отписки от события
	 */
	on(event, callback) {
		this.el.addEventListener(event, callback);
		return () => {
			this.el.removeEventListener(event, callback);
		};
	}
}

