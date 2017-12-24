'use strict';
import Block from '../../../../blocks/block/block';


export default class ChatHistoryString {
	constructor(message, isMe) {
		this.fields = {};
		if (isMe) {
			this.fields.container = Block.create('div', {}, ['chatHistoryStringContainer', 'me']);
		}
		else {
			this.fields.container = Block.create('div', {}, ['chatHistoryStringContainer']);
		}
		this.fields.string = Block.create('div', {}, ['chatHistoryString']);
		this.data = {};
		this.author = message.author;
		this.text = message.text;
		this.authorColor = message.authorColor;
		this.addAuthor(this.author);
		this.addText(this.text);
		this.fields.container.append(this.fields.string);

	}


	addAuthor(author) {
		this.fields.author = Block.create('div', {}, ['author', `${this.authorColor}`], `${author}: `);
		this.fields.string.append(this.fields.author);
	}


	addText(text) {
		this.fields.text = Block.create('div', {}, ['text'], text);
		this.fields.string.append(this.fields.text);
	}
}