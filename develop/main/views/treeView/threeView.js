'use strict';
import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


export default class ThreeView extends CommonView {
	constructor() {
		const gameContainer = Block.create('div');
		const winDiv = Block.create('div', {}, ['canvasView__winDiv'], '');
		super([gameContainer, winDiv]);
		this.el.style.setProperty('border', 'none');
		this.el.classList.add('treeView');
		this.winDiv = winDiv;
		this.winDiv.hide();
		this.bus = eventBus;
		this.bus.on('endOfGame', (win) => {
			if (win) {
				this.winDiv.setText('You win! =)');
			} else {
				this.winDiv.setText('You lose! =(');
			}
			this.winDiv.show();
			setTimeout(() => {
				this.winDiv.hide();
				this.bus.emit('goToMenu');//точка выхода из игры в меню
			}, 3000);
		});
		super.hide();
	}


	hide() {
		this.bus.emit('deleteTree');
		super.hide();
	}


	getElement() {
		return this.el;
	}
}
