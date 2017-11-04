"use strict";
import CommonView from "./commonView";
import Block from "../blocks/block/block.js";

export default class MenuView extends CommonView {
	constructor(eventBus, router) {
		const menuElems = {
			profile: Block.Create('div', {'data-section': 'profile'}, ['profile', 'auth'], ''),
			play: Block.Create('a', {'data-section': 'play', 'href': '/game'}, ['button', 'auth', 'menu__button'], 'Play'),
			signup: Block.Create('a', {'data-section': 'signup', 'href': '/signup'}, ['button', 'unauth', 'menu__button'], 'Sign up'),
			login: Block.Create('a', {'data-section': 'login', 'href': '/login'}, ['button', 'unauth', 'menu__button'], 'Login'),
			update: Block.Create('a', {'data-section': 'update', 'href': '/update'}, ['button', 'auth', 'menu__button'], 'Profile'),
			rules: Block.Create('a', {'data-section': 'rules', 'href': '/rules'}, ['button', "every-available", 'menu__button'], 'Rules'),
			scores: Block.Create('a', {'data-section': 'scores', 'href': '/scoreboard'}, ['button', 'every-available', 'menu__button'], 'Scoreboard'),
			exit: Block.Create('a', {'data-section': 'exit', 'href': '/exit'}, ['button', 'auth','menu__button'], 'Exit'),
		};
		super(menuElems);

		this.bus = eventBus;

		this.bus.on("unauth", () => {
			for (let elem in this.elements) {
				if (!this.elements[elem].el.classList.contains("unauth") &&
					!this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].hide();
				}
				else
					this.elements[elem].show();
			}
		});

		this.bus.on("auth", () => {
			for (let elem in this.elements) {
				if (!this.elements[elem].el.classList.contains("auth") &&
					!this.elements[elem].el.classList.contains("every-available")) {
					this.elements[elem].hide();
				}
				else
					this.elements[elem].show();
			}
		});

		this.bus.emit("unauth");
		this.hide();
	}
}