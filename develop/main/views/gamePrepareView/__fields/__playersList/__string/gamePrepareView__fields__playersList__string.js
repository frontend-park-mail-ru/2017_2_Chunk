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
			this.addStingWithPlayerMaster(data, false);
		else if (type === 'header')
			this.createHeader();
		else if (type === 'playerFromMaster')
			this.addStingWithPlayerMaster(data, true);
		else if (type === 'master')
			this.addStingWithPlayerMaster(data, false, true);
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
			kickButton: Block.create('button', {}, ['formButton', 'button',
				'gamePrepareView__fields__playersList__string__fields__kickButton',
				'gamePrepareView__fields__playersList__string__fields'], `kick`),
		};
		this.fields.kickButton.hide();
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}


	addStingWithPlayerMaster(data, showKickButton) {
		let name = '';
		if (data.userID) {
			name = data.username;
			this.typeOfPlayer = 'player';
		}
		else {
			this.addBot(data, showKickButton);
			return;
		}
		this.fields = {
			username: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__username',
				'gamePrepareView__fields__playersList__string__fields'], name),
			kickButton: Block.create('button', {}, ['formButton', 'button',
				'gamePrepareView__fields__playersList__string__fields__kickButton',
				'gamePrepareView__fields__playersList__string__fields'], `kick`),
		};
		this.userID = data.userID;
		if (!showKickButton)
			this.fields.kickButton.el.style.setProperty('display', 'none');

		eventBus.on('showMasterFields', (masterID) => {
			//debugger;
			if (this.userID != masterID)
				this.fields.kickButton.el.style.setProperty('display', 'inline');
		});
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}


	addBot(data, showKickButton) {
		name = data.botname;
		this.typeOfPlayer = 'bot';
		this.fields = {
			username: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__username',
				'gamePrepareView__fields__playersList__string__fields'], name),
			level: Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__botLevel',
				'gamePrepareView__fields__playersList__string__fields'], `bot level: ${data.botlvl}`),
			kickButton: Block.create('button', {}, ['formButton', 'button',
				'gamePrepareView__fields__playersList__string__fields__kickButton',
				'gamePrepareView__fields__playersList__string__fields'], `kick`),
		};
		if (!showKickButton)
			this.fields.kickButton.el.style.setProperty('display', 'none');
		eventBus.on('showMasterFields', () => {
			this.fields.kickButton.el.style.setProperty('display', 'inline');
		});
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
		//
	}
}