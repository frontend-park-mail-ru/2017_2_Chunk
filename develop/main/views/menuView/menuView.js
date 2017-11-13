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

		this.themeButton = menuFields.theme;
		this.themeButton.on('click', () => {
			this.changeTheme();
		});

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


	changeTheme () {
		if(document.querySelector('.view__view-button_theme-black-orange')) {
			const elems = Array.from(document.getElementsByClassName('view__view-button_theme-black-orange'));
			elems.forEach((elem) => {
				elem.classList.remove('view__view-button_theme-black-orange');
				elem.classList.add('view__view-button_theme-white-black');
			});
			const fonts = Array.from(document.getElementsByClassName('main_font-theme-black-orange'));
			fonts.forEach((font) => {
				font.classList.remove('main_font-theme-black-orange');
				font.classList.add('main_font-theme-white-black');
			});
			const body = document.getElementsByClassName('main_theme-black-orange')[0];
			body.classList.remove('main_theme-black-orange');
			body.classList.add('main_theme-white-black');
			console.log('black-orange');
		}


		else if(document.querySelector('.view__view-button_theme-white-black')) {
			const elems = Array.from(document.getElementsByClassName('view__view-button_theme-white-black'));
			elems.forEach((elem) => {
				elem.classList.remove('view__view-button_theme-white-black');
				elem.classList.add('view__view-button_theme-black-orange');
			});
			const fonts = Array.from(document.getElementsByClassName('main_font-theme-white-black'));
			fonts.forEach((font) => {
				font.classList.remove('main_font-theme-white-black');
				font.classList.add('main_font-theme-black-orange');
			});
			const body = document.getElementsByClassName('main_theme-white-black')[0];
			body.classList.remove('main_theme-white-black');
			body.classList.add('main_theme-black-orange');
		}
	}
}
