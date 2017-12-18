'use strict';

import ScoreboardTemplate from './scoreBoardView__text/scoreboardViewText.pug';
import View from '../view/view';
import eventBus from '../../modules/eventBus';


/**
 * Класс секции таблицы лидеров
 * @module ScoreboardView
 */
export default class ScoreboardView extends View {
	/**
	 * @constructor
	 */
	constructor() {
		super({});

		this.bus = eventBus;

		this.el.classList.add('scoreboardView');
		this.bus.on('openScoreboard', () => {
			const users = [
				{name: 'You', score: 'are'},
				{name: 'the', score: 'best'}];
			this.update(users);
			this.show();
		});

		this.hide();
	}


	/**
	 * Обновляет таблицу лидеров
	 * @param users
	 */
	update(users = []) {
		this.clear();
		this.el.innerHTML = ScoreboardTemplate({users});
	}
}
