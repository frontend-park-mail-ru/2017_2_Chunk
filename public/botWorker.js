/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 109);
/******/ })
/************************************************************************/
/******/ ({

/***/ 109:
/***/ (function(module, exports) {

self.onmessage = workerRequest => {
	var data = workerRequest.data;
	var workerResponse;
	switch (data.code) {
		case '100':
			workerResponse = createGame(data);
			break;
		case '104':
			workerResponse = getGameInfo();
			break;
		case '105':
			workerResponse = startGame();
			break;
		case '108':
			workerResponse = addBot();
			break;
		case '112':
			workerResponse = getUserID();
			break;
		case '201':
			workerResponse = returnPlayerStep(data);
			self.postMessage(workerResponse);
			workerResponse = returnBotStep();
			break;
		default:
			console.log('Error');
	}
	self.postMessage(workerResponse);
};

const startArray = [[1, 0, 0, 0, 0, 0, 0, 2], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [2, 0, 0, 0, 0, 0, 0, 1]];

var arrayOfField = 0;
var bots = [];
var gamers = [];

var code101 = {
	botsCount: 0,
	code: '101',
	gameID: 1,
	gamersCount: 1,
	maxX: 8,
	maxY: 8,
	numberOfPlayers: 2,
	player: {
		userID: 1,
		username: "player",
		email: "player@com",
		playerID: null,
		online: true
	},
	reason: "Connect to preparing game as a player",
	watchersCount: 0
};

var code104 = {
	code: '104',
	game: {
		bots: bots,
		gameID: code101.gameID,
		field: {
			field: arrayOfField,
			gameOver: false,
			maxX: code101.maxX,
			maxY: code101.maxY
		},
		gamers: gamers,
		masterID: 1,
		numberOfPlayers: code101.numberOfPlayers,
		watchers: code101.watchersCount
	},
	gameID: code101.gameID,
	player: null,
	reason: "Get full information about explicit game"
};

var code200 = {
	code: '200',
	game: {
		currentPlayerID: 1,
		field: {
			field: arrayOfField,
			gameOver: false,
			maxX: code101.maxX,
			maxY: code101.maxY
		},
		gameID: code101.gameID,
		gamers: gamers,
		numberOfPlayers: code101.numberOfPlayers,
		watchers: code101.watchersCount
	},
	reason: "start the game"
};

var code204 = {
	code: '204',
	gameID: null,
	field: {
		field: arrayOfField,
		gameOver: true,
		maxX: code101.maxX,
		maxY: code101.maxY
	},
	reason: "Game had ended, check result"
};

var playerData = {
	userID: 1,
	username: "player",
	email: "player@com",
	playerID: null,
	online: true
};

var code201 = {
	code: '201',
	step: {
		src: {
			x: 0,
			z: 0
		},
		dst: {
			x: 0,
			z: 0
		}
	},
	reason: "Game step"
};

var userID = code101.player.userID;

var code112 = {
	code: '112',
	gameID: code101.gameID,
	reason: "Returns your userID",
	userID: userID
};

function makeGameField(size) {
	var array = [];
	for (var k = 0; k < size; k++) {
		array[k] = [];
	}
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			array[i][j] = 0;
		}
	}
	return array;
}

function createGame(data) {
	code101.maxX = data.maxX;
	code101.maxY = data.maxY;
	arrayOfField = makeGameField(data.maxX);
	arrayOfField = startArray;
	code101.numberOfPlayers = +data.numberOfPlayers;
	return code101;
}

function getGameInfo() {
	gamers.push(code101.player);
	code104.game.bots = bots;
	code104.game.gameID = code101.gameID;
	code104.game.field.field = arrayOfField;
	code104.game.field.maxX = code101.maxX;
	code104.game.field.maxY = code101.maxY;
	code104.game.gamers = gamers;
	code104.game.numberOfPlayers = code101.numberOfPlayers;
	code104.game.watchers = code101.watchersCount;
	code104.game.gameID = code101.gameID;

	return code104;
}

function startGame() {
	arrayOfField = startArray;
	code200.game.field.field = arrayOfField;
	code200.game.field.maxX = code101.maxX;
	code200.game.field.maxY = code101.maxY;
	code200.game.gamers = gamers;
	code200.game.gameID = code101.gameID;
	code200.game.numberOfPlayers = code101.numberOfPlayers;
	code200.game.watchers = code101.watchersCount;

	return code200;
}

function addBot() {
	code101.botsCount++;
	playerData.username = `bot`;
	playerData.userID++;
	playerData.email = `bot@com`;
	bots.push(playerData);
	code101.player = playerData;

	return code101;
}

function getUserID() {
	code112.gameID = code101.gameID;
	return code112;
}

function returnPlayerStep(data) {
	code201.step.src.x = data.step.src.x;
	code201.step.src.z = data.step.src.z;
	code201.step.dst.x = data.step.dst.x;
	code201.step.dst.z = data.step.dst.z;

	return code201;
}

function returnBotStep() {
	moveOrClone(code201.step);
	step(code201.step);

	if (gameOver()) {
		code204.field.maxX = code101.maxX;
		code204.field.maxY = code101.maxY;
		code204.field.field = arrayOfField;

		return code204;
	}

	botStep();
	moveOrClone(code201.step);
	step(code201.step);

	if (gameOver()) {
		code204.field.maxX = code101.maxX;
		code204.field.maxY = code101.maxY;
		code204.field.field = arrayOfField;

		return code204;
	}

	return code201;
}

function moveOrClone(step) {
	if (Math.abs(step.src.x - step.dst.x) <= 1 && Math.abs(step.src.z - step.dst.z) <= 1) {
		arrayOfField[step.dst.x][step.dst.z] = arrayOfField[step.src.x][step.src.z];
	} else {
		arrayOfField[step.dst.x][step.dst.z] = arrayOfField[step.src.x][step.src.z];
		arrayOfField[step.src.x][step.src.z] = 0;
	}
}

function step(step) {
	var idx = step.dst.x;
	var idz = step.dst.z;
	for (var i = 0; i < code101.maxX; i++) {
		for (var j = 0; j < code101.maxY; j++) {
			// Первые два условия проверяют, что перебираемая в цикле клетка находится вплотную к заданной.
			if (Math.abs(i - idx) <= 1 && Math.abs(j - idz) <= 1) {
				// Затем идет проверка, что на этой клетке есть фигура и что она отлична от той, которая совершила ход.
				if (arrayOfField[i][j] !== 0 && arrayOfField[i][j] !== arrayOfField[idx][idz]) {
					// И затем в массив клеток вносятся соответствующие изменения по фигурам.
					arrayOfField[i][j] = arrayOfField[idx][idz];
				}
			}
		}
	}
}

function botStep() {
	for (var i = 0; i < code101.maxX; i++) {
		for (var j = 0; j < code101.maxY; j++) {
			if (arrayOfField[i][j] === 2) {
				for (var k = 0; k < code101.maxX; k++) {
					for (var m = 0; m < code101.maxY; m++) {
						if (Math.abs(k - i) >= 3 || Math.abs(m - j) >= 3 || arrayOfField[k][m] !== 0) {} else {
							code201.step.src.x = i;
							code201.step.src.z = j;
							code201.step.dst.x = k;
							code201.step.dst.z = m; //массив координат фигурок бота, а не четверная вложенность.
							return;
						}
					}
				}
			}
		}
	}
}

function gameOver() {
	var notFreePlane = 0;
	var countFigure = [];
	for (var k = 0; k < code101.numberOfPlayers; k++) {
		countFigure[k] = 0;
	}
	for (var i = 0; i < code101.maxX; i++) {
		for (var j = 0; j < code101.maxY; j++) {
			if (arrayOfField[i][j] !== 0) {
				notFreePlane++;
				countFigure[arrayOfField[i][j] - 1]++;
			}
		}
	}
	if (notFreePlane === code101.maxX * code101.maxY) return true;
	for (var m = 0; m < code101.numberOfPlayers; m++) {
		if (countFigure[m] === 0) return true;
	}
	return false;
}

/***/ })

/******/ });
//# sourceMappingURL=botWorker.js.map