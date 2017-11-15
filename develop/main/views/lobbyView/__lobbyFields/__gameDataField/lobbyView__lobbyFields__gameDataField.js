'use strict';

import Block from '../../../../blocks/block/block';
import GameDataFields from './__fields/lobbyView__lobbyFields__gameDataField__fields';
import eventBus from '../../../../modules/eventBus';


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
		this.bus = eventBus;
		this.gameID = data.gameID;
		const gameDataFields = new GameDataFields(data);
		this.fields = gameDataFields.fields;
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}

		this.fields.playButton.on('click', () => {
			const data = {
				code: '101',
				gameID: `${this.gameID}`,
			};
			this.bus.emit('connectGame', data);
		})
	}


	updateGameData(data) {
		for (let key in data) {
			this.fields[key].el.innerHTML = this.fields[key].el.innerHTML.replace(/\d+/g, data[key]);
		}
	}
}