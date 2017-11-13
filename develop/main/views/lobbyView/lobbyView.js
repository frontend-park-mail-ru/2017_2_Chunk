'use strict';
import View from '../view/view';
import lobbyFields from './__lobbyFields/lobbyView__lobbyFields';
import LobbyGameData from './__lobbyFields/__gameDataField/lobbyView__lobbyFields__gameDataField'

/**
 * Класс секции меню
 * @module LoginView
 */
export default class LobbyView extends View {
	constructor(eventBus) {
		super(lobbyFields);
		this.fields = lobbyFields;
		this.bus = eventBus;
		this.el.classList.add('lobbyView');
		this.hide();
		debugger;
		const lobbyGameData = new LobbyGameData();
		const lobbyGameData2 = new LobbyGameData();
		// console.log(lobbyGameData === lobbyGameData2);
		this.elements.gameList.append(lobbyGameData);
		this.elements.gameList.append(lobbyGameData2);
	}
}