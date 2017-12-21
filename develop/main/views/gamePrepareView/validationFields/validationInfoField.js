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
				this.validationInfo.setText(`${event.reason}`);
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
}