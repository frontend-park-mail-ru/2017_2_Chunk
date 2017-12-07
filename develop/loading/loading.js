'use strict';
import loaderHtml from './loaderHtml';


new class StartLoader {
	constructor() {
		this.start();
	}


	start() {
		this.createStartCssLoader();
		this.loadBackgroundImage();
		this.loadMainScript();
	}


	createStartCssLoader() {
		this.startLoader = document.createElement('div');
		this.startLoader.classList.add('startLoader');
		this.startLoader.innerHTML = loaderHtml;
		document.body.appendChild(this.startLoader);
	}



	loadBackgroundImage() {
		// const downloadingImage = new Image();
		// downloadingImage.onload = () => {
		// 	document.body.setAttribute('style', 'background-image: url('
		// 		+ downloadingImage.src + ')' +
		// 		';background-repeat: no-repeat;');
		// };
		// downloadingImage.src = './images/galaxy.jpg';
	}


	loadMainScript() {
		const script = document.createElement('script');
		setTimeout(() => {
			script.src = '/application.js';
		}, 8000);
		document.body.appendChild(script);
	}
};




