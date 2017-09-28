(function (users) {
	'use strict';
	const pug = require('pug');
// Compile the source code
	const compiledFunction = pug.compileFile('scoreboard.pug');

// Render a set of data
	console.log(compiledFunction({
		users
	}));

})();