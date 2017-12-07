'use strict';
import eventBus from '../../../modules/eventBus';
import audioLoaderHtml from './musicPlayerHtml';
import playlist from './playlist';


new class MusicPlayer {
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
		this.musicNode.innerHTML = audioLoaderHtml;
		document.body.appendChild(this.musicNode);
		this.backgroundaudio = document.getElementById('backgroundaudio');
		this.audio = new Audio();
		this.audio.volume = 0.3;
		this.audio.type = 'audio/mpeg';
		this.audio.autoplay = 'autoplay';
		this.audioControl = document.getElementById('audio-control');
		this.audioControl.addEventListener('click', (event) => {
			this.audioControlHandler(event);
		}, false);
		this.backgroundaudio.appendChild(this.audio);
		this.nextSong();
		this.videoEvents();
	}


	audioControlHandler(event) {
		const _self = event.target;
		if (!this.audioPlaying) {
			_self.classList.add('noVolume');
			this.audio.volume = 0;
		} else {
			_self.classList.remove('noVolume');
			this.audio.volume = 0.3;
		}
		this.audioPlaying = !this.audioPlaying;
	}


	nextSong() {
		this.songNumber = Math.round(Math.random() * 0.4);
		const songUrl = playlist[this.songNumber].url;
		this.audio.pause();
		this.audio.src = songUrl;
		this.audio.load();
	}


	// backendWaitingLoader() {
	// 	this.backendWaitingLoaderNode = document.createElement('div');
	// 	this.backendWaitingLoaderNode.classList.add('backendWaitingLoader');
	// 	this.backendWaitingLoaderNode.innerHTML = backendWaitingLoaderHtml;
	// eventBus.on('backendRequest', () => {
	// 	document.body.appendChild(this.backendWaitingLoaderNode);
	// 	debugger;
	// });
	// eventBus.on('backendResponse', () => {
	// 	document.body.removeChild(this.backendWaitingLoaderNode);
	// });
	// };
	videoEvents() {
		eventBus.on('videoPlay', () => {
			if (this.audio.volume > 0)
				this.audio.volume = 0.1;
		});
		eventBus.on('videoPause', () => {
			if (this.audio.volume > 0)
				this.audio.volume = 0.3;
		})
	}
};






