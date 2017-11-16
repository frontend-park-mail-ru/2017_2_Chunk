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
		this.hide();

		this.addPlayer();
		this.removePLayer();

		this.bus.on('socketClose', () => {
			this.hide();
		});

		this.bus.on('connectGame', () => {
			this.updateGameDataSlave();
		});
		this.bus.on('createGame', () => {
			this.updateGameDataMaster();
		});
	};

	hide() {
		super.hide();
		this.fields.playersList.clear();
		this.fields.header.clear();
		this.bus.off('socketCode104');
	}


	//добавление пользователя
	addPlayer() {
		this.bus.on('socketCode101', (socketReceiveData) => {
			this.fields.playersList.addPlayer(socketReceiveData.player);
			const socketSendData = {
				code: '104',
				gameID: socketReceiveData.gameID,
			};
			this.bus.emit('getGameInfo', socketSendData);
		});
	}

	//удаление пользователя
	removePLayer() {
		this.bus.on('socketCode103', (socketReceiveData) => {
			this.fields.playersList.removePlayer(socketReceiveData.player);
			const socketSendData = {
				code: '104',
				gameID: socketReceiveData.gameID,
			};
			this.bus.emit('getGameInfo', socketSendData);
		});
	}


	updateGameDataMaster() {
		this.bus.on('socketCode104', (socketReceiveData) => {
			this.fields.header.updateGameData(socketReceiveData);
		});
	};


	updateGameDataSlave() {
		debugger;
		this.bus.on('socketCode104', (socketReceiveData) => {
			this.fields.header.updateGameData(socketReceiveData);
			debugger;
			socketReceiveData.game.gamers.forEach((gamer) => {
				this.fields.playersList.addPlayer(gamer);
			});
		});
	}

}
