'use strict';
import Block from '../../../../../blocks/block/block.js';
import ViewButton from '../../../../view/__view-button/view__view-button';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class GameDataFields {
	constructor() {
		this.fields = {
			gameId: Block.Create('div', {}, ['gameId',
				'lobbyView__lobbyFields__gameDataField__fields'], 'gameId = 32'),
			playersNumber: Block.Create('div', {}, ['playersNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Players: 2'),
			botsNumber: Block.Create('div', {}, ['botsNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Bots: 2'),
			totalPLayersNumber: Block.Create('div', {}, ['totalPLayersNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Total players: 4'),
			voyeursNumber: Block.Create('div', {}, ['voyeursNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Voyeurs: 0'),
			fieldSize: Block.Create('div', {}, ['filedSize',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Field size: 10x10'),
			// voyeurButton: ViewButton.Create({href: '/game'}, ['auth'], 'Play');
			playButton: ViewButton.Create({href: '/gameInfo'}, ['playButton',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Play'),
		}
	}
}

