'use strict';
import View from '../view/view';
import gamePrepareFields from './__fields/gamePrepareView__fields';
import eventBus from '../../modules/eventBus';
import gamePrepareCodes from '../../messageCodes/gamePrepareCodes';


/**
 * Класс секции ожидания набора игроков
 * @module GamePrepareView
 */
export default class gamePrepareView extends View {
	constructor() {
		super(gamePrepareFields);
		this.fields = gamePrepareFields;
		this.bus = eventBus;
		this.el.classList.add('gamePrepareView');
		this.clear = false;
		this.gamePrepareListeners = {};
		this.events();
		this.hide();
		eventBus.emit('hideMasterFields');
	}


	events() {
		this.masterEvents();
		this.addPlayer();
		this.addBot();
		this.removePLayer();
		this.removeBot();
		this.buttonsEvents();
		this.gameStatusEvents();
		this.showViewEvents();
	}


	show() {
		super.show();
		this.clear = false;
	}


	hide() {
		this.removeGamePrepareListeners();
		super.hide();
		if (!this.clear) {
			setTimeout(() => {
				this.fields.playersList.clear();
				this.fields.header.clear();
			}, 300);
		}
		this.clear = true;
	}


	removeGamePrepareListeners() {
		for (let listener in this.gamePrepareListeners) {
			this.bus.remove(listener, this.gamePrepareListeners[listener]);
		}
	}


	showViewEvents() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.createGame.code}`, (response) => {
			eventBus.emit('showMasterFields');
			this.fields.header.updateGameData(response.game);
			this.fields.playersList.addMaster(response.game.realPlayers[0]);
			this.whoIsItEvent();
		});
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.connectGame.code}`, () => {
			eventBus.emit('hideMasterFields');
			this.fields.header.updateGameData(response.game);
			this.whoIsItEvent();
		})
	}


	gameStatusEvents() {
		// this.eventBus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.startGame.code}`, () => {
		this.bus.on(`${gamePrepareCodes.responseEventName}200`, () => {
			this.bus.emit('goToGame');
		});
	};


	updateGameData() {
		this.addPlayer();
		this.removePLayer();
		this.addBot();
		this.removeBot();
	};


	addPlayer() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.addPlayer.code}`, (response) => {
			this.fields.playersList.addPlayer(response.player);
			this.clear = false;
		});
	}


	removePLayer() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.removePlayer.code}`, (response) => {
			if (this.userID === response.userID)
				this.exitToLobby();
			else
				this.fields.playersList.removePlayer(response.userID);
		});
	}


	addBot() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.addBot.code}`, (response) => {
			this.fields.playersList.addBot(response);
			this.fields.header.addBot();
			this.clear = false;
		});
	}


	removeBot() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.removeBot.code}`, (response) => {
			this.fields.playersList.removeBot(response.userID);
			this.fields.header.removeBot();
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
		// this.gamePrepareListeners[`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`]
		// 	= this.eventBus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`, (response) => {
		// 	this.eventBus.emit('openLobby');
		// });
	}


	buttonsEvents() {
		this.fields.addBot.on('click', () => {
			const request = {
				code: `${gamePrepareCodes.addBot.code}`,
				lvlbot: '3',
			};
			this.bus.emit(`${gamePrepareCodes.requestEventName}`, (request));
		});
		this.fields.startGame.on('click', () => {
			const request = {
				code: `${gamePrepareCodes.startGame.code}`,
			};
			this.bus.emit(`${gamePrepareCodes.requestEventName}`, (request));
		});
	}


	exitToLobby() {
		eventBus.emit('goToLobby');
		eventBus.emit('backendResponseReceived');
	}


	whoIsItEvent() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.whoIsIt.code}`, (response) => {
			this.userID = response.userID;
		});
		const request = {
			code: `${gamePrepareCodes.whoIsIt.code}`,
		};
		this.bus.emit(`${gamePrepareCodes.requestEventName}`, request);
	}
}
