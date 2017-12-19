'use strict';
import Block from '../../../../../blocks/block/block.js';
import eventBus from '../../../../../modules/eventBus';
import lvlBot from './__fields/lvlBotHtml';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class PlayersListString extends Block {
	constructor(type, data) {
		const block = Block.create('div', {}, ['gamePrepareView__fields__playersList__string']);
		super(block.el);
		if (type === 'player')
			this.addStingWithPlayer(data);
		else if (type === 'header')
			this.createHeader();
		else if (type === 'playerFromMaster')
			this.addStingWithPlayerMaster(data);
		else if (type === 'master')
			this.addStingWithPlayer(data);
	}


	createHeader() {
		let name = 'username';
		this.fields = {
			username: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields',
				'gamePrepareView__fields__playersList__string__fields__header'], name),
		};
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}


	addStingWithPlayer(data) {
		let name = '';
		if (data.userID) {
			this.playerType = 'player';
			name = data.username;
		}
		else {
			this.playerType = 'bot';
			name = data.botname;
		}
		this.fields = {
			username: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__username',
				'gamePrepareView__fields__playersList__string__fields'], name),
		};
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}


	addStingWithPlayerMaster(data) {
		let name = '';
		if (data.userID) {
			name = data.username;
			this.typeOfPlayer = 'player';
		}
		else {
			this.addBot(data);
			return;
		}
		this.fields = {
			username: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__username',
				'gamePrepareView__fields__playersList__string__fields'], name),
			kickButton: Block.create('button', {}, ['formButton', 'button',
				'gamePrepareView__fields__playersList__string__fields__kickButton',
				'gamePrepareView__fields__playersList__string__fields'], `kick`),
		};
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}


	addBot(data) {
		name = data.botname;
		this.typeOfPlayer = 'bot';
		this.fields = {
			username: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__username',
				'gamePrepareView__fields__playersList__string__fields'], name),
			level: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__botLevel',
				'gamePrepareView__fields__playersList__string__fields'], `bot level: ${data.lvlbot}`),
			kickButton: Block.create('button', {}, ['formButton', 'button',
				'gamePrepareView__fields__playersList__string__fields__kickButton',
				'gamePrepareView__fields__playersList__string__fields'], `kick`),
		};
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
		//
	}
}