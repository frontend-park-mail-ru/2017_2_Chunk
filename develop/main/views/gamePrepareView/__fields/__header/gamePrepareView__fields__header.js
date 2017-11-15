
'use strict';
import Block from '../../../../blocks/block/block';
import HeaderFields from'./__fields/gamePrepareView__fields__header__fields';
import eventBus from '../../../../modules/eventBus';


/**
 * Базовый класс поля с данными одной игры
 * @module LobbyGameData
 */
export default class GamePrepareViewHeader extends Block {
	/**
	 * {*} data - данные об игре
	 * @constructor
	 */
	constructor() {
		const block = Block.Create('div', {}, ['gamePrepareView__fields__header']);
		super(block.el);
		this.fields = {};
		const data = {
			gameID: 0,
			playersNumber: 0,
			botsNumber: 0,
			totalPLayersNumber: 0,
			voyeursNumber: 0,
			fieldSize: 0,
		};
		const headerFields = new HeaderFields(data);
		this.fields = headerFields.fields;
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}

	updateGameData(data) {
		for (let key in data) {
			if (key in this.fields)
				this.fields[key].el.innerHTML = this.fields[key].el.innerHTML.replace(/\d+/g, data[key]);
		}
	}

	clear() {
		const data = {
			gameID: 0,
			playersNumber: 0,
			botsNumber: 0,
			totalPLayersNumber: 0,
			voyeursNumber: 0,
			fieldSize: 0,
		};
		this.updateGameData(data);
	}
}