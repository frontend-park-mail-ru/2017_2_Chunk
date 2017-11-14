'use strict';
import Block from '../../../blocks/block/block';
import GameCreateViewFields from './__fields/lobbyView__gameCreateView__fields';
import eventBus from '../../../modules/eventBus';


/**
 * Базовый класс поля с данными одной игры
 * @module LobbyGameData
 */
export default class GameCreateView extends Block {
	/**
	 * {*} data - данные об игре
	 * @constructor
	 */
	constructor() {
		const block = Block.Create('form', {}, ['lobbyView__gameCreateView']);
		super(block.el);
		this.fields = {};
		this.bus = eventBus;
		const gameDataFields = new GameCreateViewFields();
		this.fields = gameDataFields.fields;
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}

		this.bus.on('openCreateGame', () => {
			this.show();
			console.log('opencreategame');
		});

		this.hide();
	}
}