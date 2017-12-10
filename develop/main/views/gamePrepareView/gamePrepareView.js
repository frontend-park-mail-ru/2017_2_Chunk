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
		// this.removeBot();
		this.whoIsItEvent();//работает дважды
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
			this.fields.playersList.clear();
			this.fields.header.clear();
		}
		this.clear = true;
	}


	removeGamePrepareListeners() {
		for (let listener in this.gamePrepareListeners) {
			this.bus.remove(listener, this.gamePrepareListeners[listener]);
		}
	}


	addPlayer() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.addPlayer.code}`, (response) => {
			this.fields.playersList.addPlayer(response.player);
			this.clear = false;
		});
	}


	addBot() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.addBot.code}`, (response) => {
			this.fields.playersList.addPlayer(response.player);
			this.clear = false;
		});
	}


	removePLayer() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.removePlayer.code}`, (response) => {
			// if (this.active) {
			this.fields.playersList.removePlayer(response.player.userID);
		});
	}


	// removeBot() {
	// 	this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.removePlayer.code}`, (response) => {
	// 		// if (this.active) {
	// 			this.fields.playersList.removePlayer(response.player.userID);
	// 	});
	// }


	kickPlayer() {

	}


	showViewEvents() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.createGame.code}`, (response) => {
			debugger;
			eventBus.emit('showMasterFields');
			this.fields.header.updateGameData(response.game);
		});
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.connectGame.code}`, () => {
			eventBus.emit('hideMasterFields');
			this.fields.header.updateGameData(response.game);
		})
	}

	gameStatusEvents() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.startGame.code}`, () => {
			this.bus.emit('goToGame');
		});
	};


	// updateGameData() {
	// 	// this.gamePrepareListeners[`${lobbyCodes.responseEventName}${lobbyCodes.getGameInfo.code}`] =
	// 		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.getGameInfo.code}`, (response) => {
	// 		this.fields.header.updateGameData(response.game);
	// 		this.clear = false;
	// 		this.gameInfo = response;
	// 		if (this.userID !== response.game.masterID) {
	// 			eventBus.emit('hideMasterFields');
	// 		}
	// 		else
	// 			eventBus.emit('showMasterFields');
	// 		response.game.gamers.forEach((gamer) => {
	// 			if (gamer.userID !== this.userID) {
	// 				this.fields.playersList.addPlayer(gamer);
	// 			}
	// 		});
	// 	});
	// }
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
		// 	= this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`, (response) => {
		// 	this.bus.emit('openLobby');
		// });
	}


	buttonsEvents() {
		// this.fields.addBot.on('click', () => {
		// 	const request = {
		// 		code: '108',
		// 		lvlbot: '3',
		// 	};
		// 	this.bus.emit(`${gamePrepareCodes.addBot.request}`, (request));
		// });
		// this.fields.startGame.on('click', () => {
		// 	const request = {
		// 		code: '105',
		// 	};
		// 	this.bus.emit(`${gamePrepareCodes.startGame.request}`, (request));
		// });
	}


	whoIsItEvent() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.whoIsIt.code}`, (response) => {
			this.userID = response.userID;
		});
	}
}
