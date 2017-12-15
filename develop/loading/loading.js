'use strict';
import loaderHtml from './loaderHtml';


new class StartLoader {
	constructor() {
		this.start();
	}


	start() {
		this.createStartCssLoader();
		// this.loadBackgroundImage();
		this.loadMainScript();
	}


	createStartCssLoader() {
		this.startLoader = document.createElement('div');
		this.startLoader.classList.add('startLoader');
		this.startLoader.innerHTML = loaderHtml;
		document.body.appendChild(this.startLoader);
	}



	loadMainScript() {
		const script = document.createElement('script');
		setTimeout(() => {
			script.src = 'application.js';
		}, 3000);
		document.body.appendChild(script);
	}
};




