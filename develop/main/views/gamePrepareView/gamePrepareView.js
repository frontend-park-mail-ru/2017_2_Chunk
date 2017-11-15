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

		this.bus.on('socketCode101', (data) => {
			debugger;
			this.fields.header.updateGameData(data);
			this.fields.playersList.addPlayer(data.player);
		})
	};

	hide() {
		super.hide();
		this.fields.playersList.clear();
		this.fields.header.clear();
	}
}
