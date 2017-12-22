'use strict';
import Block from '../../../../../blocks/block/block.js';
import eventBus from '../../../../../modules/eventBus';

/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class headerFields {
	constructor() {
		this.fields = {
			creator: Block.create('div', {}, ['gamePrepareView__fields__header__fields__masterUsername',
				'gamePrepareView__fields__header__fields'], `Creator: `),
			gameID: Block.create('div', {}, ['gamePrepareView__fields__header__fields__gameId',
				'gamePrepareView__fields__header__fields'], `GameId: 0`),
			gamersNumber: Block.create('div', {}, ['gamePrepareView__fields__header__fields__playersNumber',
				'gamePrepareView__fields__header__fields'], `Players: 0`),
			botsNumber: Block.create('div', {}, ['gamePrepareView__fields__header__fields__botsNumber',
				'gamePrepareView__fields__header__fields'], `Bots: 0`),
			numberOfPlayers: Block.create('div', {}, ['gamePrepareView__fields__header__fields__totalPLayersNumber',
				'gamePrepareView__fields__header__fields'], `Total players: 0`),
			// watchers: Block.create('div', {}, ['gamePrepareView__fields__header__fields__voyeursNumber',
			// 	'gamePrepareView__fields__header__fields'], `Watchers: 0`),
			fieldSize: Block.create('div', {}, ['gamePrepareView__fields__header__fields__fieldSize',
					'gamePrepareView__fields__header__fields'],
				`Field size: 0 x 0`),
		}
	}


	update(socketReceiveData) {
		const masterID = socketReceiveData.masterID;
		const masterInfo = socketReceiveData.realPlayers.filter((gamer) => {
			return gamer.userID === masterID;
		})[0];
		const masterUsername = masterInfo.username;
		this.gameInfo = {
			botsNumber: Number(socketReceiveData.botPlayers.length),
			playersNumber: Number(socketReceiveData.realPlayers.length),
			summaryNumber: Number(socketReceiveData.numberOfPlayers),
		};
		this.fields.creator.el.innerHTML = `Creator: ${masterUsername}`;
		this.fields.gameID.el.innerHTML = this.fields.gameID.el.innerHTML.replace(/\d+/g, socketReceiveData.gameID);
		this.fields.gamersNumber.el.innerHTML = this.fields.gamersNumber.el.innerHTML.replace(/\d+/g, socketReceiveData.realPlayers.length);
		this.fields.botsNumber.el.innerHTML = this.fields.botsNumber.el.innerHTML.replace(/\d+/g, socketReceiveData.botPlayers.length);
		this.fields.numberOfPlayers.el.innerHTML = this.fields.numberOfPlayers.el.innerHTML.replace(/\d+/g, socketReceiveData.numberOfPlayers);
		this.fields.fieldSize.el.innerHTML = this.fields.fieldSize.el.innerHTML.replace(/\d+/g, socketReceiveData.maxX);
	}


	addPlayer() {
		this.gameInfo.playersNumber++;
		this.fields.gamersNumber.el.innerHTML = `Players: ${this.gameInfo.playersNumber}`;
	}


	addBot() {
		this.gameInfo.botsNumber++;
		this.fields.botsNumber.el.innerHTML = `Bots: ${this.gameInfo.botsNumber}`;
	}


	removePLayer() {
		this.gameInfo.playersNumber--;
		this.fields.gamersNumber.el.innerHTML = `Players: ${this.gameInfo.playersNumber}`;
	}


	removeBot() {
		this.gameInfo.botsNumber--;
		this.fields.botsNumber.el.innerHTML = `Bots: ${this.gameInfo.botsNumber}`;
	}


	changeCreator() {
		eventBus.on('response136', (data) => {
			this.fields.creator.el.innerHTML = `Creator: ${data.mastername}`;
		});
	}


	clear() {
		for (let key in this.fields) {
			this.fields[key].el.innerHTML = this.fields[key].el.innerHTML.replace(/\d+/g, 0);
		}
	}
}
