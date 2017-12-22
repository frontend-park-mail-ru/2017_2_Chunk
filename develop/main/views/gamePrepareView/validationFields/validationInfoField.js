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
				if (+event.code === 134 && location.pathname === '/lobby') {
					if (+this.userID === +event.userID)
						console.log(event);
				}
				this.validationInfo.setText(`${event.reason}`);
				setTimeout(() => {
					this.hide();
				}, 5000);
				this.show();
			})
		}
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
		eventBus.on('iAm', (userID) => {
			this.userID = +userID;
		});
	}
}