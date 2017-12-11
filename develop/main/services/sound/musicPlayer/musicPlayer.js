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
			this.removeStartCssLoader();
			this.musicStart();
		})
	}


	removeStartCssLoader() {
		const startLoader = document.body.getElementsByClassName('startLoader')[0];
		document.body.removeChild(startLoader);
	};


	musicStart() {
		this.audioSettings();
		this.audioControlsSettings();
		this.numberOfSongs = playlist.length;
		this.nextSongRandom();
		this.previousSongs.push(this.songNumber);
		this.currentSongPosition = this.previousSongs.length - 1;
		this.videoEvents();
	}


	audioSettings() {
		this.audioPlaying = false;
		this.musicNode = document.createElement('div');
		this.musicNode.innerHTML = audioLoaderHtml;
		document.body.appendChild(this.musicNode);
		this.backgroundaudio = document.getElementById('backgroundaudio');
		this.audio = new Audio();
		this.audio.volume = 0.3;
		this.audio.type = 'audio/mpeg';
		this.audio.autoplay = 'autoplay';
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
			this.audioControlHandler(event);
		}, false);
		this.appendControlButtons();
		this.songControlsHandler();
	}


	appendControlButtons() {
		this.controlButtons = Block.create('div', {}, ['controlButtons']);
		this.controlButtons.el.innerHTML = controlButtons;
		this.backgroundaudio.appendChild(this.controlButtons.el);
		this.songControls = Array.from(document.getElementsByClassName('player-button'));
	};


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


	songControlsHandler() {
		this.onNextSongClick();
		this.onPreviousSongClick();
		this.onPauseClick();
		this.onPlayClick();
	}


	onNextSongClick() {
		const nextSongButtons = this.controlButtons.el.getElementsByClassName('player-button-next')[0];
		nextSongButtons.addEventListener('click', () => {
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
		})
	}


	nextSongRandom() {
		this.songNumber = Math.round(Math.random() * (this.numberOfSongs - 1));
		const songUrl = playlist[this.songNumber].url;
		this.audio.pause();
		this.audio.src = songUrl;
		this.audio.load();
	}


	onEndedSong() {
		this.nextSong();
	}


	nextSong() {
		this.songNumber++;
		this.songNumber = this.songNumber % this.numberOfSongs;
		this.setSongByNumber(this.songNumber);
	}


	setSongByNumber(songNumber) {
		const songUrl = playlist[songNumber].url;
		this.audio.pause();
		this.audio.src = songUrl;
		this.audio.load();
	}


	onPreviousSongClick() {
		const previousSongButton = this.controlButtons.el.getElementsByClassName('player-button-prev')[0];
		previousSongButton.addEventListener('click', () => {
			this.previousSong();
		})
	}


	previousSong() {
		this.lastSong = false;
		if (this.currentSongPosition != 0) {
			this.currentSongPosition--;
			this.setSongByNumber(this.previousSongs[this.currentSongPosition]);
		}
	}



	onPauseClick() {
		const pauseButton = this.controlButtons.el.getElementsByClassName('player-button-pause')[0];
		const playButton = this.controlButtons.el.getElementsByClassName('player-button-play')[0];
		pauseButton.addEventListener('click', () => {
			pauseButton.classList.remove('paused');
			playButton.classList.remove('paused');
			this.audio.pause();

		})
	};

	onPlayClick() {
		const pauseButton = this.controlButtons.el.getElementsByClassName('player-button-pause')[0];
		const playButton = this.controlButtons.el.getElementsByClassName('player-button-play')[0];
		playButton.addEventListener('click', () => {
			pauseButton.classList.add('paused');
			playButton.classList.add('paused');
			this.audio.play();

		})
	};


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






