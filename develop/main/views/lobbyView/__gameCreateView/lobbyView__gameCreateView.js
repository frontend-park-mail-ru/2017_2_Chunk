'use strict';
import Block from '../../../blocks/block/block';
import GameCreateViewFields from './__fields/lobbyView__gameCreateView__fields';
import eventBus from '../../../modules/eventBus';
import messageCodes from '../../../messageCodes/messageCodes';


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
		const block = Block.create('form', {}, ['lobbyView__gameCreateView']);
		super(block.el);
		this.fields = {};
		this.bus = eventBus;
		const gameDataFields = new GameCreateViewFields();
		this.fields = gameDataFields.fields;
		this.hide();
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}

		this.stateCreateBanner();
		this.onSubmit();
	}



	//определяет отктрытие баннера и закрытие по клику вокруг банера
	stateCreateBanner() {
		this.bus.on('openCreateGameBanner', () => {
			this.show();
			const body = document.body;
			body.addEventListener('click', (event) => {
				const path = event.path;
				const ifFormInPath = path.some((elem) => {
					return elem.tagName === 'FORM';
				});
				if (ifFormInPath)
					event.stopPropagation();
				else
					this.bus.emit('closeCreateGameBanner');
			}, true);
		});
		this.bus.on('closeCreateGameBanner', () => {
			this.hide();
		});
	}

	onSubmit() {
		this.el.addEventListener('submit', (event) => {
			event.preventDefault();
			let numberOfPlayer = this.el.elements.playersNumberChoice.value;
			let fieldSize = this.el.elements.fieldSizeChoice.value;
			const request = {
				code: '100',
				numberOfPlayers: numberOfPlayer,
				maxX: fieldSize,
				maxY: fieldSize,
			};
			this.bus.emit(`${messageCodes.connectGame.internal}`);
			this.bus.emit(`${messageCodes.createGame.request}`, request);
			this.hide();
		});

		
	}
}
