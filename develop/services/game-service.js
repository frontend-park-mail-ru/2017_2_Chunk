'use strict';

import Http from "../modules/http";

export default class GameService {
    constructor() {
        this.response = {
            ok: false,
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
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }


    async complete(gameID) {
        const resp = await Http.FetchGet('/game/complete?gameID=' + gameID);
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }


    async play(coord, gameID, playerID, currentPlayerID) {
        const x1 = coord.x1;
        const x2 = coord.x2;
        const y1 = coord.y1;
        const y2 = coord.y2;
        const resp = await Http.FetchPost('/game/play', {x1, x2, y1, y2, gameID, playerID, currentPlayerID});
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }


    async status(gameID, playerID, currentPlayerID) {
        const resp = await Http.FetchPost('/game/status', {gameID, playerID, currentPlayerID});
        this.response.json = await resp.json();

        if (resp.status >= 400) {
            this.response.message = this.response.json.errorMessage;
            return this.response;
        }

        this.response.ok = true;
        this.user = this.response.json;
        return this.response;
    }
}