'use strict';
import Block from '../../../../../blocks/block/block.js';
import ViewButton from '../../../../view/__view-button/view__view-button';


/**
 * Поля данных игры
 * @module gameDataFields
 */
export default class GameDataFields {
    constructor(socketResponse) {
        //debugger;
        const masterID = socketResponse.masterID;
        const masterInfo = socketResponse.gamers.filter((gamer) => {
            return gamer.userID === masterID;
        })[0];
        const masterUsername = masterInfo.username;
        this.fields = {
            creator: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__masterUsername',
                'lobbyView__lobbyFields__gameDataField__fields'], `Creator: ${masterUsername}`),
            gameID: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__gameId',
                'lobbyView__lobbyFields__gameDataField__fields'], `GameId: ${socketResponse.gameID}`),
            gamersNumber: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__playersNumber',
                'lobbyView__lobbyFields__gameDataField__fields'], `Players: ${socketResponse.gamers.length}`),
            botsNumber: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__botsNumber',
                'lobbyView__lobbyFields__gameDataField__fields'], `Bots: ${socketResponse.bots.length}`),
            numberOfPlayers: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__totalPLayersNumber',
                'lobbyView__lobbyFields__gameDataField__fields'], `Total players: ${socketResponse.numberOfPlayers}`),
            // watchers: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__voyeursNumber',
            //     'lobbyView__lobbyFields__gameDataField__fields'], `Watchers: ${socketResponse.watchers}`),
            fieldSize: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__fieldSize',
                'lobbyView__lobbyFields__gameDataField__fields'], `Field size: ${socketResponse.field.maxX} x ${socketResponse.field.maxY}`),
            // voyeurButton: ViewButton.create({href: '/game'}, ['auth'], 'Play');
            playButton: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__playButton',
                'lobbyView__lobbyFields__gameDataField__fields', 'view__view-button', 'auth'], 'Play'),
        }
    }

    update(socketResponse) {
        this.fields.gameID.el.innerHTML = this.fields.gameID.el.innerHTML.replace(/\d+/g, socketResponse.gameID);
        this.fields.gamersNumber.el.innerHTML = this.fields.gamersNumber.el.innerHTML.replace(/\d+/g, socketResponse.gamers.length);
        this.fields.botsNumber.el.innerHTML = this.fields.botsNumber.el.innerHTML.replace(/\d+/g, socketResponse.bots.length);
        this.fields.numberOfPlayers.el.innerHTML = this.fields.numberOfPlayers.el.innerHTML.replace(/\d+/g, socketResponse.numberOfPlayers);
        this.fields.watchers.el.innerHTML = this.fields.watchers.el.innerHTML.replace(/\d+/g, socketResponse.watchers);
        this.fields.fieldSize.el.innerHTML = this.fields.fieldSize.el.innerHTML.replace(/\d+/g, socketResponse.field.maxX);
    }
}

