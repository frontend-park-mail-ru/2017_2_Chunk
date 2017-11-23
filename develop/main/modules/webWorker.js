'use strict';
import eventBus from './eventBus';

const startArray = [
	[1,0,0,0,0,0,0,2],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [2,0,0,0,0,0,0,1],
];

export default class webWorker {
	constructor() {
		if (window.Worker) {
			this.bus = eventBus;
			this.worker = new Worker('./worker.js');
			this.gameHandler();
			this.workerCallbacks();
		}
		else
			console.log('no workers');

		this.arrayOfField = 0;

		this.code101 = {
            botsCount: 0,
            code: 101,
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

		this.code104 = {
            code: 104,
            game: {
                bots: this.bots,
                gameID: this.code101.gameID,
                field: {
                	field: this.arrayOfField,
                	gameOver: false,
					maxX: this.code101.maxX,
					maxY: this.code101.maxY
				},
				gamers: this.gamers,
				masterID: 5,
				numberOfPlayers: this.code101.numberOfPlayers,
				watchers: this.code101.watchersCount
            },
			gameID: this.code101.gameID,
			player: null,
			reason: "Get full information about explicit game"
        };

		this.code200 = {
			code: 200,
			game: {
				currentPlayerID: 1,
                field: {
                    field: this.arrayOfField,
                    gameOver: false,
                    maxX: this.code101.maxX,
                    maxY: this.code101.maxY
                },
				gameID: this.code101.gameID,
				gamers: this.gamers,
				numberOfPlayers: this.code101.numberOfPlayers,
				watchers: this.code101.watchersCount
			},
			reason: "Start the game"
		};

		this.playerData = {
            userID: 1,
            username: "player",
            email: "player@com",
            playerID: null,
            online: true
		};

		this.step = {
			src: {x: 0, z: 0},
			dst: {x: 0, z: 0}
		};

		this.bots = [];
		this.gamers = [];
		this.userID = this.code101.player.userID;

		this.code112 = {
			code: 112,
			gameID: this.code101.gameID,
			reason: "Returns your userID",
			userID: this.userID
		}
	}

	makeGameField(size) {
		let array = [];
		for (let i = 0; i < size; i ++) {
			array[i] = [];
		}
        for (let i = 0; i < size; i ++) {
            for (let j = 0; j < size; j ++) {
            	array[i][j] = 0;
			}
		}
		return array;
	}

	gameHandler() {
		this.bus.on('createGame', (data) => {
			this.worker.postMessage(data);
		});
		this.bus.on('connectGame', (data) => {
			this.worker.postMessage(data);
		});
		this.bus.on('getGameInfo', (data) => {
			this.worker.postMessage(data);
		});
		this.bus.on('workerMessage', (workerRequest) => {
			this.worker.postMessage(workerRequest);//принимает массив аргументов
		});
		//how to use it?
		// const workerRequest = {
		// 	code: 123,
		// 	message: 'bla bla bla'
		// };
		// this.bus.emit('workerMessage', data)
	}


	workerCallbacks() {
		this.worker.onmessage = (workerResponse) => {//возвращает не массив ха - ха!
            switch (workerResponse.data.code) {
                case '100':
                    this.workerCode100(workerResponse.data);
                    break;
                case '104':
                    this.workerCode104();
                    break;
                case '105':
                    this.workerCode105();
                    break;
                case '108':
                    this.workerCode108();
                    break;
                case '112':
                    this.workerCode112();
                    break;
                default:
                    console.log('Error');
            }
			console.log('Worker response!' , workerResponse);
		}
	}

	workerCode100(data) {
		this.code101.maxX = data.maxX;
		this.code101.maxY = data.maxY;
		this.arrayOfField = this.makeGameField(data.maxX);
		this.gamers.push(this.playerData);
		this.code101.numberOfPlayers = +data.numberOfPlayers;

		this.bus.emit('workerCode101', this.code101);
	}

    workerCode104() {
		this.code104.game.bots = this.bots;
        this.code104.game.gameID = this.code101.gameID;
        this.code104.game.field.field = this.arrayOfField;
        this.code104.game.field.maxX = this.code101.maxX;
        this.code104.game.field.maxY = this.code101.maxY;
		this.code104.game.gamers = this.gamers;
		this.code104.game.numberOfPlayers = this.code101.numberOfPlayers;
        this.code104.game.watchers = this.code101.watchersCount;
        this.code104.game.gameID = this.code101.gameID;

        this.bus.emit('workerCode104', this.code104);
	}

	workerCode105() {
		this.gamers.push(this.playerData);
		this.arrayOfField = startArray;
        this.code200.game.field.field = this.arrayOfField;
        this.code200.game.field.maxX = this.code101.maxX;
        this.code200.game.field.maxY = this.code101.maxY;
        this.code200.game.gamers = this.gamers;
        this.code200.game.gameID = this.code101.gameID;
        this.code200.game.numberOfPlayers = this.code101.numberOfPlayers;
        this.code200.game.watchers = this.code101.watchersCount;

        this.bus.emit('workerCode200', this.code200);
	}

    workerCode108(data) {
		this.code101.botsCount++;
		this.playerData.username = `bot${this.playerData.userID}`;
		this.playerData.userID++;
		this.playerData.email = `${this.playerData.username}@com`;
		this.bots.push(this.playerData);
		this.code101.player = this.playerData;

        this.bus.emit('workerCode101', this.code101);
    }

    workerCode112() {
		this.code112.gameID = this.code101.gameID;

        this.bus.emit('workerCode112', this.code112);
	}


	getFullGameList() {
		const data = JSON.stringify({
			code: '111',
		});
		this.worker.send(data);
	};


	subscribeNewGameNode() {
		const data = JSON.stringify({
			code: '106',
		});
		this.worker.send(data)
	}
}
