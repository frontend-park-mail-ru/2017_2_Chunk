
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from "./views/menuView";

import SignUpView from "./views/signUpView";

import BackButtonView from "./views/backButtonView"

import ProfileView from "./views/profileView"

import Block from "./blocks/block/block.js";

import UserService from "./services/user-service.js";

import EventBus from "./modules/eventBus";

	import Message from "./blocks/message/message";


const userService = new UserService();

const eventBus = new EventBus();

const app = new Block(document.body);

const menuView = new MenuView(eventBus);

const signUpView = new SignUpView();

const backButtonView = new BackButtonView();

const profileView = new ProfileView(eventBus);


menuView.on("click", function(event) {
	event.preventDefault();
	const target = event.target;
	const section = target.getAttribute("data-section");
	switch (section) {
		case 'signup':
			eventBus.emit("openSignUp");
			break;
		case 'exit':
			eventBus.emit("exit");
			break;
	}
});


backButtonView.on("click", function(event) {
	event.preventDefault();
	eventBus.emit("openMenu");
});


signUpView.onSubmit(function (formData) {
	signUpView.message = new Message();
	signUpView.message.clear();
	signUpView.message.hide();
	signUpView.append(signUpView.message);
	userService.signup(formData.name, formData.email, formData.password, formData.confirm)
		.then(function(resp) {
			eventBus.emit("openMenu");

		})
		.catch(function(err) {
			signUpView.message.setText(err.message);
			signUpView.message.show();
		}.bind(this));

}.bind(this));


eventBus.on("openSignUp", function() {
	menuView.hide();
	signUpView.show();
	backButtonView.show();
});

eventBus.on("openMenu", function() {
	menuView.show();
	signUpView.hide();
	backButtonView.hide();

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
	.append(backButtonView)
	.append(profileView);

eventBus.emit("openMenu");
