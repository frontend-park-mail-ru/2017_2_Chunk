
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from "./views/viewJs/menuView";

import SignUpView from "./views/viewJs/signUpView";

import LoginView from "./views/viewJs/loginView";

import BackButtonView from "./views/viewJs/backButtonView";

import ProfileView from "./views/viewJs/profileView";

import RulesView from "./views/viewJs/rulesView";

import ScoreboardView from "./views/viewJs/scoreboardView";

import UpdateView from "./views/viewJs/updateView";

import Canvas from "./views/viewJs/canvasView";

import Block from "./blocks/block/block.js";

import UserService from "./services/user-service.js";

import EventBus from "./modules/eventBus";

import Router from "./modules/router";

import Game from "./Game/gameHandler";


const userService = new UserService();

const eventBus = new EventBus();

const router = new Router(eventBus, userService);

const app = new Block(document.body);

const menuView = new MenuView(eventBus, router);

const signUpView = new SignUpView(eventBus, userService, router);

const loginView = new LoginView(eventBus, userService, router);

const updateView = new UpdateView(eventBus, userService, router);

const backButtonView = new BackButtonView();

const profileView = new ProfileView(eventBus);

const rulesView = new RulesView(eventBus);

const scoreboardView = new ScoreboardView(eventBus, userService);

const canvas = new Canvas();

const game = new Game(canvas.ctx1, canvas.ctx2, canvas.canv);



const Views = [];
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backButtonView);
Views.push(profileView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(canvas);
// backButtonView.on("click", function(event) {
// 	window.history.back();
// 	event.preventDefault();
// 	eventBus.emit("openMenu");
// });




eventBus.on("openSignUp", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/signup");
	Views.forEach((view) => {
		view.hide();
	});
	signUpView.show();
	backButtonView.show();
});


eventBus.on("openLogin", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/login");
	Views.forEach((view) => {
		view.hide();
	});
	loginView.show();
	backButtonView.show();
});


eventBus.on("openUpdate", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/login");
	Views.forEach((view) => {
		view.hide();
	});
	updateView.show();
	backButtonView.show();
});


eventBus.on("openRules", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/rules");
	Views.forEach((view) => {
		view.hide();
	});
	rulesView.show();
	backButtonView.show();
});


eventBus.on("openMenu", function() {
	// window.history.pushState({page: "signUp"}, "SignUP", "/menu");
	Views.forEach((view) => {
		view.hide();
	});
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
	Views.forEach((view) => {
		view.hide();
	});
	scoreboardView.show();
	backButtonView.show();
});


eventBus.on("openGame", function () {

	// if(router.counter === 0) {
	// 	router.counter +=1;
	// 	document.location.href = "https://amigolandistr.com/ldownload/amigo_dexp.exe?amigo_install=1&partnerid=848000&ext_partnerid=dse.1%3A848001%2Cdse.2%3A848002%2Chp.1%3A848003%2Chp.2%3A848004%2Cpult.1%3A848005%2Cpult.2%3A848006%2Cvbm.1%3A848007%2Cvbm.2%3A848008%2Cany%3A848009&am_default=1&dse_install=1&hp_install=1&vbm_install=1&attr=900029aosg&rfr=900029&ext_params=old_mr1lad%3D59f3d441704a9916-2446909_2008196_48374651204-2446909_2008196_48374651204-2446909_2008196_48374651204%26old_mr1lext%3D2138_gclid%253DEAIaIQobChMIr9OTy4yS1wIVYRbTCh393A_-EAAYASAAEgLmXfD_BwE%2526url%253Dhttp%25253a%25252f%25252fdexp.amigo.mail.ru%2526_1larg_sub%253D48374651204%2526ext_partnerid%253Ddse.1%25253a848001%252Cdse.2%25253a848002%252Chp.1%25253a848003%252Chp.2%25253a848004%252Cpult.1%25253a848005%252Cpult.2%25253a848006%252Cvbm.1%25253a848007%252Cvbm.2%25253a848008%252Cany%25253a848009%2526partnerid%253D848000%26old_VID%3D32lWLp3cwC1d0000060C14nd%253A%253A178610991%253A";
	// 	setTimeout(() => {window.open("https://dexp.amigo.mail.ru/?context=prtnrs&_1lr=0-2446909_2008196_48374651204&source2=2138_gclid%3dCjwKCAjwssvPBRBBEiwASFoVd7oYdBEGmfvVx23YcIJB984HYqMOuZwH3cht1gwTgUaiUfE4ENc_sxoCXqMQAvD_BwE%26url%3dhttp%253a%252f%252fdexp.amigo.mail.ru%26_1larg_sub%3d48374651204%26ext_partnerid%3ddse.1%253a848001%2Cdse.2%253a848002%2Chp.1%253a848003%2Chp.2%253a848004%2Cpult.1%253a848005%2Cpult.2%253a848006%2Cvbm.1%253a848007%2Cvbm.2%253a848008%2Cany%253a848009%26partnerid%3d848000&gclid=CjwKCAjwssvPBRBBEiwASFoVd7oYdBEGmfvVx23YcIJB984HYqMOuZwH3cht1gwTgUaiUfE4ENc_sxoCXqMQAvD_BwE&url=http%3a%2f%2fdexp.amigo.mail.ru&ext_partnerid=dse.1%3a848001,dse.2%3a848002,hp.1%3a848003,hp.2%3a848004,pult.1%3a848005,pult.2%3a848006,vbm.1%3a848007,vbm.2%3a848008,any%3a848009&partnerid=848000");
	// 	}, 500);
	// }
	// else {
		menuView.hide();
		backButtonView.hide();
		scoreboardView.hide();
		profileView.hide();
		loginView.hide();
		signUpView.hide();
		updateView.hide();
		canvas.show();
		game.start(() => router.goTo('/menu'));  //выход в меню
	// }
});


app
	.append(menuView)
	.append(signUpView)
	.append(loginView)
	.append(backButtonView)
	.append(profileView)
	.append(rulesView)
	.append(scoreboardView)
	.append(canvas)
	.append(updateView);


router.start();



