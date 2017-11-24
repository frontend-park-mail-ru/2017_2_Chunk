'use strict';

import Block from '../block/block';

/**
 * Базовый класс формы
 * @module Form
 */
export default class Form extends Block {
	/**
	 * @param {*} fields []- корневой элемент блока
	 * @constructor
	 */
	constructor(fields = []) {
		const block = Block.create('form', {}, ['form']);
		super(block.el);

		this.fields = [];
		fields.forEach(function (field) {
			const f = Block.create('input', field.attrs || {}, field.classes || []);
			this.fields.push(f);
			this.append(f);
		}.bind(this));

		this.el.classList.add('form');
	}


	/**
	 * Вызывается при отправке формы
	 * @param {Function} callback - колбек функция
	 */
	onSubmit(callback) {
		this.el.addEventListener('submit', (event) => {
			event.preventDefault();
			const formdata = {};
			const elements = this.el.elements;
			// запись элементов формы в formdata
			for (const element in elements) {
				formdata[elements[element].name] = elements[element].value;
			}

			callback(formdata);
		});
	}

	/**
	 * Сбрасывает атрибуты HTMLElement
	 */
	reset() {
		this.el.reset();
	}
}
