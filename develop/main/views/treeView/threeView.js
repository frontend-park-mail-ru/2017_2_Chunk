'use strict';
import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


//тоже уродский класс. надо почистить
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
		this.clear = true;
		this.bus.on('endOfGame', (win) => {
			if (win) {
				this.winDiv.setText('You win! =)');
			} else {
				this.winDiv.setText('You lose! =(');
			}
			this.winDiv.show();
			setTimeout(() => {
				this.winDiv.hide();
				//нужно переделать, надо подумать как
				this.bus.emit('goToLobby');//точка выхода из игры в меню
			}, 3000);
		});
		super.hide();
	}


	hide() {
		if (!this.clear) {
			console.log("DELETEEE");
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
