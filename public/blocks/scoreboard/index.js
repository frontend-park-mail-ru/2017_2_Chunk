(function () {
	'use strict';

	/**
	 * Модуль для получения шаблона таблицы рекордов с пользователями
	 * @Module Scoreboard
	 */

	const Block = window.Block;
	const ScoreboardTemplate = window.ScoreboardTemplate;


	class Scoreboard extends Block {
		/**
		 * HTMLElement el - корневой элемент блока
		 * @constructor
		 */
		constructor() {
			const el = document.createElement('table');
			super(el);
		}

		/**
		 * Позволяет записать в шаблон таблицы рекордов пользователей users
		 * шаблон вместе с данными записывается в this.el в виде готового HTML блока 'table'
		 * инициализированного в конструкторе
		 * @param users[]- массив пользователей
		 */
		update(users = []) {
			console.log('Scoreboard.update', users[0]);
			this.clear();
			this.el.innerHTML = ScoreboardTemplate.template({users});
		}
	}

	window.Scoreboard = Scoreboard;

})();