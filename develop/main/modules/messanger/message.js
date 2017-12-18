'use strict';

export default class Message {
	constructor(authorName, authorID, message) {
		this.message = {
			author: authorName,
			id: authorID,
			text: message,
		}
	}
}