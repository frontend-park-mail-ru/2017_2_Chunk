'use strict';
import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


export default class ThreeView extends CommonView {
	constructor() {
		const gameContainer = Block.create('div');
		const playersDiv = Block.create('div', {}, ['gameDiv', 'gameDiv_right'], '');
		const clockDiv = Block.create('div', {}, ['clock'], '');
		const secondHand = Block.create('div', {}, ['timer', 'timer_animation'], '');
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
			this.playersDiv.el.classList.remove('gameDiv_right');
			this.playersDiv.el.classList.add('gameDiv_center');
			setTimeout(() => {
				this.playersDiv.setText('');
				this.playersDiv.hide();
				this.playersDiv.el.classList.remove('gameDiv_center');
				this.playersDiv.el.classList.add('gameDiv_right');
				this.bus.emit('goToLobby');//точка выхода из игры в меню
			}, 5000);
		});
		this.bus.on('beginClock', () => {
			this.clockDiv.show();
		});
		this.bus.on('clockStop', () => {
			this.secondHand.el.classList.remove('timer_animation');
		});
		this.bus.on('clockStart', () => {
			this.secondHand.el.classList.add('timer_animation');
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
