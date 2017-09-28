(function (users) {
	'use strict';
	//
	//
	const Block = window.Block;

	// const ScoreboardTemplate = window.scoreboardTemplate;

	class Scoreboard extends Block {
		constructor() {
			console.log('scoreboard constructor');
			const el = document.createElement('table');
			super(el);

		}

// Compile the source code


// Render a set of data
//     console.log(compiledFunction({
//         users
//     }));
		update(users = [{name: 'Igor'}, {name: 'Evgenii'}]) {
			this.clear();
			this.el.innerHTML = compile_pug({users});
		}
	}

	//     update(users = [{name: 'Igor'}, {name: 'Evgenii'}]) {
	//         const pug = require('pug');
	//         this.clear();
	//         this.compiledFunction = pug.compileFile('scoreboard.pug');
	//         this.el.innerHTML = this.compiledFunction({users});
	//     }
	// }

	// window.Scoreboard = Scoreboard;

})();