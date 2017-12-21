'use strict';
import Block from '../../blocks/block/block';
import chatHistory from './__chatHistory/messangerView__chatHistory';
import inputField from './__inputField/messengerView__inputField';
import eventBus from '../eventBus';


export default new class Messenger extends Block {
	constructor() {
		const chatContainer = Block.create('div', {}, ['messengerContainer']);
		super(chatContainer.el);
		this.chatContainer = chatContainer;
		this.app = document.getElementsByClassName('main')[0];
		this.createChatHistory();
		this.createImportField();
		this.onEnterPush();
		// this.app.appendChild(this.chatContainer.el);
	}


	createChatHistory() {
		this.chatHistory = chatHistory;
		this.chatContainer.append(this.chatHistory.fields);
	}


	createImportField() {
		this.inputField = inputField;
		this.chatContainer.append(this.inputField.fields);
		this.onSubmitButtonClick();
	}


	onSubmitButtonClick() {
		this.form = this.inputField.fields.el.getElementsByTagName('form')[0];
		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.onSubmit();
		});
	}


	onSubmit() {
		let text = this.inputField.getText();
		text = text.trim();
		if (text !== '') {
			const message = {
				author: 'Дружинин',
				text: `${text}`,
				authorColor: 'colorOrange',
			};
			eventBus.emit('newMessage', message);
		}
		this.inputField.clear();
	}


	onEnterPush() {
		document.body.addEventListener("keydown",  (event) => {
			if (event.keyCode == 13) {
				this.form.getElementsByClassName('messengerView__inputField__form__input__button')[0].click();
			}
		}, true);
	}
}