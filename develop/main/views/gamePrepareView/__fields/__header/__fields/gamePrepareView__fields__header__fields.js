'use strict';
import Block from '../../../../../blocks/block/block.js';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class headerFields {
	constructor() {
		this.fields = {
			gameID: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__gameId',
				'gamePrepareView__fields__header__fields'], `GameId: 0`),
			gamersNumber: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__playersNumber',
				'gamePrepareView__fields__header__fields'], `Players: 0`),
			botsNumber: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__botsNumber',
				'gamePrepareView__fields__header__fields'], `Bots: 0`),
			numberOfPlayers: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__totalPLayersNumber',
				'gamePrepareView__fields__header__fields'], `Total players: 0`),
			watchers: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__voyeursNumber',
				'gamePrepareView__fields__header__fields'], `Voyeurs: 0`),
			fieldSize: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__fieldSize',
					'gamePrepareView__fields__header__fields'],
				`Field size: 0 x 0`),
		}
	}


	update(socketReceiveData) {
		this.fields.gameID.el.innerHTML = this.fields.gameID.el.innerHTML.replace(/\d+/g, socketReceiveData.gameID);
		this.fields.gamersNumber.el.innerHTML = this.fields.gamersNumber.el.innerHTML.replace(/\d+/g, socketReceiveData.game.gamers.length);
		this.fields.botsNumber.el.innerHTML = this.fields.botsNumber.el.innerHTML.replace(/\d+/g, socketReceiveData.game.bots.length);
		this.fields.numberOfPlayers.el.innerHTML = this.fields.numberOfPlayers.el.innerHTML.replace(/\d+/g, socketReceiveData.game.numberOfPlayers);
		this.fields.watchers.el.innerHTML = this.fields.watchers.el.innerHTML.replace(/\d+/g, socketReceiveData.game.watchers);
		this.fields.fieldSize.el.innerHTML = this.fields.fieldSize.el.innerHTML.replace(/\d+/g, socketReceiveData.game.field.maxX);
	}


	clear() {
		for (let key in this.fields) {
			this.fields[key].el.innerHTML = this.fields[key].el.innerHTML.replace(/\d+/g, 0);
		}
	}
}
