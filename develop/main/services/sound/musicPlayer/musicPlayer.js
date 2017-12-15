'use strict';
import eventBus from '../../../modules/eventBus';
import Block from '../../../blocks/block/block';
import audioLoaderHtml from './musicPlayerHtml';
import playlist from './playlist';
import controlButtons from './__controls/musicPlayer__controlsHtml';


export default class MusicPlayer {
	constructor() {
		this.start();
		this.random = false;
		this.previousSongs = [];
		this.lastSong = true;
	}


	start() {
		this.onJSReady();
	}


	onJSReady() {
		eventBus.on('JSReady', () => {
			this.musicStart();
		})
	}





	musicStart() {
		this.audioSettings();
		this.audioControlsSettings();
		this.numberOfSongs = playlist.length;
		// this.nextSongRandom();
		this.songNumber = 16;
		this.previousSongs.push(this.songNumber);
		this.currentSongPosition = this.previousSongs.length - 1;
		this.setSongByNumber(this.songNumber);
		this.videoEvents();
	}


	audioSettings() {
		this.musicNode = document.createElement('div');
		this.musicNode.innerHTML = audioLoaderHtml;
		document.body.appendChild(this.musicNode);
		this.backgroundaudio = document.getElementById('backgroundaudio');
		this.audio = new Audio();
		this.audio.volume = 0.5;
		this.volume = true;
		this.audio.type = 'audio/mpeg';
		this.audio.autoplay = 'autoplay';
		this.play = true;
		this.backgroundaudio.appendChild(this.audio);
		this.audio.onended = () => {
			this.onEndedSong()
		};
	}


	audioControlsSettings() {
		this.muteHandler();
		this.songControlsHandler();
	}


	muteHandler() {
		this.audioControlVolume = document.getElementById('audio-control');
		this.audioControlVolume.addEventListener('click', (event) => {
			event.preventDefault();
			this.audioControlHandler(event);
		}, false);
		this.appendControlButtons();
		this.songControlsHandler();
	}


	appendControlButtons() {
		this.controlButtons = Block.create('div', {}, ['controlButtons']);
		this.controlButtons.el.innerHTML = controlButtons;
		this.backgroundaudio.appendChild(this.controlButtons.el);
	};


	audioControlHandler(event) {
		const audioAnimation = document.getElementById('audio-control');
		event.preventDefault();
		if (this.volume) {
			audioAnimation.classList.add('noVolume');
			this.audio.volume = 0;
		} else {
			if (this.play) {
				audioAnimation.classList.remove('noVolume');
				this.audio.volume = 0.6;
			}
		}
		this.volume = !this.volume;
	}


	songControlsHandler() {
		this.onNextSongClick();
		this.onPreviousSongClick();
		this.onPauseClick();
		this.onPlayClick();
		this.onRandomClick();
	}


	onNextSongClick() {
		const nextSongButtons = this.controlButtons.el.getElementsByClassName('player-button-next')[0];
		nextSongButtons.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopImmediatePropagation();
			this.setNextSong();
		})
	}

	setNextSong() {
		if ((this.previousSongs.length - 1) === this.currentSongPosition) {
			if (this.random)
				this.nextSongRandom();
			else
				this.nextSong();
			this.previousSongs.push(this.songNumber);
			this.currentSongPosition = this.previousSongs.length - 1;
		}
		else {
			this.currentSongPosition++;
			this.setSongByNumber(this.previousSongs[this.currentSongPosition]);
		}
	}


	nextSongRandom() {
		this.songNumber = Math.round(Math.random() * (this.numberOfSongs - 1));
		this.setSongByNumber(this.songNumber);
	}


	onEndedSong() {
		this.setNextSong();
	}


	nextSong() {
		this.songNumber++;
		this.songNumber = this.songNumber % this.numberOfSongs;
		this.setSongByNumber(this.songNumber);
	}


	setSongByNumber(songNumber) {
		console.log('song number: ', songNumber);
		const songUrl = playlist[songNumber].url;
		this.audio.pause();
		this.audio.src = songUrl;
		this.audio.load();
	}


	onPreviousSongClick() {
		const previousSongButton = this.controlButtons.el.getElementsByClassName('player-button-prev')[0];
		previousSongButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopImmediatePropagation();
			this.previousSong();
		})
	}


	previousSong() {
		if (this.currentSongPosition) {
			this.currentSongPosition--;
			this.setSongByNumber(this.previousSongs[this.currentSongPosition]);
		}
	}


	onPauseClick() {
		const pauseButton = this.controlButtons.el.getElementsByClassName('player-button-pause')[0];
		const playButton = this.controlButtons.el.getElementsByClassName('player-button-play')[0];
		pauseButton.addEventListener('click', (event) => {
			event.preventDefault();
			pauseButton.classList.remove('paused');
			playButton.classList.remove('paused');
			const audioAnimation = document.getElementById('audio-control');
			audioAnimation.classList.add('noVolume');
			this.audio.pause();
			this.play = false;
		})
	};


	onPlayClick() {
		const pauseButton = this.controlButtons.el.getElementsByClassName('player-button-pause')[0];
		const playButton = this.controlButtons.el.getElementsByClassName('player-button-play')[0];
		playButton.addEventListener('click', () => {
			pauseButton.classList.add('paused');
			playButton.classList.add('paused');
			const audioAnimation = document.getElementById('audio-control');
			audioAnimation .classList.remove('noVolume');
			this.audio.play();
			this.play = true;
		})
	};


	onRandomClick() {
		const randomButton = this.controlButtons.el.getElementsByClassName('player-button-random')[0];
		randomButton.addEventListener('click', () => {
			event.preventDefault();
			event.stopImmediatePropagation();
			if (!this.random) {
				randomButton.classList.add(('random-play'));
				this.random = true;
			}
			else {
				randomButton.classList.remove(('random-play'));
				this.random = false;
			}
		})
	}


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






