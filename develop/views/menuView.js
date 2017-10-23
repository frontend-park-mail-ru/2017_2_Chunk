"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";


export default class MenuView extends CommonView {
	constructor() {
		const menuElems = {
			profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
			play: Block.Create('button', {'data-section': 'play'}, ['button', 'auth'], 'Играть'),
			signup: Block.Create('button', {'data-section': 'signup'}, ['button', 'unauth'], 'Зарегистрироваться'),
			login: Block.Create('button', {'data-section': 'login'}, ['button', 'unauth'], 'Вход'),
			settings: Block.Create('button', {'data-section': 'settings'}, ['button', 'auth'], 'Настройки'),
			rules: Block.Create('button', {'data-section': 'rules'}, ['button', 'unauth'], 'Правила'),
			scores: Block.Create('button', {'data-section': 'scores'}, ['button', 'unauth'], 'Таблица лидеров'),
			exit: Block.Create('button', {'data-section': 'exit'}, ['button', 'auth'], 'Выход'),
		};
		super(menuElems);

	}
}