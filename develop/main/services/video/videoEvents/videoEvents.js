import eventBus from '../../../modules/eventBus';
import ThemeButtonVideo from './__themeButtonVideo/videoEvents__themeButtonVideo';


export default class videoEvents {
	constructor() {
		eventBus.on('jsReady', () => {
			this.themeButtonVideoEvent()
		});
	};


	themeButtonVideoEvent() {
		this.themeButtonVideo = new ThemeButtonVideo('/video/dont_push_this_button.mp4');
		const buttons = Array.from(document.getElementsByClassName('themeButtonView'));
		document.getElementsByTagName('body')[0].appendChild(this.themeButtonVideo.el);
		// this.buttonOnClick(buttons);
	}


	buttonOnClick(buttons) {
		buttons.forEach((button) => {
			button.addEventListener('click', (event) => {
				this.themeButtonVideo.play();
			});
		});
	};
}
