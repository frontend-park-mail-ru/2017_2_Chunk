'use strict';
import Block from '../../../../blocks/block/block.js';
import PLayerListString from './__string/gamePrepareView__fields__playersList__string';
import eventBus from '../../../../modules/eventBus';
import prepareGameCodes from '../../../../messageCodes/gamePrepareCodes';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class PlayersList extends Block {
	constructor() {
		const block = Block.create('div', {}, ['gamePrepareView__fields__playersList']);
		super(block.el);
		this.addHeader();
		this.isMaster();
	}


	isMaster() {
		this.master = false;
		eventBus.on(`${prepareGameCodes.responseEventName}${prepareGameCodes.createGame.code}`, () => {
			this.master = true;
		})
	}


	addPlayer(data) {
		let type = '';
		if (this.master)
			type = 'playerFromMaster';
		else
			type = 'player';
		const string = new PLayerListString(type, data);
		this.playersStrings = this.playersStrings || {};
		this.playersStrings[data.userID] = string;
		this.append(string);
	}


	addMaster(data) {
		const type = 'master';
		const string = new PLayerListString(type, data);
		this.playersStrings = this.playersStrings || {};
		this.playersStrings[data.userID] = string;
		this.append(string);
	}


	addBot(data) {
		let type = '';
		if (this.master)
			type = 'playerFromMaster';
		else
			type = 'player';
		const string = new PLayerListString(type, data);
		this.botsStrings = this.botsStrings || {};
		this.botsStrings[data.botID] = string;
		this.append(string);
	}


	addHeader() {
		const type = 'header';
		const string = new PLayerListString(type);
		this.append(string);
	}


	removePlayer(userID) {
		if (userID !== 'User ID') {
			this.remove(this.playersStrings[userID]);
			delete this.playersStrings[userID];
		}
	}


	removeBot(botID) {
		this.remove(this.botsStrings[botID]);
		delete this.botsStrings[botID];
	}


	removeBots() {
		for (let key in this.botsStrings) {
			this.removeBot(key);
		}
		delete this.botsStrings;
	}


	removePlayers() {
		for (let key in this.playersStrings) {
			this.removePlayer(key);
		}
		delete this.playersStrings;
	}


	clear() {
		setTimeout(() => {
			this.removePlayers();
			this.removeBots();
		}, 500);
	}
}