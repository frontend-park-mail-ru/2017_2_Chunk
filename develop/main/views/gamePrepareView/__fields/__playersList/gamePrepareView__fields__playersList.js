'use strict';
import Block from '../../../../blocks/block/block.js';
import PLayerListString from './__string/gamePrepareView__fields__playersList__string';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class PlayersList extends Block {
	constructor() {
		const block = Block.create('div', {}, ['gamePrepareView__fields__playersList']);
		super(block.el);
		const header = {
			userID: 'User ID',
			username: 'Username',
			email: 'Email',
		};
		this.addPlayer(header);
	}


	addPlayer(data) {
		const string = new PLayerListString(data);
		this.strings = this.strings || {};
		this.botStrings = this.botStrings || [];
		if (data.userID) {
			this.strings[data.userID] = string;
			this.append(string);
		}
		else {
			this.botStrings.push(string);
			this.append(string);
		}
	}


	removePlayer(userID) {
		if (userID !== 'User ID') {
			this.remove(this.strings[userID]);
			delete this.strings[userID];
		}
	}


	removeBots() {
		this.botStrings.forEach((botString, idx) => {
			this.remove(botString);
			delete this.botStrings[idx];
		});
		delete this.botStrings;

	}
	clear() {
		for (let key in this.strings) {
			this.removePlayer(key);
		}
		delete this.strings;
		this.removeBots();
	}
}