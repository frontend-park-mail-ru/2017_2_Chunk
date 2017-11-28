import messageCode from '../../messageCodes/lobbyCodes';

export default class TabBlink {
	constructor(){};
	blink(messageObject) {
		//groot
		// var i = 1;
		// var saveNode = undefined;
		// var grootTimer = undefined;
		// const nodeList = Array.from(document.getElementsByTagName("link"));
		// nodeList.forEach((node) => {
		// 	if (node.rel === 'shortcut icon') {
		// 		saveNode = node;
		// 		grootTimer = setInterval(nextIco, 100);
		// 	}
		// });
		//
		//
		// function nextIco() {
		// 	saveNode.href = `./images/dancing-groot/groot-${i % 11}.gif`;
		// 	i++;
		// }


		let j = 0;
		const show = [messageObject.tabMessage, document.title];


		function stop() {
			clearInterval(focusTimer);
			document.title = show[1];
			// clearInterval(grootTimer);
			// saveNode.href = `./images/favicon.ico`;
		}


		document.onmousemove = function () {
			stop();
			document.onmousemove = null;
		};
		const focusTimer = setInterval(function () {
			document.title = show[j++ % 2];
		}, 1000);
	}
}
