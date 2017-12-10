const lobbyCodes = {
	socketOpen: 'socketOpen',

	keepAlive: {
		code: 0,
	},
	subscribeLobbyUpdates: {
		code: 100,
	},
	unsubscribeLobbyUpdates: {
		code: 101,
	},
	getGamesFullList: {
		code: 102,
	},
	updateGame: {
		code: 120,
	},
	addGame: {
		code: 121,
	},
	deleteGame: {
		code: 122,
	},
	createGame: {
		code: 110,
	},
	connectGame: {
		code: 111,
	},

	requestEventName: 'request',
	responseEventName: 'response',
	close: 'Close',
	open: 'Open',

};


export default lobbyCodes;
