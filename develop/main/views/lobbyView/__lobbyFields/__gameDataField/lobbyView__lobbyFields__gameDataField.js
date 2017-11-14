'use strict';

import Block from '../../../../blocks/block/block';
import GameDataFields from './__fields/lobbyView__lobbyFields__gameDataField__fields';


/**
 * Базовый класс поля с данными одной игры
 * @module LobbyGameData
 */
export default class LobbyGameData extends Block {
	/**
	 * {*} data - данные об игре
	 * @constructor
	 */
	constructor(data) {
		const block = Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField']);
		super(block.el);
		this.fields = {};
		const gameDataFields = new GameDataFields(data);
		this.fields = gameDataFields.fields;
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}


	updateGameData(data) {
		for (let key in data) {
			this.fields[key].el.innerHTML = this.fields[key].el.innerHTML.replace(/\d+/g, data[key]);
		}
	}
}