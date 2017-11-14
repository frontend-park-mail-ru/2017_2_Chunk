'use strict';

import Block from '../../../blocks/block/block.js';
import ViewButton from '../../view/__view-button/view__view-button';


/**
 * Поля меню
 * @module menuFields
 */
const menuFields = {
	profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
	play: ViewButton.Create({href: '/game'}, ['auth'], 'Play'),
	lobby: ViewButton.Create({href: '/lobby'}, ['auth'], 'Lobby'),
	signup: ViewButton.Create({href: '/signup'}, ['unauth'], 'Sign up'),
	login: ViewButton.Create({href: '/login'}, ['unauth'], 'Login'),
	update: ViewButton.Create({href: '/profile'}, ['auth'], 'Profile'),
	rules: ViewButton.Create({href: '/rules'}, ['every-available'], 'Rules'),
	scores: ViewButton.Create({href: '/scoreboard'}, ['every-available'], 'Scoreboard'),
	exit: ViewButton.Create({href: '/exit'}, ['auth'], 'Exit'),
	theme: Block.Create('button', {}, ['menuView__themeButton', 'every-available',
		'view__view-button_theme-black-orange'], 'Theme'),
};

export default menuFields;