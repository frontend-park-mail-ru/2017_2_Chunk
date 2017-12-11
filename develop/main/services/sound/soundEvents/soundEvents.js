import eventBus from '../../../modules/eventBus';

export default class soundEvents {
	constructor() {
		eventBus.on('JSReady', () => {this.buttonSounds()});
	};

	buttonSounds() {
		const buttons = Array.from(document.getElementsByClassName('button'));
		this.buttonHoverAudio = new Audio();
		this.hoverAudioSrc = '/music/serviceSounds/button1.mp3';
		this.buttonHoverAudio.src = this.hoverAudioSrc;
		this.buttonHoverAudio.load();
		this.buttonClickAudio = new Audio();
		this.clickAudioSrc = '/music/serviceSounds/button2.mp3';
		this.buttonClickAudio.src = this.clickAudioSrc;
		this.buttonClickAudio.load();
		this.buttonOnHover(buttons);
		this.buttonOnClick(buttons);
	}


	buttonOnHover(buttons) {
		buttons.forEach((button) => {
			button.addEventListener('mouseover', (event) => {
				this.buttonHoverAudio.pause();
				this.buttonHoverAudio.currentTime = 0;
				this.buttonHoverAudio.play();
			});
		});
	};

	buttonOnClick(buttons) {
		buttons.forEach((button) => {
			button.addEventListener('click', (event) => {
				this.buttonClickAudio.pause();
				this.buttonClickAudio.currentTime = 0;
				this.buttonClickAudio.play();
			});
		});
	};
}
