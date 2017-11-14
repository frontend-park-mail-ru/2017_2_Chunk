'use strict';
import Block from '../../../../../blocks/block/block.js';
import ViewButton from '../../../../view/__view-button/view__view-button';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class GameDataFields {
	constructor(data) {
		this.fields = {
			gameId: Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__gameId',
				'lobbyView__lobbyFields__gameDataField__fields'], `gameId: ${data.gameId}`),
			playersNumber: Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__playersNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], `Players: ${data.playersNumber}`),
			botsNumber: Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__botsNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], `Bots: ${data.botsNumber}`),
			totalPLayersNumber: Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__totalPLayersNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], `Total players: ${data.totalPLayersNumber}`),
			voyeursNumber: Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__voyeursNumber',
				'lobbyView__lobbyFields__gameDataField__fields'], `Voyeurs: ${data.voyeursNumber}`),
			fieldSize: Block.Create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__fieldSize',
				'lobbyView__lobbyFields__gameDataField__fields'], `Field size: ${data.fieldSize} x ${data.fieldSize}`),
			// voyeurButton: ViewButton.Create({href: '/game'}, ['auth'], 'Play');
			playButton: ViewButton.Create({href: '/gameInfo'}, ['lobbyView__lobbyFields__gameDataField__fields__playButton',
				'lobbyView__lobbyFields__gameDataField__fields'], 'Play'),
		}
	}
}

