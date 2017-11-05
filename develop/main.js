
/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from './views/menuView';

import SignUpView from './views/signUpView';

import LoginView from './views/loginView';

import BackButtonView from './views/backButtonView';

import ProfileView from './views/profileView';

import RulesView from './views/rulesView';

import ScoreboardView from './views/scoreboardView';

import UpdateView from './views/updateView';

import Canvas from './views/canvasView';

import Block from './blocks/block/block.js';

import UserService from './services/user-service.js';

import EventBus from './modules/eventBus';

import Router from './modules/router';

import Game from './Game/game';


const userService = new UserService();

const eventBus = new EventBus();

const app = new Block(document.body);

const router = new Router(eventBus, userService);

const menuView = new MenuView(eventBus, router);

const signUpView = new SignUpView(eventBus, userService, router);

const loginView = new LoginView(eventBus, userService, router);

const updateView = new UpdateView(eventBus, userService, router);

const profileView = new ProfileView(eventBus);

const rulesView = new RulesView(eventBus);

const backButtonView = new BackButtonView();

const scoreboardView = new ScoreboardView(eventBus, userService);

const canvas = new Canvas(eventBus);

const game = new Game(canvas, eventBus);


const Views = [];
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backButtonView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(canvas);


eventBus.on('openSignUp', function () {
	Views.forEach((view) => {
		view.hide();
	});
	signUpView.show();
	backButtonView.show();
});


eventBus.on('openLogin', function () {
	Views.forEach((view) => {
		view.hide();
	});
	loginView.show();
	backButtonView.show();
});


eventBus.on('openUpdate', function () {
	Views.forEach((view) => {
		view.hide();
	});
	updateView.show();
	backButtonView.show();
});


eventBus.on('openRules', function () {
	Views.forEach((view) => {
		view.hide();
	});
	rulesView.show();
	backButtonView.show();
});


eventBus.on('openMenu', function () {
	Views.forEach((view) => {
		view.hide();
	});
	const browserStorage = window.localStorage;
	if (browserStorage.gameID) { browserStorage.removeItem("gameID"); }
	menuView.show();
});


eventBus.on('exit', function () {
	userService.logout();
	eventBus.emit('unauth');
	router.goTo('/menu');
});


eventBus.on('openScoreboard', function () {
	Views.forEach((view) => {
		view.hide();
	});
	scoreboardView.show();
	backButtonView.show();
});


eventBus.on('openGame', function () {
	Views.forEach((view) => {
		view.hide();
	});
	backButtonView.show();
	canvas.show();
	game.startGame(() => router.goTo('/menu')); // выход в меню
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
