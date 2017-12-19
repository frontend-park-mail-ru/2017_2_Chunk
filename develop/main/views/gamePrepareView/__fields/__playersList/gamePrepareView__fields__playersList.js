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


	addMaster(data) {
		const type = 'master';
		const string = new PLayerListString(type, data);
		this.playersStrings = this.playersStrings || {};
		this.playersStrings[data.userID] = string;
		this.append(string);
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
		if (this.master) {
			this.onPlayerKickButtonClick(data.userID);
		}
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
		if (this.master) {
			this.onBotKickButtonClick(data.botID);
		}
		this.append(string);
	}


	addHeader() {
		const type = 'header';
		const string = new PLayerListString(type);
		this.append(string);
	}


	removePlayer(userID) {
		this.remove(this.playersStrings[userID]);
		delete this.playersStrings[userID];
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
		debugger;
		for (let key in this.playersStrings) {
			this.removePlayer(key);
		}
		delete this.playersStrings;
	}


	onPlayerKickButtonClick(playerID) {
		const string = this.playersStrings[playerID];
		string.fields.kickButton.on('click', () => {
			const request = {
				code: `${prepareGameCodes.kickPlayer.code}`,
				userID: `${playerID}`,
			};
			eventBus.emit(`${prepareGameCodes.requestEventName}`, request)
		})
	}


	onBotKickButtonClick(botID) {
		const string = this.botsStrings[botID];
		string.fields.kickButton.on('click', () => {
			const request = {
				code: `${prepareGameCodes.removeBot.code}`,
				botID: `${botID}`,
			};
			eventBus.emit(`${prepareGameCodes.requestEventName}`, request)
		})
	}


	clear() {
		this.removePlayers();
		this.removeBots();
	}
}