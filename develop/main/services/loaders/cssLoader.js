'use strict';
import eventBus from '../../modules/eventBus';
import loaderHtml from './loaderHtml';


new class WaitingLoader {
	constructor() {
		this.start();
		this.musicStart();
	}


	start() {
		this.removeStartCssLoader();
	}


	removeStartCssLoader() {
		const startLoader = document.body.getElementsByClassName('startLoader')[0];
		eventBus.on('removeStartLoader', () => {
			document.body.removeChild(startLoader);
		});
	}


	musicStart() {
		this.audioPlaying = false;
		this.musicNode = document.createElement('div');
		this.musicNode.innerHTML = loaderHtml;
		document.body.appendChild(this.musicNode);
		this.audio = document.getElementById('audio');
		this.audioControl = document.getElementById('audio-control');
		this.audioControl.addEventListener('click', (event) => {
			this.audioControlHandler(event);
			}, false)
	}


	audioControlHandler(event) {
		const _self = event.target;
		debugger;
		if (!this.audioPlaying) {
			_self.classList.add('noVolume');
			this.audio.volume = 0;
		} else {
			_self.classList.remove('noVolume');
			this.audio.volume = 1;
		}
		this.audioPlaying = !this.audioPlaying;
	}
};




