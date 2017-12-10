'use strict';
import View from '../view/view';
import gamePrepareFields from './__fields/gamePrepareView__fields';
import eventBus from '../../modules/eventBus';
import messageCodes from '../../messageCodes/lobbyCodes';


/**
 * Класс секции ожидания набора игроков
 * @module GamePrepareView
 */
export default class gamePrepareView extends View {
	constructor() {
		super(gamePrepareFields);
		this.source = navigator.onLine ? 'socket' : 'worker';
		this.fields = gamePrepareFields;
		this.bus = eventBus;
		this.el.classList.add('gamePrepareView');
		this.clear = false;
		this.active = false;
		this.gamePrepareListeners = {};
		this.masterEvents();
		this.addPlayer();
		this.addBot();
		this.removePLayer();
		this.whoIsItEvent();//работает дважды
		this.buttonsEvents();
		this.gameStatusEvents();
		// this.source = 'socket';
		this.hide();
		eventBus.emit('hideMasterFields');
	}


	show() {
		this.addGamePrepareListeners();
		super.show();
		this.active = true;
		this.clear = false;
	}


	hide() {
		this.removeGamePrepareListeners();
		super.hide();
		if (!this.clear) {
			this.fields.playersList.clear();
			this.fields.header.clear();
		}
		this.clear = true;
		this.active = false;
	}


	addGamePrepareListeners() {
		this.gameClose();
	}


	removeGamePrepareListeners() {
		for (let listener in this.gamePrepareListeners) {
			this.bus.remove(listener, this.gamePrepareListeners[listener]);
		}
	}


	// добавление пользователя
	addPlayer() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.connectGamePLayer.code}`, (response) => {
			this.fields.playersList.addPlayer(response.player);
			this.clear = false;
			const request = {
				code: '104',
				gameID: response.gameID,
			};
			this.bus.emit(`${messageCodes.getGameInfo.request}`, request);
		});
	}


	addBot() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.addBot.code}`, (response) => {
			this.fields.playersList.addPlayer(response.player);
			this.clear = false;
			const request = {
				code: '104',
				gameID: response.gameID,
			};
			this.bus.emit(`${messageCodes.getGameInfo.request}`, request);
		});
	}


	// удаление пользователя
	removePLayer() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.exitFromPreparingGame.code}`, (response) => {
			if (this.active) {
				this.fields.playersList.removePlayer(response.player.userID);
				const request = {
					code: '104',
					gameID: response.gameID
				};
				this.bus.emit(`${messageCodes.getGameInfo.request}`, request);
			}
		});
	}


	gameStatusEvents() {
		this.updateGameData();
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.startGame.code}`, () => {
			this.bus.emit('goToGame');
		});
	};


	updateGameData() {
		// this.gamePrepareListeners[`${messageCodes.responseEventName}${messageCodes.getGameInfo.code}`] =
			this.bus.on(`${messageCodes.responseEventName}${messageCodes.getGameInfo.code}`, (response) => {
			this.fields.header.updateGameData(response.game);
			this.clear = false;
			this.gameInfo = response;
			if (this.userID !== response.game.masterID) {
				eventBus.emit('hideMasterFields');
			}
			else
				eventBus.emit('showMasterFields');
			response.game.gamers.forEach((gamer) => {
				if (gamer.userID !== this.userID) {
					this.fields.playersList.addPlayer(gamer);
				}
			});
		});
	}


	masterEvents() {
		eventBus.on('hideMasterFields', () => {
			this.hideMasterFields();
		});
		eventBus.on('showMasterFields', () => {
			this.showMasterFields();
		});
	}


	hideMasterFields() {
		this.fields.startGame.hide();
		this.fields.addBot.hide();
	}

	showMasterFields() {
		this.fields.startGame.show();
		this.fields.addBot.show();
	}

	gameClose() {
		this.gamePrepareListeners[`${messageCodes.responseEventName}${messageCodes.deleteGame.code}`]
			= this.bus.on(`${messageCodes.responseEventName}${messageCodes.deleteGame.code}`, (response) => {
			this.bus.emit('openLobby');
		});
	}


	buttonsEvents() {
		this.fields.addBot.on('click', () => {
			const request = {
				code: '108',
				lvlbot: '3',
			};
			this.bus.emit(`${messageCodes.addBot.request}`, (request));
		});
		this.fields.startGame.on('click', () => {
			const request = {
				code: '105',
			};
			this.bus.emit(`${messageCodes.startGame.request}`, (request));
		});
	}


//удалить обработчик при включении игры
	whoIsItEvent() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.whoIsIt.code}`, (request) => {
			this.userID = request.userID;
		});
	}
}
