'use strict';


import ViewButton from '../../view/__view-button/view__view-button';
import Header from './__header/gamePrepareView__fields__header';
import PlayList from './__playersList/gamePrepareView__fields__playersList';



/**
 * Поля лобби
 * @module gamePrepareFields
 */
const gamePrepareFields = {
	header: new Header(),
	playersList: new PlayList(),
	startGame: ViewButton.Create({href: '/game'},
		['gamePrepareView__fields__starGameButton'], 'Start game'),
};

export default gamePrepareFields;