'use strict';

/**
 * Массив урлов и событий
 * @module routerFields
 */
const routerFields = [
	{
		url: '/menu',
		event: 'openMenu'
	},
	{
		url: '/exit',
		event: 'exit'
	},
	{
		url: '/game',
		event: 'openGame'
	},
	{
		url: '/profile',
		event: 'openUpdate'
	},
	{
		url: '/lobby',
		event: 'openLobby'
	},
	{
		url: '/waiting-hall',
		event: 'openWaitingHall'
	},

	{
		url: '/scoreboard',
		event: 'openScoreboard'
	},
	{
		url: '/rules',
		event: 'openRules'
	},
	{
		url: '/signup',
		event: 'openSignUp'
	},
	{
		url: '/login',
		event: 'openLogin'
	},
];

export default routerFields;
