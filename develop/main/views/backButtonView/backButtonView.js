'use strict';
import CommonView from '../view/view';
import Block from '../../blocks/block/block.js';


export default class backButtonView extends Block {
	constructor() {
		const backButton = Block.Create('a', {href: '/menu'}, ['backButtonView'], 'Menu');
		super(backButton.el);

		this.button = backButton;
		this.hide();
	}
}
