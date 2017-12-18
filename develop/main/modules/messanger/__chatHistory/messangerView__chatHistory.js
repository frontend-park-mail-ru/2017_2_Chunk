'use strict';

import Block from '../../../blocks/block/block';
import MessageString from './__string/chatHistoryString';
import eventBus from '../../eventBus';


export default new class ChatHistory {
	constructor() {
		this.fields = Block.create('div', {}, ['messengerView__chatHistory__container']);
		this.messages = [];
		const message_1 = {
			author: 'Трубников',
			text: 'дарова! Как дела? у меня все окич. Гоу в футбик?',
			authorColor: 'colorBlue',
		};

		const message_2 = {
			author: 'Дружинин',
			text: 'Значения. center: Выравнивание текста по центру. Текст помещается по центру горизонтали окна браузера или контейнера, где расположен текстовый блок. Строки текста словно нанизываются на невидимую ось, которая проходит по центру веб-страницы. Подобный способ выравнивани',
			authorColor: 'colorOrange',
		};


		this.onMessage();

		this.addMessage(message_1);
		this.addMessage(message_2, true);
	}

	onMessage() {
		eventBus.on('newMessage', (message) => {
			this.addMessage(message, true);
			this.scrollDown();
		})
	}


	addMessage(message, isMe) {
		const newMessage = new MessageString(message, isMe);
		this.messages.push(newMessage);
		this.fields.append(newMessage.fields.container);
	}


	scrollDown() {
		this.fields.el.scrollTo(0, 9999);
	}
}