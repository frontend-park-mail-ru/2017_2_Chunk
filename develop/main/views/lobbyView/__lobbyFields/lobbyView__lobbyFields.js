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
	gameList: Block.create('main', {}, ['every-available', 'lobbyView__lobbyFields__gameList',
		'lobbyView__lobbyFields']),
	createGame: Block.create('button', {}, ['every-available', 'view__view-button',
		'view__view-button_theme-black-orange', 'lobbyView__lobbyFields__createGame',
		'lobbyView__lobbyFields'], 'create game'),
};

export default lobbyFields;