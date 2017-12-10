'use strict';

import eventBus from '../../../modules/eventBus';
import Block from '../../../blocks/block/block';
import backendWaitingAnimationHtml from './starLord/starLord'

new class BackendWaitingAnimation {
	constructor() {
		this.animationContainer = Block.create('div');
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
			this.animationContainer.hide();
			this.animationOff();
		});
	}


	animationOn() {
		this.animationContainer.el.classList.add('animation');
	}
	animationOff() {
		this.animationContainer.el.classList.remove('animation');
	}
}