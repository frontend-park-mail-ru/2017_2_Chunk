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
		sessionStorage.setItem('isPageActive', '0');
		this.hiddenEvent = this.hiddenEvent || {};
		this.hiddenEvent[`${tabMessage.newGame.name}`]
			= eventBus.on(`${tabMessage.newGame.name}`, (messageText) => {
			this.blink(messageText);
		});
		this.hiddenEvent[`${tabMessage.yourStep.name}`]
			= eventBus.on(`${tabMessage.yourStep.name}`, (messageText) => {
			this.blink(messageText);
		});
	}


	visibleCallback() {
		eventBus.emit('pageActive');
		sessionStorage.setItem('isPageActive', '1');
		this.stop();
		for (let event in this.hiddenEvent)
			eventBus.remove(event, this.hiddenEvent[event]);
	}


	blink(messageText) {
		this.messageBlink(messageText);
	}

	messageBlink(messageText) {
		let j = 0;
		this.blinkWork = true;
		this.show = [messageText, document.title];
		this.focusTimer = setInterval(() => {
			document.title = this.show[j++ % 2];
		}, 1000);
		setTimeout(this.stop, 15000);
	}




	stop() {
		if (this.blinkWork) {
			clearInterval(this.focusTimer);
			document.title = this.show[1];
			this.blinkWork = false;
		}
	}
}
