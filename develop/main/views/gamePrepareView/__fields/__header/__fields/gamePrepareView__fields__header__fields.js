'use strict';
import Block from '../../../../../blocks/block/block.js';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class headerFields {
	constructor(data) {
		this.fields = {
			gameId: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__gameId',
				'gamePrepareView__fields__header__fields'], `GameId: ${data.gameId}`),
			playersNumber: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__playersNumber',
				'gamePrepareView__fields__header__fields'], `Players: ${data.playersNumber}`),
			botsNumber: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__botsNumber',
				'gamePrepareView__fields__header__fields'], `Bots: ${data.botsNumber}`),
			totalPLayersNumber: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__totalPLayersNumber',
				'gamePrepareView__fields__header__fields'], `Total players: ${data.totalPLayersNumber}`),
			voyeursNumber: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__voyeursNumber',
				'gamePrepareView__fields__header__fields'], `Voyeurs: ${data.voyeursNumber}`),
			fieldSize: Block.Create('div', {}, ['gamePrepareView__fields__header__fields__fieldSize',
				'gamePrepareView__fields__header__fields'], `Field size: ${data.fieldSize} x ${data.fieldSize}`),
		}
	}
}
