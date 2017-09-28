(function () {
	'use strict';


	class ScoreboardTemplates {
		constructor(el) {
			this.el = el;
		}

		static Create(users = [{name: 'Igor'}, {name: 'Evgenii'}]) {
			this.pug = new Pug;
			this.compiledFunction = pug.compileFile('scoreboard.pug');
			const el = document.createElement('div');
			el.innerHTML = this.compiledFunction({users});
			return new ScoreboardTemplates(el);
		}

		hide() {
			this.el.setAttribute('hidden', 'hidden');
		}

		show() {
			this.el.removeAttribute('hidden');
		}
	}


	window.ScoreboardTemplates = ScoreboardTemplates;

})();