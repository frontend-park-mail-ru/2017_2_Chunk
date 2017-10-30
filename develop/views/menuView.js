"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";

export default class MenuView extends CommonView {
	constructor(eventBus, router) {
		const menuElems = {
			profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
			play: Block.Create('a', {'data-section': 'play', 'href': '/game'}, ['button', 'auth', 'menu__button'], 'Играть'),
			signup: Block.Create('a', {'data-section': 'signup', 'href': '/signup'}, ['button', 'unauth', 'menu__button'], 'Зарегистрироваться'),
			login: Block.Create('a', {'data-section': 'login', 'href': '/login'}, ['button', 'unauth', 'menu__button'], 'Вход'),
			update: Block.Create('a', {'data-section': 'update', 'href': '/update'}, ['button', 'auth', 'menu__button'], 'Настройки'),
			rules: Block.Create('a', {'data-section': 'rules', 'href': '/rules'}, ['button', "every-available", 'menu__button'], 'Правила'),
			scores: Block.Create('a', {'data-section': 'scores', 'href': '/scoreboard'}, ['button', 'unauth', 'menu__button'], 'Таблица лидеров'),
			exit: Block.Create('a', {'data-section': 'exit', 'href': '/exit'}, ['button', 'auth','menu__button'], 'Выход'),
		};
		super(menuElems);


		this.bus = eventBus;

		this.bus.on("unauth", function() {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("unauth") ||
					this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].show();
				}
				else
					this.elements[elem].hide();
			}
		}.bind(this));


		this.bus.on("auth", function() {
			for (let elem in this.elements) {
				if (this.elements[elem].el.classList.contains("auth") ||
					this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].show();
				}
				else
					this.elements[elem].hide();
			}
		}.bind(this));


		this.bus.emit("unauth");
	}
}