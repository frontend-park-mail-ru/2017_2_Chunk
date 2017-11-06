'use strict';

import Block from '../../blocks/block/block.js';


/**
 * Класс секции профиля
 * @module ProfileView
 */
export default class ProfileView extends Block {
	/**
	 * @constructor
	 * @param eventBus -
	 */
	constructor(eventBus) {
		const profile = Block.Create('div', {}, ['userData', 'auth', 'profileView']);
		super(profile.el);

		this.bus = eventBus;
		this.bus.on('unauth', () => { this.hide(); });
		this.bus.on('auth', (username) => {
			this.setText(username);
			this.show();
		});

		this.hide();
	}


	/**
	 * Выставляет имя пользователя
	 * @param username
	 */
	render(username) {
		this.setText(username);
	}
}
