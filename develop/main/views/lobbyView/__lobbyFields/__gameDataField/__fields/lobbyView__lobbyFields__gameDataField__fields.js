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

        const masterUsername = socketResponse.masterUsername;
        this.fields = {
            creator: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__masterUsername',
                'lobbyView__lobbyFields__gameDataField__fields'], `Creator: ${masterUsername}`),
            gameID: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__gameId',
                'lobbyView__lobbyFields__gameDataField__fields'], `GameId: ${socketResponse.gameID}`),
            gamersNumber: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__playersNumber',
                'lobbyView__lobbyFields__gameDataField__fields'], `Players: ${socketResponse.realSize}`),
            botsNumber: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__botsNumber',
                'lobbyView__lobbyFields__gameDataField__fields'], `Bots: ${socketResponse.botSize}`),
            numberOfPlayers: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__totalPLayersNumber',
                'lobbyView__lobbyFields__gameDataField__fields'], `Total players: ${socketResponse.numberOfPlayers}`),
            // watchers: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__voyeursNumber',
            //     'lobbyView__lobbyFields__gameDataField__fields'], `Watchers: ${socketResponse.watchers}`),
            fieldSize: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__fieldSize',
                'lobbyView__lobbyFields__gameDataField__fields'], `Field size: ${socketResponse.maxX} x ${socketResponse.maxY}`),
            // voyeurButton: ViewButton.create({href: '/game'}, ['auth'], 'Play');
            playButton: Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField__fields__playButton',
                'lobbyView__lobbyFields__gameDataField__fields', 'form__button', 'button', 'auth'], 'Connect'),
        }
    }

    update(socketResponse) {
        this.fields.gamersNumber.el.innerHTML = `Players: ${socketResponse.realSize}`;
        this.fields.botsNumber.el.innerHTML = `Bots: ${socketResponse.botSize}`;
    }
}

