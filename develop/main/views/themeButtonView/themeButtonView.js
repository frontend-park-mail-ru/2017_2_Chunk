'use strict';
import Block from '../../blocks/block/block.js';
import eventBus from '../../modules/eventBus';


/**
 * Класс кнопки возврата в меню
 * @module backButtonView
 */
export default class themeButtonView extends Block {
	/**
	 * @constructor - конструктор класса кнопки возврата в меню
	 */
	constructor() {
		// const themeButton = Block.create('div', {}, ['themeButtonView',
		// 	'view__view-button_theme-black-orange'], 'Theme');
		// const themeButtonContainer = Block.create('div', {}, ['button__holder']);
		const themeButton = Block.create('button', {}, ['plus', 'themeButtonView']);
		// themeButtonContainer.append(themeButton);
		super(themeButton.el);
		// this.themeButtonContainer = themeButtonContainer;
		eventBus.on('changeTheme', () => {
				this.changeTheme();
		});
		// this.themeButton.on('click', () => {
		// });
		this.hide();
	}

	changeTheme() {
		if (document.querySelector('.view__view-button_theme-black-orange')) {
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
		} else if (document.querySelector('.view__view-button_theme-white-black')) {
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
