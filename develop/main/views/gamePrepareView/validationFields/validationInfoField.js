'use strict';
import validationCodes from '../../../messageCodes/validationCodes';
import gamePrepareCodes from '../../../messageCodes/gamePrepareCodes';
import eventBus from '../../../modules/eventBus';
import Block from '../../../blocks/block/block';


export default class ValidationInfo extends Block {
	constructor() {
		const validationInfo = Block.create('div', {}, ['validationInfo']);
		super(validationInfo.el);
		this.validationInfo = validationInfo;
		this.onValidationEvent();
		this.onHideEvent();
		this.onOfflineEvent();
		this.whoIsIt();
	}


	hide() {
		super.hide();
		this.clear();
	}


	show() {
		super.show();
	}


	onValidationEvent() {
		for (let error in validationCodes) {
			eventBus.on(`${gamePrepareCodes.responseEventName}${validationCodes[error].code}`, (event) => {
				if (+event.code === 134 && +this.userID === +event.userID) {
					this.validationInfo.setText(`You was kicked by master of the game`);

				}
				else if (+event.code === 134 && location.pathname === '/waiting-hall') {
					this.validationInfo.setText(`PLayer ${event.username} was kicked`);
				}
				else {
					this.validationInfo.setText(`${event.reason}`);
				}
				setTimeout(() => {
					this.hide();
				}, 3000);
				this.show();
			})
		}
	}


	onOfflineEvent() {
		eventBus.on('workerLogic', (data) => {
			if (!data.auth) {
				this.validationInfo.setText(`Only singleplayer is available. You have to login`);
			}
			else
				this.validationInfo.setText(`Only singleplayer is available in offline mode`);
			this.show();
		})
	}


	onHideEvent() {
		eventBus.on('hideValidationInfo', () => {
			this.hide();
		})
	}


	clear() {
		this.validationInfo.setText('');
	}


	whoIsIt() {
		eventBus.on('IAm', (userID) => {
			this.userID = +userID;
		});
	}
}