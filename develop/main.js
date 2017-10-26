
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

import Block from "./blocks/block/block.js";

import UserService from "./services/user-service.js";

import EventBus from "./modules/eventBus";

import Router from "./modules/router"

import Message from "./blocks/message/message";


const userService = new UserService();

const eventBus = new EventBus();

const router = new Router(eventBus);

const app = new Block(document.body);

const menuView = new MenuView(eventBus, router);

const signUpView = new SignUpView(eventBus, userService, router);

const loginView = new LoginView(eventBus);

const backButtonView = new BackButtonView();

const profileView = new ProfileView(eventBus);

const rulesView = new RulesView(eventBus);

const scoreboardView = new ScoreboardView(eventBus, userService);


// backButtonView.on("click", function(event) {
// 	window.history.back();
// 	event.preventDefault();
// 	eventBus.emit("openMenu");
// });



loginView.onSubmit(function (formData) {
	userService.login(formData.name, formData.password)
		.then(function(resp) {
			eventBus.emit("openMenu");
		})
		.catch(function(err) {
			console.log("some err with sign up");
			signUpView.setErrorText(err.message)//нужно поставить ошибку из json
		}.bind(this));
}.bind(this));


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
	signUpView.hide();
	backButtonView.hide();
	loginView.hide();
	rulesView.hide();
	scoreboardView.hide();
	menuView.show();

	userService.getDataFetch()
		.then(function(resp) {
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


app
	.append(menuView)
	.append(signUpView)
	.append(loginView)
	.append(backButtonView)
	.append(profileView)
	.append(rulesView)
	.append(scoreboardView);



router.start();



