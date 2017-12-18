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
		this.numberOfSongs = playlist.length;
		this.previousSongs.push(this.songNumber);
		this.currentSongPosition = this.previousSongs.length - 1;
		this.videoEvents();
	}


	audioSettings() {
		this.musicNode = document.createElement('div');
		this.musicNode.innerHTML = audioLoaderHtml;
		document.body.appendChild(this.musicNode);
		this.backgroundaudio = document.getElementById('backgroundaudio');
		this.audio = new Audio();
		this.audioControlsSettings();
		this.getLastConfiguration();
		this.audio.type = 'audio/mpeg';
		this.audio.autoplay = 'autoplay';
		this.backgroundaudio.appendChild(this.audio);
		this.audio.onended = () => {
			this.onEndedSong()
		};
	}


	getLastConfiguration() {
		let configure = false;
		this.maxAudioVolume = 0.5;
		if (localStorage.getItem('lastConfiguration')) {
			configure = true;
			this.volume = +localStorage.getItem('volume');
			this.play = +localStorage.getItem('audioIsPlay');
			this.songNumber = +localStorage.getItem('songNumber');
			this.currentTime = +localStorage.getItem('audioCurrentTime');
			this.random = +localStorage.getItem('audioRandom');
		}
		else {
			localStorage.setItem('lastConfiguration', 'true');
			this.volume = 1;
			localStorage.setItem('volume', '1');
			this.currentTime = 0.0;
			localStorage.setItem('audioCurrentTime', `${this.currentTime}`);
			this.songNumber = 16;
			this.random = 0;
			localStorage.setItem('audioRandom', '0');
			this.play = 1;
		}
		this.setConfiguration(configure);
	}


	setConfiguration(configure) {
		this.setCurrentTrackDot();
		if (configure) {
			if (this.volume) {
				this.audio.volume = this.maxAudioVolume;
			}
			else {
				this.audio.volume = 0;
				if (this.play) {
					this.audioControlVolume.classList.add('noVolume');
				}
			}
		}
		else {
			this.audio.volume = this.maxAudioVolume;
		}
		if (this.random) {
			this.setRandom();
		}
	}


	setCurrentTrackDot() {
		this.setSongByNumber(this.songNumber);
		this.audio.currentTime = this.currentTime;
		if (this.play)
			this.setPlay();
		else
			this.setPause();
		setInterval(() => {
			localStorage.setItem('audioCurrentTime', `${this.audio.currentTime}`);
		}, 2000)
	}


	audioControlsSettings() {
		this.muteHandler();
		this.songControlsHandler();
	}


	muteHandler() {
		this.audioControlVolume = document.getElementById('audio-control');
		this.audioControlVolume.classList.add('noVolume');
		this.audioControlVolume.addEventListener('click', (event) => {
			event.preventDefault();
			this.audioControlHandler();
		}, false);
		this.appendControlButtons();
		this.songControlsHandler();
	}


	appendControlButtons() {
		this.controlButtons = Block.create('div', {}, ['controlButtons']);
		this.controlButtons.el.innerHTML = controlButtons;
		this.backgroundaudio.appendChild(this.controlButtons.el);
	};


	audioControlHandler() {
		const audioAnimation = document.getElementById('audio-control');
		if (this.volume) {
			audioAnimation.classList.add('noVolume');
			this.audio.volume = 0;
		} else {
			if (this.play) {
				audioAnimation.classList.remove('noVolume');
				this.audio.volume = 0.5;
			}
		}
		if (this.volume) {
			this.volume = 0;
			localStorage.setItem('volume', '0');
		}
		else {
			this.volume = 1;
			localStorage.setItem('volume', '1');
		}
	}


	songControlsHandler() {
		this.pauseButton = this.controlButtons.el.getElementsByClassName('player-button-pause')[0];
		this.playButton = this.controlButtons.el.getElementsByClassName('player-button-play')[0];
		this.randomButton = this.controlButtons.el.getElementsByClassName('player-button-random')[0];
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
		localStorage.setItem('songNumber', `${this.songNumber}`);
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
		this.pauseButton.addEventListener('click', (event) => {
			event.preventDefault();
			this.setPause();
			this.volume = 0;
		})
	};


	setPause() {
		this.pauseButton.classList.add('paused');
		this.playButton.classList.add('paused');
		const audioAnimation = document.getElementById('audio-control');
		audioAnimation.classList.add('noVolume');
		this.audio.pause();
		this.play = 0;
		localStorage.setItem('audioIsPlay', '0');
	}


	onPlayClick() {
		this.playButton.addEventListener('click', (event) => {
			event.preventDefault();
			this.setPlay();
			this.volume = 1;
		})
	};


	setPlay() {
		this.pauseButton.classList.remove('paused');
		this.playButton.classList.remove('paused');
		const audioAnimation = document.getElementById('audio-control');
		audioAnimation.classList.remove('noVolume');
		this.audio.play();
		this.play = 1;
		localStorage.setItem('audioIsPlay', '1');
	}


	onRandomClick() {
		this.randomButton.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopImmediatePropagation();
			if (!this.random) {
				this.setRandom();
			}
			else {
				this.removeRandom();
			}
		})
	}


	setRandom() {
		this.randomButton.classList.add(('random-play'));
		this.random = 1;
		localStorage.setItem('audioRandom', '1');
	}


	removeRandom() {
		this.randomButton.classList.remove(('random-play'));
		this.random = 0;
		localStorage.setItem('audioRandom', '0')
	}


	videoEvents() {
		eventBus.on('videoPlay', () => {
			if (this.audio.volume > 0)
				this.audio.volume = 0.05;
		});
		eventBus.on('videoPause', () => {
			if (this.audio.volume > 0)
				this.audio.volume = 0.5;
		})
	}
};






