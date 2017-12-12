'use strict';
import View from '../view/view';
import lobbyFields from './__lobbyFields/lobbyView__lobbyFields';
import LobbyGameData from './__lobbyFields/__gameDataField/lobbyView__lobbyFields__gameDataField';
import WebSocket from '../../modules/webSocket';
import commonWorker from '../../modules/commonWorker';
import eventBus from '../../modules/eventBus';
import lobbyCodes from '../../messageCodes/lobbyCodes';
import tabMessage from '../../messageCodes/tabMessage';


/**
 * Класс секции меню
 * @module LoginView
 */
export default class LobbyView extends View {
	constructor() {
		super(lobbyFields);
		this.fields = lobbyFields;
		this.bus = eventBus;
		this.el.classList.add('lobbyView');
		this.gameList = {};
		this.socketListeners = {};
		this.isAuth();
		this.addSocketEvents();
		this.gameCreateBannerEvent();
		this.botWorkerClose();
		this.hide();
	}


	show() {
		super.show();
		this.socketOrWorkerCreate();
	}


	socketOrWorkerCreate() {
		this.el.classList.remove('lobbyView_filter-smooth');
		if (navigator.onLine && this.auth) {
			if (!this.webSocket) {
				this.webSocket = new WebSocket();
			}
			else
				this.bus.emit('addSocketEvents');
		} else {
			if (!this.botWorker) {
				this.botWorker = new commonWorker('./botWorker.js');
			}
			else
				this.bus.emit('addBotWorkerEvents');
		}
	}


	hide() {
		super.hide();
		this.removeSocketEvents();
		this.clearGameList();
	}


	isAuth() {
		this.bus.on('auth', () => {
			this.auth = true;
		});
		this.bus.on('unauth', () => {
			this.auth = false;
		})
	}


	updateGameNode(data) {
		const lobbyGameData = this.gameList[data.gameID];
		lobbyGameData.updateGameData(data);
	}


	gameCreateBannerEvent() {
		this.fields.createGame.on('click', () => {
			this.bus.emit('openCreateGameBanner');
		});
		this.bus.on('openCreateGameBanner', () => {
			this.el.classList.add('lobbyView_filter-smooth');
		});
		this.bus.on('closeCreateGameBanner', () => {
			this.el.classList.remove('lobbyView_filter-smooth');
		});
	}


	addSocketEvents() {
		this.socketOpen();
		this.socketClose();
		this.lobbyShowSocketEvents();
		this.gameStartEvents();
	}


	lobbyShowSocketEvents() {
		this.bus.on('addSocketEvents', () => {
			this.subscribeLobbyUpdates();
			this.deleteGame();
			this.addGame();
			this.updateGame();
			this.getGameFullList();
		});
	}


	socketOpen() {
		this.bus.on(`${lobbyCodes.socketOpen}`, () => {
			this.bus.emit('addSocketEvents');
		});
	}


	socketClose() {
		// закрытие сокета, удаление всех игр
		this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.close}`, () => {
			delete this.webSocket;
			for (const gameID in this.gameList) {
				this.removeGameNode(gameID);
				delete this.gameList;
			}
		});
	}


	gameStartEvents() {
		this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.createGame.code}`, () => {
			this.bus.emit('createGame');
			this.bus.emit('backendResponseReceived');
		});
		this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.connectGame.code}`, () => {
			this.bus.emit('connectGame');
			this.bus.emit('backendResponseReceived');
		});
	}


	subscribeLobbyUpdates() {
		const request = {
			code: `${lobbyCodes.subscribeLobbyUpdates.code}`
		};
		this.bus.emit(`${lobbyCodes.requestEventName}`, request);
	}


	updateGame() {
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.updateGame.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.updateGame.code}`, (response) => {
			this.updateGameNode(response);
		});
	}


	deleteGame() {
		// удаление игры
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.deleteGame.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.deleteGame.code}`, (response) => {
			this.removeGameNode(response.gameID);
		});
	}


	addGame() {
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.addGame.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.addGame.code}`, (response) => {
			this.addGameNode(response.game);
			if (Visibility.hidden()) {
				this.bus.emit(`${tabMessage.newGame.name}`, tabMessage.newGame.message);
			}
		});
	}


	addGameNode(data) {
		const lobbyGameData = new LobbyGameData(data);
		this.gameList[data.gameID] = lobbyGameData;
		this.elements.gameList.append(lobbyGameData);
	}


	removeGameNode(gameID) {
		const lobbyGameData = this.gameList[gameID];
		delete this.gameList[gameID];
		this.elements.gameList.remove(lobbyGameData);
	}


	getGameFullList() {
		// подписываемся на получение всей информации об играх
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.getGamesFullList.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.getGamesFullList.code}`, (response) => {
			response.games.forEach((gameData) => {
				this.addGameNode(gameData);
			});
		});
		const request = {
			code: `${lobbyCodes.getGamesFullList.code}`,
		};
		if (this.webSocket)
			this.bus.emit(`${lobbyCodes.requestEventName}`, request);
	}


	removeSocketEvents() {
		for (let listener in this.socketListeners) {
			this.bus.remove(`${listener}`, this.socketListeners[listener]);
		}
	}


	clearGameList() {
		for (const gameID in this.gameList) {
			this.removeGameNode(gameID);
			delete this.gameList;
		}
	}


	botWorkerClose() {
		this.bus.on(`worker${lobbyCodes.close}`, () => {
			delete this.botWorker;
		});
	}
}
