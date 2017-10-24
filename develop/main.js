
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from "./views/menuView";

import SignUpView from "./views/signUpView";

import LoginView from "./views/loginView";

import BackButtonView from "./views/backButtonView";

import ProfileView from "./views/profileView";

import Block from "./blocks/block/block.js";

import UserService from "./services/user-service.js";

import EventBus from "./modules/eventBus";

import Message from "./blocks/message/message";


const userService = new UserService();

const eventBus = new EventBus();

const app = new Block(document.body);

const menuView = new MenuView(eventBus);

const signUpView = new SignUpView(eventBus);

const loginView = new LoginView(eventBus);

const backButtonView = new BackButtonView();

const profileView = new ProfileView(eventBus);


backButtonView.on("click", function(event) {
	event.preventDefault();
	eventBus.emit("openMenu");
});


signUpView.onSubmit(function (formData) {
	userService.signup(formData.name, formData.email, formData.password, formData.confirm)
		.then(function(resp) {
			eventBus.emit("openMenu");
		})
		.catch(function(err) {
			console.log("some err with sign up");
			signUpView.setErrorText(err.message)//нужно поставить ошибку из json
		}.bind(this));
}.bind(this));


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
	menuView.hide();
	signUpView.show();
	backButtonView.show();
	loginView.hide();
});


eventBus.on("openLogin", function() {
	menuView.hide();
	signUpView.hide();
	backButtonView.show();
	loginView.show();
});


eventBus.on("openMenu", function() {
	menuView.show();
	signUpView.hide();
	backButtonView.hide();
	loginView.hide();

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
});


//отследить ексепшены при отсутствии интернета
eventBus.on("exit", function () {
	userService.logout();
	profileView.hide();
	eventBus.emit("unauth");
	eventBus.emit("openMenu");
});


app
	.append(menuView)
	.append(signUpView)
	.append(loginView)
	.append(backButtonView)
	.append(profileView);


eventBus.emit("openMenu");
