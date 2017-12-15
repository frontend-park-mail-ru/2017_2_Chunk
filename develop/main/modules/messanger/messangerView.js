'use strict';

import Block from '../../blocks/block/block';
import chatHistory from './__chatHistory/messangerView__chatHistory';
import inputField from './__inputField/messengerView__inputField';

export default new class Messenger extends Block{
	constructor() {
		const chatContainer = Block.create('div', {}, ['messengerContainer']);
		super(chatContainer.el);
		this.chatContainer = chatContainer;
		this.app = document.getElementsByClassName('main')[0];
		this.createChatHistory();
		this.createImportField();
		// this.app.appendChild(this.chatContainer.el);
	}

	createChatHistory() {
		this.chatHistory = chatHistory;
	}

	createImportField() {
		this.inputField = inputField;
		this.chatContainer.append(this.inputField.fields);
	}
}