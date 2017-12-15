'use strict';
import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


export default class ThreeView extends CommonView {
	constructor() {
		const gameContainer = Block.create('div');
		const playersDiv = Block.create('div', {}, ['gameDiv'], '');
		super([gameContainer, playersDiv]);
		this.el.style.setProperty('border', 'none');
		this.el.classList.add('treeView');
		this.playersDiv = playersDiv;
		this.playersDiv.hide();
		this.bus = eventBus;
		this.clear = true;
		this.bus.on('beginPlaying', () => {
			this.playersDiv.show();
		});
		this.bus.on('changePlayerDiv', (text) => {
			this.playersDiv.setText(text);
		});
		this.bus.on('endOfGame', () => {
			setTimeout(() => {
				this.playersDiv.hide();
				this.bus.emit('goToLobby');//точка выхода из игры в меню
			}, 3000);
		});
		super.hide();
	}


	hide() {
		if (!this.clear) {
			this.bus.emit('deleteTree');
			this.clear = true;
		}
		super.hide();
	}


	show() {
		this.clear = false;
		super.show();
	}

	getElement() {
		return this.el;
	}
}
