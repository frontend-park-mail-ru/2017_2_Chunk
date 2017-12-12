'use strict';
import eventBus from '../../../modules/eventBus';
import Block from '../../../blocks/block/block';
import backendWaitingAnimationHtml from './starLord/starLordHtml'


new class BackendWaitingAnimation {
	constructor() {
		this.animationContainer = Block.create('div', {'id': 'starlord'}, ['stripe']);
		this.animationContainer.el.innerHTML = backendWaitingAnimationHtml;
		document.body.appendChild(this.animationContainer.el);
		this.animationContainer.hide();
		this.waitingBackend();
		this.backendResponseReceived();
	}


	waitingBackend() {
		eventBus.on('waitingBackend', () => {
			this.animationContainer.show();
			this.animationOn();
		});
	}


	backendResponseReceived() {
		eventBus.on('backendResponseReceived', () => {
			setTimeout(() => {
				this.animationContainer.hide();
				this.animationOff();
				this.opacityAnimationOff();
			}, 1000);
			this.opacityAnimationOn();
		});
	}


	animationOn() {
		this.animationContainer.el.classList.add('animation');
	}


	animationOff() {
		this.animationContainer.el.classList.remove('animation');
	}


	opacityAnimationOn() {
		const container = this.animationContainer.el.getElementsByClassName('container')[0];
		container.classList.add('opacityAnimation');
	}


	opacityAnimationOff() {
		const container = this.animationContainer.el.getElementsByClassName('container')[0];
		container.classList.remove('opacityAnimation');
	}
};