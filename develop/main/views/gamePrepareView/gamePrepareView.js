'use strict';
import View from '../view/view';
import gamePrepareFields from './__fields/gamePrepareView__fields';
import eventBus from '../../modules/eventBus';
import messageCodes from '../../messageCodes/messageCodes';

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
		this.addPlayer();
		this.addBot();
		this.removePLayer();
		this.gameClose();
		this.gameStatusEvents();
		this.buttonsEvents();
		this.whoIsItEvent();
		// this.source = 'socket';
		this.hide();
	}


	show() {
		super.show();
		this.active = true;
	}


	hide() {
		super.hide();
		if (!this.clear) {
			this.fields.playersList.clear();
			this.fields.header.clear();
		}
		this.clear = true;
		this.active = false;
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
		this.bus.on(`${messageCodes.connectGame.internal}`, () => {
			this.updateGameData();
		});
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.startGame.code}`, () => {

			this.bus.emit('goToGame');
		});
	}


	updateGameData() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.getGameInfo.code}`, (response) => {
			this.fields.header.updateGameData(response.game);
			this.clear = false;
			this.gameInfo = response;
			response.game.gamers.forEach((gamer) => {
				if (gamer.userID !== this.userID) { this.fields.playersList.addPlayer(gamer); }
			});
		});
	}


	gameClose() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.gameDelete.code}`, (response) => {
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


	whoIsItEvent() {
		this.bus.on(`${messageCodes.responseEventName}${messageCodes.whoIsIt.code}`, (request) => {
			this.userID = request.userID;
		});
	}
}
