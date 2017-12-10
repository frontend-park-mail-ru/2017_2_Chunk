const lobbyCodes = {
	keepAlive: {
		code: 0,
	},
	createGame: {
		code: 100,
		request: 'request',
		internal: 'createGame',
		tabMessage: '',
	},
	connectGamePLayer: {
		code: 101,
		tabMessage: 'New player',
	},
	connectGameWatcher: {
		code: 102,
		tabMessage: 'New watcher',
	},
	exitFromPreparingGame: {
		code: 103,
		tabMessage: '',
	},
	getGameInfo: {
		code: 104,
		tabMessage: '',
		request: 'request',
	},
	lobbyUpdates: {
		code: 106,
		tabMessage: 'Game create',
	},
	subscribeLobbyUpdates: {
		code: 106,
		tabMessage: '',
	},
	addBot: {
		code: 108,
		request: 'request',
		internal: 'addBot',
		tabMessage: '',
	},
	deleteGame: {
		code: 110,
		tabMessage: 'Game finish',
	},
	getGamesFullList: {
		code: 102,
		tabMessage: '',
	},
	whoIsIt: {
		code: 112,
		tabMessage: '',
	},
	startGame: {
		code: 200,
		request: 'request',
		tabMessage: 'Game start',
	},
	requestEventName: 'request',
	responseEventName: 'response',
	close: 'Close',
	open: 'Open',
	connectGame: {
		internal: 'connectGame',
		request: 'request',
	},
};


export default lobbyCodes;
