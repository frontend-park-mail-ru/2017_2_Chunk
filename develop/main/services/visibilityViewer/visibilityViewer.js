import tabMessage from '../../messageCodes/tabMessage';
import eventBus from '../../modules/eventBus';


export default new class visibilityViewer {
	constructor() {
		if (Visibility.isSupported()) {
			console.log('supported');
		}
		const vis = Visibility;
		console.dir(vis);
		Visibility.change((event, stateName) => this.stateAnalise(event, stateName));
	};

	stateAnalise(event, stateName) {
		console.log(this);
		console.log(event);
		console.log(stateName);
		if (Visibility.hidden()) {
			this.hiddenCallback();
		}
		else {
			this.visibleCallback();
		}
	}


	hiddenCallback() {
		this.hiddenEvent = eventBus.on(`${tabMessage.newGame.name}`, (messageText) => {
			this.blink(messageText);
		})
	}


	visibleCallback() {
		this.stop();
		eventBus.remove(`${tabMessage.newGame.name}`, this.hiddenEvent);
	}





	blink(messageText) {
		let j = 0;
		this.blinkWork = true;
		this.show = [messageText, document.title];
		this.focusTimer = setInterval(() => {
			document.title = this.show[j++ % 2];
		}, 1000);
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
		// document.onmousemove = function () {
		// 	stop();
		// 	document.onmousemove = null;
		// };
	}


	stop() {
		if (this.blinkWork) {
			clearInterval(this.focusTimer);
			document.title = this.show[1];
			this.blinkWork = false;
		}
		// clearInterval(grootTimer);
		// saveNode.href = `./images/favicon.ico`;
	}
}
