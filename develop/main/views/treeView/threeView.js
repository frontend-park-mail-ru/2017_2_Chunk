'use strict';
import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


export default class ThreeView extends CommonView {
	constructor() {
		const gameContainer = Block.create('div');
		const playersDiv = Block.create('div', {}, ['gameDiv'], '');
		const clockDiv = Block.create('div', {}, ['clock'], '');
		const secondHand = Block.create('div', {}, ['button25'], '');
		super([gameContainer, playersDiv, clockDiv, secondHand]);
		this.el.style.setProperty('border', 'none');
		this.el.classList.add('treeView');
		clockDiv.append(secondHand);
		this.playersDiv = playersDiv;
		this.playersDiv.hide();
		this.clockDiv = clockDiv;
		this.clockDiv.hide();
		this.secondHand = secondHand;
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
				this.playersDiv.setText('');
				this.playersDiv.hide();
				this.bus.emit('goToLobby');//точка выхода из игры в меню
			}, 3000);
		});
		this.bus.on('beginClock', () => {
			this.clockDiv.show();
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
