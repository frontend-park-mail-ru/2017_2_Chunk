'use strict';

import Block from '../../../../blocks/block/block';
import GameDataFields from './__fields/lobbyView__lobbyFields__gameDataField__fields';


/**
 * Базовый класс поля с данными одной игры
 * @module LobbyGameData
 */



export default class LobbyGameData extends Block {
	/**
	 * @constructor
	 */
	constructor() {
		const block = Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField']);
		super(block.el);
		this.fields = {};
		debugger;
		const gameDataFields = new GameDataFields();
		this.fields = gameDataFields.fields;
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
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