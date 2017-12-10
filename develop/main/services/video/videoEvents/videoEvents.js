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
		const button = document.getElementsByClassName('themeButtonView')[0];
		document.getElementsByTagName('body')[0].appendChild(this.themeButtonVideo.el);
		this.buttonOnClick(button);
	}


	buttonOnClick(button) {
		// button.addEventListener('click', (event) => {
		// 	this.themeButtonVideo.play();
		// });
	};
}
