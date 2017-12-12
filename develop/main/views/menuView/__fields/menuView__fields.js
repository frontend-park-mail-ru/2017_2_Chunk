'use strict';

import Block from '../../../blocks/block/block.js';
import ViewButton from '../../view/__view-button/view__view-button';


/**
 * Поля меню
 * @module menuFields
 */
const menuFields = {
	profile: Block.create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
	lobby: ViewButton.Create({href: '/lobby'}, ['every-available'], 'buttonTape4', 'Lobby'),
	signup: ViewButton.Create({href: '/signup'}, ['unauth'], 'buttonTape4', 'Sign up>'),
	login: ViewButton.Create({href: '/login'}, ['unauth'], 'buttonTape4', 'Login<'),
	update: ViewButton.Create({href: '/profile'}, ['auth'], 'buttonTape4', 'Profile'),
	rules: ViewButton.Create({href: '/rules'}, ['every-available'], 'buttonTape4', 'Rules'),
	scores: ViewButton.Create({href: '/scoreboard'}, ['every-available'], 'buttonTape4', 'Scoreboard'),
	exit: ViewButton.Create({href: '/exit'}, ['auth'], 'buttonTape4', 'Exit'),

};

export default menuFields;
