import tabMessage from '../../messageCodes/tabMessage';
import eventBus from '../../modules/eventBus';
import Visibility from 'visibilityjs';


export default new class visibilityViewer {
	constructor() {
		Visibility.change((event, stateName) => this.stateAnalise(event, stateName));
	};


	stateAnalise(event, stateName) {
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
		this.messageBlink(messageText);
		// this.grootBlink();
	}

	messageBlink(messageText) {
		let j = 0;
		this.blinkWork = true;
		this.show = [messageText, document.title];
		this.focusTimer = setInterval(() => {
			document.title = this.show[j++ % 2];
		}, 1000);
	}


	grootBlink() {
		var i = 1;
		var saveNode = undefined;
		var grootTimer = undefined;
		let stop = false;
		const nodeList = Array.from(document.getElementsByTagName('link'));
		nodeList.forEach((node) => {
			if (node.rel === 'shortcut icon') {
				saveNode = node;
				grootTimer = setInterval(nextIco, 500);
			}
		});


		eventBus.on('grootStop', () => clearInterval(grootTimer));

		function nextIco() {
				saveNode.href = `./images/dancing-groot/groot-${i % 11}.gif`;
				i++;
			}
	}

	stop() {
		if (this.blinkWork) {
			clearInterval(this.focusTimer);
			document.title = this.show[1];
			this.blinkWork = false;
		}
		eventBus.emit('grootStop')
	}
}
