'use strict';

import Block from '../../../blocks/block/block.js';
import ViewButton from '../../view/__view-button/view__view-button';


/**
 * Поля меню
 * @module menuFields
 */
const menuFields = {
	profile: Block.create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
	lobby: ViewButton.Create({href: '/lobby'}, ['every-available'], 'Lobby'),
	signup: ViewButton.Create({href: '/signup'}, ['unauth'], 'Sign up'),
	login: ViewButton.Create({href: '/login'}, ['unauth'], 'Login'),
	update: ViewButton.Create({href: '/profile'}, ['auth'], 'Profile'),
	rules: ViewButton.Create({href: '/rules'}, ['every-available'], 'Rules'),
	scores: ViewButton.Create({href: '/scoreboard'}, ['every-available'], 'Scoreboard'),
	exit: ViewButton.Create({href: '/exit'}, ['auth'], 'Exit'),

};

export default menuFields;
