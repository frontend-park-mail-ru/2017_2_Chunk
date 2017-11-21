'use strict';

import View from '../view/view';
import menuFields from './__fields/menuView__fields';


/**
 * Класс секции меню
 * @module LoginView
 */
export default class MenuView extends View {
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
