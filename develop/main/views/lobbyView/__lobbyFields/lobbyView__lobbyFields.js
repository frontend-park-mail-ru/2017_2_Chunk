'use strict';

import Block from '../../../blocks/block/block.js';
import ViewButton from '../../view/__view-button/view__view-button';


/**
 * Поля лобби
 * @module lobbyFields
 */
const lobbyFields = {
	header: Block.create('div', {}, ['every-available', 'lobbyView__lobbyFields__header',
		'lobbyView__lobbyFields'], 'Prepare games'),
	gameList: Block.create('div', {}, ['every-available', 'lobbyView__lobbyFields__gameList',
		'lobbyView__lobbyFields']),
	createGame: Block.create('button', {}, ['every-available', 'form__button', 'lobbyView__lobbyFields__createGame',
		'lobbyView__lobbyFields', 'button'], 'New game'),
};

export default lobbyFields;