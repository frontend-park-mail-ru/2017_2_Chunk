'use strict';

import loaderHtml from './loaderHtml';

const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = loaderHtml;

document.body.appendChild(loader);


const script = document.createElement('script');
setTimeout(() => {script.src = "application.js";}, 10000);
document.body.appendChild(script);


const downloadingImage = new Image();
downloadingImage.onload = () => {
	document.body.setAttribute("style", "background-image: url(" + downloadingImage.src + ")" +
		";background-repeat: no-repeat;");
};


downloadingImage.src = "./images/galaxy.jpg";



script.onload = function() {
	// document.body.removeChild(loader);
};