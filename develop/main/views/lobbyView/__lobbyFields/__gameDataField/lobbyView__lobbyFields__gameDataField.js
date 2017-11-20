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
		this.bus = eventBus;
		this.gameID = data.gameID;
		this.gameDataFields = new GameDataFields(data);
		for (let field in this.gameDataFields.fields) {
			this.append(this.gameDataFields.fields[field]);
		}

		this.gameDataFields.fields.playButton.on('click', () => {
			const data = {
				code: '101',
				gameID: `${this.gameID}`,
			};
			this.bus.emit('connectGame', data);
		});

		this.bus.on('socketCode103', (socketResponse) => {
			// debugger;
			if(socketResponse.gameID === this.gameID) {
				let gamersNumberHtml = this.gameDataFields.fields.gamersNumber.el;
				// debugger;
				let gamersNumber = +gamersNumberHtml.innerHTML.match(/\d+/)[0];
				gamersNumber -= 1;
				gamersNumberHtml.innerHTML = gamersNumberHtml.innerHTML.replace(/\d+/g, gamersNumber);
			}
		});
	}




	updateGameData(socketResponse) {
		this.gameDataFields.update(socketResponse)
	}
}