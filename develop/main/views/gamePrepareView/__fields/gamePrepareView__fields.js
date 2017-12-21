'use strict';
import ViewButton from '../../view/__view-button/view__view-button';
import Header from './__header/gamePrepareView__fields__header';
import PlayList from './__playersList/gamePrepareView__fields__playersList';
import Block from '../../../blocks/block/block';
import lvlBotHtml from './__playersList/__string/__fields/lvlBotHtml';


/**
 * Поля лобби
 * @module gamePrepareFields
 */
export default class GamePrepareFields {
	constructor() {
		this.gamePrepareFields = {
			header: new Header(),
			playersList: new PlayList(),
			startGame: Block.create('div', {},
				['gamePrepareView__fields__starGameButton',
					'form__button', 'button', 'masterField'], 'Start game'),
			addBotBlock: Block.create('div', {},
				['gamePrepareView__fields__addBotBlock', 'masterField']),
		};
		this.createAddBotBlock();
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
		this.onAddBotLvlClick();

	}


	createAddBotBlock() {
		this.addBotButton = Block.create('div', {}, ['form__button', 'button',
			'gamePrepareView__fields__addBotButton'], 'Add bot');
		this.levelBot = Block.create('div', {}, ['gamePrepareView__fields__playersList__string__fields__lvlBot',
			'gamePrepareView__fields__playersList__string__fields']);
		this.levelBot.el.innerHTML = lvlBotHtml;
		this.gamePrepareFields.addBotBlock.append(this.addBotButton);
		this.gamePrepareFields.addBotBlock.append(this.levelBot);
	}


	onAddBotLvlClick() {
		this.lvlBotValue = 1;
		this.lvlList = Array.from(this.levelBot.el.getElementsByClassName('dropdown-el'))[0];
		this.lvlList.addEventListener('click', (event) => {
			event.preventDefault();
			event.stopPropagation();
			this.lvlList.classList.toggle('expanded');
			const input_id = event.target.getAttribute('for');
			const inputs = Array.from(this.gamePrepareFields.addBotBlock.el.getElementsByTagName('input'));
			if (!this.lvlList.classList.contains('expanded')) {
				inputs.forEach((input) => {
					input.removeAttribute('checked');
				});
				const input = document.getElementById(`${input_id}`);
				input.setAttribute('checked', 'checked');
				this.lvlBotValue = +input.getAttribute('value');
			}
		}, true);
		document.addEventListener('click', () => {
			this.lvlList.classList.remove('expanded');
		});
	}
}





