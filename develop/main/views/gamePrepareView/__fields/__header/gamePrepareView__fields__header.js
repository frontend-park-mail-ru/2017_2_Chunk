'use strict';
import Block from '../../../../blocks/block/block';
import HeaderFields from './__fields/gamePrepareView__fields__header__fields';
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
		const block = Block.create('div', {}, ['gamePrepareView__fields__header']);
		super(block.el);
		this.fields = {};
		this.headerFields = new HeaderFields();
		for (let field in this.headerFields.fields) {
			this.append(this.headerFields.fields[field]);
		}
	}


	updateGameData(socketReceiveData) {
		this.headerFields.update(socketReceiveData);
	}

	addPlayer() {
		this.headerFields.addPlayer();
	}

	addBot() {
		this.headerFields.addBot();
	}

	removePlayer() {
		this.headerFields.removePLayer();
	}
	removeBot() {
		this.headerFields.removeBot();
	}

	clear() {
		this.headerFields.clear();
	}
}