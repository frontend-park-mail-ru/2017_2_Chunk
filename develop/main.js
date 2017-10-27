
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from "./views/menuView";

import SignUpView from "./views/signUpView";

import LoginView from "./views/loginView";

import BackButtonView from "./views/backButtonView";

import ProfileView from "./views/profileView";

import RulesView from "./views/rulesView";

import ScoreboardView from "./views/scoreboardView";

import Canvas from "./views/canvasView";

import Block from "./blocks/block/block.js";

import UserService from "./services/user-service.js";

import EventBus from "./modules/eventBus";

import Router from "./modules/router";

import Game from "./Andrey/gameHandler";



const userService = new UserService();

const eventBus = new EventBus();

const router = new Router(eventBus, userService);

const app = new Block(document.body);

const menuView = new MenuView(eventBus, router);

const signUpView = new SignUpView(eventBus, userService, router);

const loginView = new LoginView(eventBus, userService, router);

const backButtonView = new BackButtonView();

const profileView = new ProfileView(eventBus);

const rulesView = new RulesView(eventBus);

const scoreboardView = new ScoreboardView(eventBus, userService);

const canvas1 = new Canvas(1, "canv1");

const canvas2 = new Canvas(2, "canv2");


// backButtonView.on("click", function(event) {
// 	window.history.back();
// 	event.preventDefault();
// 	eventBus.emit("openMenu");
// });



eventBus.on("openSignUp", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/signup");
	menuView.hide();
	signUpView.show();
	backButtonView.show();
	loginView.hide();
	scoreboardView.hide();
});


eventBus.on("openLogin", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/login");
	menuView.hide();
	signUpView.hide();
	backButtonView.show();
	loginView.show();
	rulesView.hide();
});


eventBus.on("openRules", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/rules");
	menuView.hide();
	signUpView.hide();
	backButtonView.show();
	loginView.hide();
	rulesView.show();
});


eventBus.on("openMenu", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/menu");
	canvas1.hide();
	canvas2.hide();
	signUpView.hide();
	backButtonView.hide();
	loginView.hide();
	rulesView.hide();
	scoreboardView.hide();
	menuView.show();


	userService.getDataFetch()
		.then(function(resp) {
			console.log(resp);
			eventBus.emit("auth", resp.username)
		})
		.catch(function(err) {
			const user = {username: null};
			profileView.render(user.username);
			profileView.hide();
			console.log(err.message);
		})
}.bind(this));


//отследить ексепшены при отсутствии интернета
eventBus.on("exit", function () {
	userService.logout();
	profileView.hide();
	eventBus.emit("unauth");
	router.goTo('/menu');
});


eventBus.on("openScoreboard", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/scoreboard");
	menuView.hide();
	backButtonView.show();
	scoreboardView.show();
});

const game = new Game(canvas1, canvas2);

eventBus.on("openGame", function () {
	// window.history.pushState({page: "signUp"}, "SignUP", "/scoreboard");
	menuView.hide();
	backButtonView.hide();
	scoreboardView.hide();
	profileView.hide();
	loginView.hide();
	signUpView.hide();
	game.start(() => router.goTo('/menu'));  //выход в меню
});


app
	.append(menuView)
	.append(signUpView)
	.append(loginView)
	.append(backButtonView)
	.append(profileView)
	.append(rulesView)
	.append(scoreboardView)
	.append(canvas1)
	.append(canvas2);



router.start();



