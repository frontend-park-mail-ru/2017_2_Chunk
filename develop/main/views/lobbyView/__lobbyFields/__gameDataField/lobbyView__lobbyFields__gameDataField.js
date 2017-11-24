'use strict';

import Block from '../../../../blocks/block/block';
import GameDataFields from './__fields/lobbyView__lobbyFields__gameDataField__fields';
import eventBus from '../../../../modules/eventBus';


/**
 * Базовый класс поля с данными одной игры
 * @module LobbyGameData
 */
export default class LobbyGameData extends Block {
    /**
     * {*} data - данные об игре
     * @constructor
     */
    constructor(data) {
        const block = Block.create('div', {}, ['lobbyView__lobbyFields__gameDataField']);
        super(block.el);
        this.bus = eventBus;
        this.gameID = data.gameID;
        this.validationField();
        this.gameDataFields = new GameDataFields(data);
        for (let field in this.gameDataFields.fields) {
            this.append(this.gameDataFields.fields[field]);
        }

        this.gameDataFields.fields.playButton.on('click', () => {
            const data = {
                code: '101',
                gameID: `${this.gameID}`,
            };
            this.bus.emit('connectGame', data);
        });

        this.bus.on('socketCode103', (socketResponse) => {
            if(socketResponse.gameID === this.gameID) {
                let gamersNumberHtml = this.gameDataFields.fields.gamersNumber.el;
                //debugger;
                let gamersNumber = +gamersNumberHtml.innerHTML.match(/\d+/)[0];
                gamersNumber -= 1;
                gamersNumberHtml.innerHTML = gamersNumberHtml.innerHTML.replace(/\d+/g, gamersNumber);
            }
        });



    }

    updateGameData(socketResponse) {
        this.gameDataFields.update(socketResponse)
    }

	validationField() {
		this.bus.on('auth', () => {
			debugger;
			const elements = this.gameDataFields.fields.filter((field) => {
				return field.el.classList.contains('auth');
			});
			elements.forEach((elem) => {
				elem.show();
			})
		});

		this.bus.on('unauth', () => {
			const elements = this.gameDataFields.fields.filter((field) => {
				return field.el.classList.contains('auth');
			});

			elements.forEach((elem) => {
				elem.hide();
			})
		})
	}
}