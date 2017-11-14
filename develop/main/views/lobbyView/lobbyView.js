'use strict';
import View from '../view/view';
import lobbyFields from './__lobbyFields/lobbyView__lobbyFields';
import LobbyGameData from './__lobbyFields/__gameDataField/lobbyView__lobbyFields__gameDataField';
import GameCreateView from './__gameCreateView/lobbyView__gameCreateView'

/**
 * Класс секции меню
 * @module LoginView
 */
export default class LobbyView extends View {
	constructor(eventBus) {
		super(lobbyFields);
		this.fields = lobbyFields;
		this.bus = eventBus;
		this.el.classList.add('lobbyView');
		this.hide();
		this.gameList = {};
		//для тестов!!!
		const fields = {
			gameId: 0,
			playersNumber: 2,
			botsNumber: 2,
			totalPLayersNumber: 4,
			voyeursNumber: 0,
			fieldSize: 12,
		};

		const fields2 = {
			gameId: 1,
			playersNumber: 2,
			botsNumber: 2,
			totalPLayersNumber: 4,
			voyeursNumber: 0,
			fieldSize: 15,
		};

		const fields3 = {
			gameId: 1,
			playersNumber: 1,
			botsNumber: 1,
			totalPLayersNumber: 2,
			voyeursNumber: 0,
			fieldSize: 18,
		};


		this.addGameNode(fields);
		this.addGameNode(fields2);
		this.removeGameNode(fields.gameId);
		this.updateGameNode(fields3);
		this.addGameNode(fields);
		this.addGameNode(fields2);
		//конец тестов
		this.fields.createGame.on('click', () => {
			this.bus.emit('openCreateGameBanner');
		});

		this.bus.on('openCreateGameBanner', () => {
			this.el.classList.add('lobbyView_filter-smooth');
		});

		// this.bus.on('closeCreateGameBanner', () => {
		// 	this.el.classList.remove('lobbyView_filter-smooth');
		// })
	};

	addGameNode(data) {
		const lobbyGameData = new LobbyGameData(data);
		this.gameList[data.gameId] = lobbyGameData;
		this.elements.gameList.append(lobbyGameData);
	}

	removeGameNode(gameId) {
		const lobbyGameData = this.gameList[gameId];
		delete this.gameList[gameId];
		this.elements.gameList.remove(lobbyGameData);
	}

	updateGameNode(data) {
		const lobbyGameData = this.gameList[data.gameId];
		lobbyGameData.updateGameData(data);
	}
}

