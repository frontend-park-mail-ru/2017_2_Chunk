'use strict';
import loaderHtml from './loaderHtml';


new class StartLoader {
	constructor() {
		this.start();
	}


	start() {
		this.createStartCssLoader();
		this.loadBackgroundImage();
	}


	createStartCssLoader() {
		this.startLoader = document.createElement('div');
		this.startLoader.classList.add('startLoader');
		this.startLoader.innerHTML = loaderHtml;
		document.body.appendChild(this.startLoader);
	}

	loadBackgroundImage() {
		const img = new Image();
		img.src = './images/opt_galaxy.jpg';
		img.onload = () => {
			this.loadMainScript();
		};
		document.body.style.backgroundImage = 'url(./images/opt_galaxy.jpg)';
		document.body.style.setProperty('background-size', 'cover');
		document.body.style.setProperty('background-position', 'center');
		document.body.style.setProperty('display', 'block');
	}


	loadMainScript() {
		const script = document.createElement('script');
		setTimeout(() => {
			script.src = 'application.js';
		}, 2000);
		document.body.appendChild(script);
	}
};




