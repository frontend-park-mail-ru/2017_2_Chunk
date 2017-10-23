
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from "./views/menuView";

import SignUpView from "./views/signUpView";

import BackButtonView from "./views/backButtonView"

import Block from "./blocks/block/block.js";

import UserService from "./services/user-service.js";

import EventBus from "./modules/eventBus";

const userService = new UserService();



const app = new Block(document.body);

const menuView = new MenuView();

const eventBus = new EventBus();

const signUpView = new SignUpView();

const backButtonView = new BackButtonView();

menuView.on("click", function(event) {
	event.preventDefault();
	const target = event.target;
	const section = target.getAttribute("data-section");
	switch (section) {
		case 'signup':
			eventBus.emit("openSignUp");
	}
});

backButtonView.on("click", function(event) {
	event.preventDefault();
	eventBus.emit("openMenu");
});



eventBus.on("openSignUp", function() {
	menuView.hide();
});

eventBus.on("openSignUp", function() {
	signUpView.show();
});

eventBus.on("openSignUp", function() {
	backButtonView.show();
});

eventBus.on("openMenu", function() {
	menuView.show();
});

eventBus.on("openMenu", function() {
	signUpView.hide();
});

eventBus.on("openMenu", function() {
	backButtonView.hide();
});


app
	.append(menuView)
	.append(signUpView)
	.append(backButtonView);

menuView.show();

