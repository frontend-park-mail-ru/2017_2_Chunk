'use strict';
import Block from '../../../../blocks/block/block.js';
import ViewButton from '../../../view/__view-button/view__view-button';
import Button from '../../../../blocks/button/button'


/**
 * Поля данных создаваемой игры
 * @module GameCreateFields
 */
export default class GameCreateFields {
	constructor() {
		this.fields = {
			header:
				Block.create('div', {},
					['lobbyView__gameCreateView__fields__header',
						'lobbyView__gameCreateView__fields'], 'create new game'),
			playersNumber:
				Block.create('div', {},
					['lobbyView__gameCreateView__fields__playersNumber',
						'lobbyView__gameCreateView__fields'],
					'Players number: '),
			fieldSize:
				Block.create('div', {},
					['lobbyView__gameCreateView__fields__fieldSize',
						'lobbyView__gameCreateView__fields'],
					'Field size: '),
			// voyeurButton: ViewButton.create({href: '/game'}, ['auth'], 'Play');
			playButtonSingle:
				Block.create('input', {type: 'submit', value: 'Single play'}, ['lobbyView__gameCreateView__fields__playButton',
					'lobbyView__gameCreateView__fields', 'view__view-button']),
			playButtonWithFriends:
				Block.create('input', {type: 'submit', value: 'Play with friends'}, ['lobbyView__gameCreateView__fields__playButton',
					'lobbyView__gameCreateView__fields', 'view__view-button', 'auth'])
		};
		this.addRadioPLayers();
		this.addRadioFieldSize();
	}


	addRadioPLayers() {
		const choice = {
			players2: Block.create('input', {
					'required': 'required',
					'name': 'playersNumberChoice',
					'id': 'playersNumber2',
					'type': 'radio',
					'value': '2',
					'checked': true
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label1: Block.create('label', {'for': 'playersNumber2'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '2'),
			players4: Block.create('input', {
					'name': 'playersNumberChoice',
					'id': 'playersNumber4',
					'type': 'radio',
					'value': '4'
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label2: Block.create('label', {'for': 'playersNumber4'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '4'),
		};
		for (const field in choice) {
			this.fields.playersNumber.append(choice[field]);
		}
	}


	addRadioFieldSize() {
		const choice = {
			fieldSize6: Block.create('input', {
					'required': 'required',
					'name': 'fieldSizeChoice',
					'id': 'fieldSize6',
					'type': 'radio',
					'value': '6',
					'checked': true
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label1: Block.create('label', {'for': 'fieldSize6'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '6'),
			fieldSize8: Block.create('input', {
					'name': 'fieldSizeChoice',
					'id': 'fieldSize8',
					'type': 'radio',
					'value': '8'
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label2: Block.create('label', {'for': 'fieldSize8'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '8'),
		};
		for (const field in choice) {
			this.fields.fieldSize.append(choice[field]);
		}
	}
};

