'use strict';
import Block from '../../../../blocks/block/block';
import GameDataFields from './__fields/lobbyView__lobbyFields__gameDataField__fields';
import eventBus from '../../../../modules/eventBus';
import lobbyCodes from '../../../../messageCodes/lobbyCodes';


/**
 * Базовый класс поля с данными одной игры
 * @module LobbyGameData
 */
export default class LobbyGameData extends Block {
	/**
	 * {*} data - данные об игре
	 * @constructor
	 */
	constructor(data) {
		const block = Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField']);
		super(block.el);
		this.bus = eventBus;
		this.gameID = data.gameID;
		this.validationField();
		this.gameDataFields = new GameDataFields(data);
		for (let field in this.gameDataFields.fields) {
			this.append(this.gameDataFields.fields[field]);
		}
		this.playButtonOnClick();
	}


	playButtonOnClick() {
		this.gameDataFields.fields.playButton.on('click', () => {
			const request = {
				code: `${lobbyCodes.connectGame.code}`,
				gameID: `${this.gameID}`,
			};
			// this.bus.emit(`${lobbyCodes.connectGame.internal}`);
			this.bus.emit(`${lobbyCodes.requestEventName}`, request);
		});
	}


	updateGameData(response) {
		this.gameDataFields.update(response)
	}


	validationField() {
		this.bus.on('auth', () => {
			//debugger;
			const elements = this.gameDataFields.fields.filter((field) => {
				return field.el.classList.contains('auth');
			});
			elements.forEach((elem) => {
				elem.show();
			})
		});
		this.bus.on('unauth', () => {
			const elements = this.gameDataFields.fields.filter((field) => {
				return field.el.classList.contains('auth');
			});
			elements.forEach((elem) => {
				elem.hide();
			})
		})
	}
}