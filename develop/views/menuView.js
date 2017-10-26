"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";

export default class MenuView extends CommonView {
	constructor(eventBus, router) {
		const menuElems = {
			profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
			play: Block.Create('a', {'data-section': 'play', 'href': '/play'}, ['button', 'auth', 'menu__button'], 'Играть'),
			signup: Block.Create('a', {'data-section': 'signup', 'href': '/signup'}, ['button', 'unauth', 'menu__button'], 'Зарегистрироваться'),
			login: Block.Create('a', {'data-section': 'login', 'href': '/login'}, ['button', 'unauth', 'menu__button'], 'Вход'),
			settings: Block.Create('a', {'data-section': 'settings', 'href': '/settings'}, ['button', 'auth', 'menu__button'], 'Настройки'),
			rules: Block.Create('a', {'data-section': 'rules', 'href': '/rules'}, ['button', "every-available", 'menu__button'], 'Правила'),
			scores: Block.Create('a', {'data-section': 'scores', 'href': '/scoreboard'}, ['button', 'unauth', 'menu__button'], 'Таблица лидеров'),
			exit: Block.Create('a', {'data-section': 'exit', 'href': '/exit'}, ['button', 'auth','menu__button'], 'Выход'),
		};
		super(menuElems);


		this.bus = eventBus;
		this.router = router;

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



		// this.on("click", function(event) {
		// 	// console.log('click!');
		// 	// router.goTo(event.target.href);
		// 	event.preventDefault();
		// 	debugger;
		// 	const target = event.target;
		// 	const section = target.getAttribute("data-section");
		// 	switch (section) {
		// 		case 'signup':
		// 			this.bus.emit("openSignUp");
		// 			break;
		// 		case 'exit':
		// 			this.bus.emit("exit");
		// 			break;
		// 		case 'login':
		// 			this.bus.emit("openLogin");
		// 			break;
		// 		case 'rules':
		// 			this.bus.emit("openRules");
		// 			break;
		// 		case 'scores':
		// 			const users = [
		// 				{name: "Igor", score: "1904"},
		// 				{name: "Nina", score: "2015"},
		// 				{name: "Lesha", score: "2001"}];
		// 			this.bus.emit("openScoreboard", users);
		// 			break;
		// 	}
		// }.bind(this));

		this.bus.emit("unauth");
	}
}