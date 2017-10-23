"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";


export default class MenuView extends CommonView {
	constructor(eventBus) {
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

		this.bus = eventBus;

		this.bus.on("unauth", function() {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("unauth")) {
					this.elements[elem].show();
				}
				else
					this.elements[elem].hide();
			}
		}.bind(this));

		this.bus.on("auth", function() {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("auth")) {
					this.elements[elem].show();
				}
				else
					this.elements[elem].hide();
			}
		}.bind(this));

		this.bus.emit("unauth");
	}
}