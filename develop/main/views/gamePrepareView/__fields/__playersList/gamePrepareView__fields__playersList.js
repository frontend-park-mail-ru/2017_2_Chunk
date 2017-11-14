'use strict';
import Block from '../../../../blocks/block/block.js';
import PLayerListString from './__string/gamePrepareView__fields__playersList__string';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class PlayersList extends Block {
	constructor() {
		const block = Block.Create('div', {}, ['gamePrepareView__fields__playersList']);
		super(block.el);
		const header = {
			userId: 'User id',
			username: 'Username',
			email: 'Email',
		};
		this.addPlayer(header);
	}

	addPlayer(data) {
		const string = new PLayerListString(data);
		this.strings = {};
		this.strings[data.userId] = string;
		this.append(string);
	}

	removePlayer(userId) {
		this.remove(this.strings[userId]);
		delete this.strings[userId];
	}
}