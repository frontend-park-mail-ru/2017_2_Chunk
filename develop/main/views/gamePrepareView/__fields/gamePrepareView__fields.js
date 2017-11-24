'use strict';


import ViewButton from '../../view/__view-button/view__view-button';
import Header from './__header/gamePrepareView__fields__header';
import PlayList from './__playersList/gamePrepareView__fields__playersList';
import Block from '../../../blocks/block/block';



/**
 * Поля лобби
 * @module gamePrepareFields
 */
const gamePrepareFields = {
	header: new Header(),
	playersList: new PlayList(),
	startGame: Block.create('div', {},
		['gamePrepareView__fields__starGameButton', 'view__view-button'], 'Start game'),
	addBot: Block.create('div', {},
		['gamePrepareView__fields__addBotButton', 'view__view-button'], 'Add bot'),
};

export default gamePrepareFields;