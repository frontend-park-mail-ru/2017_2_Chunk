'use strict';

import ScoreboardTemplate from '../../templates/scoreBoard';
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

		this.bus.on('openScoreboard', () => {
			const users = [
				{name: 'Igor', score: '1904'},
				{name: 'Sasha', score: '2010'}];
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
		console.log('Scoreboard.update', users[0]);
		this.clear();
		const scoreboardTemplate = new ScoreboardTemplate();
		this.el.innerHTML = scoreboardTemplate.template({users});
	}
}
