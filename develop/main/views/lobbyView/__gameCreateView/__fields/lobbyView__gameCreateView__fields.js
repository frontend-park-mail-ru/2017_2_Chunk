'use strict';
import Block from '../../../../blocks/block/block.js';
import ViewButton from '../../../view/__view-button/view__view-button';


/**
 * Поля данных создаваемой игры
 * @module GameCreateFields
 */
export default class GameCreateFields {
	constructor() {
		this.fields = {
			header:
				Block.Create('div', {},
					['lobbyView__gameCreateView__fields__header',
						'lobbyView__gameCreateView__fields'], 'Create new game'),
			playersNumber:
				Block.Create('div', {},
					['lobbyView__gameCreateView__fields__playersNumber',
						'lobbyView__gameCreateView__fields'],
					'Players number: '),
			fieldSize:
				Block.Create('div', {},
					['lobbyView__gameCreateView__fields__fieldSize',
						'lobbyView__gameCreateView__fields'],
					'Field size: '),
			// voyeurButton: ViewButton.Create({href: '/game'}, ['auth'], 'Play');
			playButtonSingle:
				ViewButton.Create({href: '/game-info'}, ['lobbyView__gameCreateView__fields__playButton',
					'lobbyView__gameCreateView__fields'], 'Single play'),
			playButtonWithFriends:
				ViewButton.Create({href: '/game-info'}, ['lobbyView__gameCreateView__fields__playButton',
					'lobbyView__gameCreateView__fields'], 'Play with friends')
		};
		this.addRadioPLayers();
		this.addRadioFieldSize();
	}


	addRadioPLayers() {
		const choice = {
			players2: Block.Create('input', {
					'name': 'playerNumber',
					'id': 'playersNumber2',
					'type': 'radio',
					'value': '2'
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label2: Block.Create('label', {'for': 'playersNumber2'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '2'),
			players4: Block.Create('input', {
					'name': 'playerNumber',
					'id': 'playersNumber4',
					'type': 'radio',
					'value': '4'
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label4: Block.Create('label', {'for': 'playersNumber4'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '4'),
		};
		for (const field in choice) {
			this.fields.playersNumber.append(choice[field]);
		}
	}


	addRadioFieldSize() {
		const choice = {
			fieldSize10: Block.Create('input', {
					'name': 'fieldSize',
					'id': 'fieldSize10',
					'type': 'radio',
					'value': '10'
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label2: Block.Create('label', {'for': 'fieldSize10'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '10'),
			fieldSize15: Block.Create('input', {
					'name': 'fieldSize',
					'id': 'fieldSize15',
					'type': 'radio',
					'value': '15'
				},
				['lobbyView__gameCreateView__fields__choiceRadio',], ''),
			label4: Block.Create('label', {'for': 'fieldSize15'},
				['lobbyView__gameCreateView__fields__choiceRadio_label',], '15'),
		};
		for (const field in choice) {
			this.fields.fieldSize.append(choice[field]);
		}
	}
};

