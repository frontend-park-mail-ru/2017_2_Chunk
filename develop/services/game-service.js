'use strict';

import Http from "../modules/http";

export default class GameService {
    constructor() {
        this.response = {
            json: {},
            message: "",
        };

        this.gameData = {
            gameID: 0,
            players: [],
            playerID: 0,
            currentPlayerID: 0,
            gameOver: false,
            arrayOfFigures: [],
        }
    }


    async start(width, height, maxPlayers) {
        const resp = await Http.FetchPost('/game/single/create', {width, height, maxPlayers});
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            // return this.response;
        }

	    this.gameData.gameID = this.response.json.gameID;
	    // return this.response;
    }


    async complete() {
        const resp = await Http.FetchGet('/game/complete?gameID=' + this.gameData.gameID);
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            // return this.response;
        }

	    this.gameData.players = this.response.json.players;
	    this.gameData.playerID = this.gameData.players[0].playerID;
	    this.gameData.currentPlayerID = this.response.json.currentPlayerID;
	    this.gameData.gameOver = this.response.json.gameOver;
	    this.gameData.arrayOfFigures = this.response.json.field;
        // return this.response;
    }


    async play(coord, currentPlayerID) {
        const x1 = coord.x1;
        const x2 = coord.x2;
        const y1 = coord.y1;
        const y2 = coord.y2;
        const gameID = this.gameData.gameID;
        const playerID = this.gameData.playerID;
        const resp = await Http.FetchPost('/game/play', {x1, x2, y1, y2, gameID, playerID, currentPlayerID});
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            // return this.response;
        }

	    this.gameData.players = this.response.json.players;
	    this.gameData.currentPlayerID = this.response.json.currentPlayerID;
	    this.gameData.gameOver = this.response.json.gameOver;
	    this.gameData.arrayOfFigures = this.response.json.field;

        // return this.response;
    }


    async status() {
    	const gameID = this.gameData.gameID;
    	const playerID = this.gameData.playerID;
    	const currentPlayerID = this.gameData.currentPlayerID;
        const resp = await Http.FetchPost('/game/status', {gameID, playerID, currentPlayerID});
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            // return this.response;
        }

	    this.gameData.players = this.response.json.players;
	    this.gameData.currentPlayerID = this.response.json.currentPlayerID;
	    this.gameData.gameOver = this.response.json.gameOver;
	    this.gameData.arrayOfFigures = this.response.json.field;

        // return this.response;
    }
}