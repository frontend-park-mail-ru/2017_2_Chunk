'use strict';

import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';



/**
 * Класс секции профиля
 * @module ProfileView
 */
export default class ProfileView extends Block {
	/**
	 * @constructor
	 * @param eventBus -
	 */
	constructor() {
		const profile = Block.create('div', {}, ['userData', 'auth', 'profileView', 'profile']);
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
