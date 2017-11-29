'use strict';
import View from '../view/view';
import lobbyFields from './__lobbyFields/lobbyView__lobbyFields';
import LobbyGameData from './__lobbyFields/__gameDataField/lobbyView__lobbyFields__gameDataField';
import WebSocket from '../../modules/webSocket';
import WebWorker from '../../modules/webWorker';
import eventBus from '../../modules/eventBus';
import messageCodes from '../../messageCodes/messageCodes';


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
		this.gameCreateBannerEvent();
		this.socketEvent();
		this.hide();
	}


	show() {
		super.show();
		this.el.classList.remove('lobbyView_filter-smooth');
		if (navigator.onLine) {
			if (!this.webSocket) {
				this.webSocket = new WebSocket();
			}
		} else if (!this.webWorker) {
			this.webWorker = new WebWorker();
		}
	}


	addGameNode(data) {
		const lobbyGameData = new LobbyGameData(data);
		this.gameList[data.gameID] = lobbyGameData;
		this.elements.gameList.append(lobbyGameData);
	}


	removeGameNode(gameID) {
		// debugger;
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


	socketEvent() {
		this.lobbyUpdates();
		this.gameDelete();
		this.getGameFullList();
		this.socketClose();
	}


	lobbyUpdates() {
		// обновление информации о всех играх
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.lobbyUpdates.code}`, (response) => {
			if (this.gameList[response.game.gameID]) {
				this.updateGameNode(response.game);
			} else {
				this.addGameNode(response.game);
			}
		});
	}


	gameDelete() {
		// удаление игры
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.gameDelete.code}`, (response) => {
			this.removeGameNode(response.gameID);
		});
	}


	getGameFullList() {
		// подписываемся на получение всей информации об играх
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.getGamesFullList.code}`, (response) => {
			response.games.forEach((gameData) => {
				this.addGameNode(gameData);
			});
		});
	}


	socketClose() {
		// закрытие сокета, удаление всех игр
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.close}`, () => {
			if (this.webWorker) {
				delete this.webWorker;
			} else {
				delete this.webSocket;
			}
			for (const gameID in this.gameList) {
				this.removeGameNode(gameID);
			}
		});
	}
}
