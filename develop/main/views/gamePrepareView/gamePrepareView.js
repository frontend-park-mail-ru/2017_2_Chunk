'use strict';
import View from '../view/view';
import gamePrepareFields from './__fields/gamePrepareView__fields';
import eventBus from '../../modules/eventBus';


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
		this.active = false;
		this.addPlayer();
		this.addBot();
		this.removePLayer();
		this.gameClose();
		this.gameStatusEvents();
		this.buttonsEvents();
		this.whoIsItEvent();
		this.source = 'socket';
		this.hide();
	};


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
		this.bus.off('socketCode104');
	}


	//добавление пользователя
	addPlayer() {
		this.bus.on('socketCode101', (socketResponse) => {
			this.fields.playersList.addPlayer(socketResponse.player);
			this.clear = false;
			const socketRequest = {
				code: '104',
				gameID: socketResponse.gameID,
			};
			this.bus.emit('getGameInfo', socketRequest);
		});
	}


	addBot() {
		this.bus.on('socketCode108', (socketResponse) => {
			this.fields.playersList.addPlayer(socketResponse.player);
			this.clear = false;
			const socketRequest = {
				code: '104',
				gameID: socketResponse.gameID,
			};
			this.bus.emit('getGameInfo', socketRequest);
		})
	}


	//удаление пользователя
	removePLayer() {
		this.bus.on('socketCode103', (socketReceiveData) => {
			if (this.active) {
				this.fields.playersList.removePlayer(socketReceiveData.player.userID);
				const socketSendData = {
					code: '104',
					gameID: socketReceiveData.gameID
				};
				this.bus.emit('getGameInfo', socketSendData);
			}
		});
	}


	updateGameDataMaster() {
		this.bus.on('socketCode104', (socketReceiveData) => {
			this.fields.header.updateGameData(socketReceiveData.game);
			this.clear = false;
			this.gameInfo = socketReceiveData;
		});
	};


	updateGameDataSlave() {
		this.bus.on('socketCode104', (socketReceiveData) => {
			this.fields.header.updateGameData(socketReceiveData.game);
			this.clear = false;
			this.gameInfo = socketReceiveData;
			socketReceiveData.game.gamers.forEach((gamer) => {
				if (gamer.userID !== this.userID)
					this.fields.playersList.addPlayer(gamer);
			});
		});
	}


	gameClose() {
		this.bus.on('socketCode110', (socketReceiveData) => {
			this.bus.emit('openLobby');
		});
	};


	gameStatusEvents() {
		this.bus.on('connectGame', () => {
			this.updateGameDataSlave();
		});
		this.bus.on('createGame', () => {
			this.updateGameDataMaster();
		});
		this.bus.on('socketCode200', () => {
			this.bus.emit('goToGame');
		})
	}


	buttonsEvents() {
		this.fields.addBot.on('click', () => {
			const request = {
				code: '108',
				lvlbot: '1',
			};
			this.bus.emit(`${this.source}Message`, (request));
		});
		this.fields.startGame.on('click', () => {
			const request = {
				code: '105',
			};
			this.bus.emit(`${this.source}Message`, (request));
		});
	}


	whoIsItEvent() {
		this.bus.on('socketCode112', (socketResponse) => {
			this.userID = socketResponse.userID;
		});
	}
}
