'use strict';
import View from '../view/view';
import GamePrepareFields from './__fields/gamePrepareView__fields';
import eventBus from '../../modules/eventBus';
import gamePrepareCodes from '../../messageCodes/gamePrepareCodes';
import gameCodes from '../../messageCodes/gameCodes';


/**
 * Класс секции ожидания набора игроков
 * @module GamePrepareView
 */
export default class gamePrepareView extends View {
	constructor() {
		const gamePrepareFields = new GamePrepareFields();
		super(gamePrepareFields.gamePrepareFields);
		this.gamePrepareFields = gamePrepareFields;
		this.fields = this.gamePrepareFields.gamePrepareFields;
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
		this.exitFromGame();
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
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.connectGame.code}`, (response) => {
			eventBus.emit('hideMasterFields');
			this.fields.header.updateGameData(response.game);
			this.whoIsItEvent();
			// eventBus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.whoIsIt.code}`, () => {
			this.addPlayers(response.game.realPlayers);
			this.addBots(response.game.botPlayers);
			// })
		})
	}


	addPlayers(players) {
		players.forEach((player) => {
			this.fields.playersList.addPlayer(player);
			this.clear = false;
		});
	}


	addBots(bots) {
		bots.forEach((bot) => {
			this.fields.playersList.addPlayer(bot);
			this.clear = false;
		});
	}


	gameStatusEvents() {
		// this.eventBus.on(`${gamePrepareCodes.responseEventName}, () => {
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
			this.fields.playersList.addPlayer(response);
			this.fields.header.addPlayer();
			this.clear = false;
		});
	}


	removePLayer() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.removePlayer.code}`, (response) => {
			if (this.userID === response.userID)
				this.exitToLobby();
			else {
				this.fields.playersList.removePlayer(response.userID);
				this.fields.header.removePlayer();
			}
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
		eventBus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.changeMaster.code}`, (data) => {
			if (data.masterID === this.userID) {
				eventBus.emit('showMasterFields', (data.masterID));
			}
		})
	}


	hideMasterFields() {
		this.fields.startGame.hide();
		this.fields.addBotBlock.hide();
		this.fields.playersList.el.style.setProperty('margin-bottom', '20px');
		this.fields.addBotBlock.el.style.setProperty('display', 'none');
	}


	showMasterFields() {
		this.fields.startGame.show();
		this.fields.addBotBlock.show();
		this.fields.playersList.el.style.setProperty('margin-bottom', '0');
		this.fields.addBotBlock.el.style.setProperty('display', 'flex');
	}


	gameClose() {
		// this.gamePrepareListeners[`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`]
		// 	= this.eventBus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.deleteGame.code}`, (response) => {
		// 	this.eventBus.emit('openLobby');
		// });
	}


	buttonsEvents() {
		const botButton = Array.from(this.fields.addBotBlock.el.getElementsByClassName('gamePrepareView__fields__addBotButton'))[0];
		botButton.addEventListener('click', () => {
			console.log(this);
			const request = {
				code: `${gamePrepareCodes.addBot.code}`,
				botlvl: `${this.gamePrepareFields.lvlBotValue}`,
			};
			if (this.gamePrepareFields.lvlBotValue)
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


	exitFromGame() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gameCodes.playerOffline.code}`, (response) => {
			if (this.userID === response.player.userID)
				this.exitToLobby();
		})
	}


	whoIsItEvent() {
		this.bus.on(`${gamePrepareCodes.responseEventName}${gamePrepareCodes.whoIsIt.code}`, (response) => {
			this.userID = response.userID;
			eventBus.emit('IAm', this.userID);
		});
		const request = {
			code: `${gamePrepareCodes.whoIsIt.code}`,
		};
		this.bus.emit(`${gamePrepareCodes.requestEventName}`, request);
	}
}