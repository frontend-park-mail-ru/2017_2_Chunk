/**
 * Базовый класс формы
 * @module Form
 */
'use strict';
import Block from "../block/index";


export default class Form extends Block {
	/**
	 * @param Fields []- корневой элемент блока
	 * @constructor
	 */
	constructor(fields = []) {
		const el = document.createElement('form');
		super(el);

		fields.forEach(function (field) {
			const f = Block.Create('input', field.attrs || {}, field.classes || []);
			this.append(f);
		}.bind(this));
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
			//запись элементов формы в formdata
			for (let element in elements) {
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
