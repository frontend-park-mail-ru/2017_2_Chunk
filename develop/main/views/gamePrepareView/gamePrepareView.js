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

		this.bus.on('socketCode101', (socketReceiveData) => {
			this.fields.playersList.addPlayer(socketReceiveData.player);
			const socketSendData = {
				code: '104',
				gameID: socketReceiveData.gameID,
			};
			debugger;
			this.bus.emit('getGameInfo', socketSendData);
		});

		this.bus.on('socketCode104', (socketReceiveData) => {
			debugger;
			this.fields.header.updateGameData(socketReceiveData);
		});

		this.bus.on('socketClose', () => {
			this.hide();
		});
	};

	hide() {
		super.hide();
		this.fields.playersList.clear();
		this.fields.header.clear();
	}
}
