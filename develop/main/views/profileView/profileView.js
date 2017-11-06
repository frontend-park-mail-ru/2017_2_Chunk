'use strict';

import Block from '../../blocks/block/block.js';


export default class profileView extends Block {
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

	render(username) {
		this.setText(username);
	}
}
