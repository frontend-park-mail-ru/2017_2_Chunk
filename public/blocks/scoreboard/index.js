(function () {
	'use strict';

	const Block = window.Block;
	const ScoreboardTemplate = window.ScoreboardTemplate;

	class Scoreboard extends Block {
		constructor() {
			const el = document.createElement('table');
			super(el);
		}

		update(users = []) {
			console.log('Scoreboard.update', users[0]);
			this.clear();
			this.el.innerHTML = ScoreboardTemplate.template({users});
		}
	}

	window.Scoreboard = Scoreboard;

})();