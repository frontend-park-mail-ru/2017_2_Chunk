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
		this.source = navigator.onLine ? 'socket' : 'worker';
		this.bus = eventBus;
		this.el.classList.add('lobbyView');
		this.gameList = {};
		this.socketListeners = {};
		this.isAuth();
		this.gameCreateBannerEvent();
		this.socketClose();
		this.botWorkerClose();
		this.hide();
	}


	show() {
		this.addSocketEvent();
		super.show();
		this.el.classList.remove('lobbyView_filter-smooth');
		if (navigator.onLine && this.auth) {
			if (!this.webSocket) {
				this.webSocket = new WebSocket();
			}
		} else if (!this.botWorker) {
			this.botWorker = new commonWorker('./botWorker.js');
		}
	}


	hide() {
		super.hide();
		this.removeSocketEvent();
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


	addSocketEvent() {
		this.lobbyUpdates();
		this.gameDelete();
		this.getGameFullList();
	}


	removeSocketEvent() {
		for (let listener in this.socketListeners) {
			this.bus.remove(`${listener}`, this.socketListeners[listener]);
		}
	}


	lobbyUpdates() {
		// обновление информации о всех играх
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.lobbyUpdates.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.lobbyUpdates.code}`, (response) => {
			if (Visibility.hidden()) {
				this.bus.emit(`${tabMessage.newGame.name}`, tabMessage.newGame.message);
			}
			if (this.gameList[response.game.gameID]) {
				this.updateGameNode(response.game);
			} else {
				this.addGameNode(response.game);
			}
		});
	}


	gameDelete() {
		// удаление игры
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.deleteGame.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.deleteGame.code}`, (response) => {
			this.removeGameNode(response.gameID);
		});
	}


	getGameFullList() {
		// подписываемся на получение всей информации об играх
		this.socketListeners[`${lobbyCodes.responseEventName}${lobbyCodes.getGamesFullList.code}`]
			= this.bus.on(`${lobbyCodes.responseEventName}${lobbyCodes.getGamesFullList.code}`, (response) => {
			response.games.forEach((gameData) => {
				this.addGameNode(gameData);
			});
		});
	}


	clearGameList() {
		for (const gameID in this.gameList) {
			this.removeGameNode(gameID);
			delete this.gameList;
		}
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


	botWorkerClose() {
		this.bus.on(`worker${lobbyCodes.close}`, () => {
			delete this.botWorker;
		});
	}
}
