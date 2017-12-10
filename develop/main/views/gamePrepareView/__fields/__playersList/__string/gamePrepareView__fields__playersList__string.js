'use strict';
import Block from '../../../../../blocks/block/block.js';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class PlayersListString extends Block {
	constructor(data, attrs = {}) {
		const block = Block.create('div', {}, ['gamePrepareView__fields__playersList__string']);
		super(block.el);
		this.fields = {
			kickField: Block.create('div', attrs, ['gamePrepareView__fields__playersList__string__fields__userId',
				'gamePrepareView__fields__playersList__string__fields'], `${data.userID}`),
			username: Block.create('div', attrs, ['gamePrepareView__fields__playersList__string__fields__username',
				'gamePrepareView__fields__playersList__string__fields'], `${data.username}`),
			userEmail: Block.create('div', attrs, ['gamePrepareView__fields__playersList__string__fields__email',
				'gamePrepareView__fields__playersList__string__fields'], `${data.email}`),
		};
		for (let field in this.fields) {
			this.append(this.fields[field]);
		}
	}
}