'use strict';

import CommonView from '../view/view';
import menuFields from '../../templates/menuFields';


/**
 * Класс секции меню
 * @module LoginView
 */
export default class MenuView extends CommonView {
	constructor(eventBus, router) {
		super(menuFields);

		this.bus = eventBus;

		this.bus.on('unauth', () => {
			for (const elem in this.elements) {
				if (!this.elements[elem].el.classList.contains('unauth') &&
					!this.elements[elem].el.classList.contains('every-available')) {
					this.elements[elem].hide();
				} else { this.elements[elem].show(); }
			}
		});

		this.bus.on('auth', () => {
			for (const elem in this.elements) {
				if (!this.elements[elem].el.classList.contains('auth') &&
					!this.elements[elem].el.classList.contains('every-available')) {
					this.elements[elem].hide();
				} else { this.elements[elem].show(); }
			}
		});

		this.bus.emit('unauth');
		this.hide();
	}
}
