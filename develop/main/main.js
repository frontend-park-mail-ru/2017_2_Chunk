/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import GameNameView from './views/gameNameView/gameNameView';

import MenuView from './views/menuView/menuView';

import SignUpView from './views/signUpView/signUpView';

import LoginView from './views/loginView/loginView';

import BackMenuButtonView from './views/backMenuButtonView/backMenuButtonView';

import BackButtonView from './views/backButtonView/backButtonView';

import ThemeButtonView from './views/themeButtonView/themeButtonView';

import ProfileView from './views/profileView/profileView';

import RulesView from './views/rulesView/rulesView';

import ScoreboardView from './views/scoreboardView/scoreboardView';

import UpdateView from './views/updateView/updateView';

import LobbyView from './views/lobbyView/lobbyView';

import GameCreateView from './views/lobbyView/__gameCreateView/lobbyView__gameCreateView';

import GamePrepareView from './views/gamePrepareView/gamePrepareView';

import Block from './blocks/block/block.js';

import UserService from './services/user-service.js';

import EventBus from './modules/eventBus';

import Router from './modules/router/router';

import ThreeView from './views/treeView/threeView.js';

import Game3D from './game3D/gameMain';

import ServiceWorker from '../../public/serviceWorker';

import visibilityViewer from './services/visibilityViewer/visibilityViewer';

import TabBlink from './views/tabBlink/tabBlink';


const gameNameView = new GameNameView();

const userService = new UserService();

const eventBus = EventBus;

const app = new Block(document.body);

app.el.classList.add('main_theme-black-orange');

const router = new Router(eventBus, userService);

const menuView = new MenuView(eventBus, router);

const signUpView = new SignUpView(eventBus, userService, router);

const loginView = new LoginView(eventBus, userService, router);

const updateView = new UpdateView(eventBus, userService, router);

const profileView = new ProfileView(eventBus);

const rulesView = new RulesView(eventBus);

const backMenuButtonView = new BackMenuButtonView();

const backButtonView = new BackButtonView();

const themeButtonView = new ThemeButtonView();

const scoreboardView = new ScoreboardView(eventBus, userService);

const lobbyView = new LobbyView();

const gameCreateView = new GameCreateView();

const gamePrepareView = new GamePrepareView();

const gameContainer = new ThreeView();

const game3D = new Game3D(gameContainer);

const serviceWorker = ServiceWorker;

const tabBlink = new TabBlink();

const Views = [];
Views.push(gameNameView);
Views.push(menuView);
Views.push(signUpView);
Views.push(loginView);
Views.push(updateView);
Views.push(backMenuButtonView);
Views.push(backButtonView);
Views.push(themeButtonView);
Views.push(rulesView);
Views.push(scoreboardView);
Views.push(lobbyView);
Views.push(gameCreateView);
Views.push(gamePrepareView);
Views.push(gameContainer);


eventBus.on('openSignUp', function () {
	Views.forEach((view) => {
		view.hide();
	});
	gameNameView.show();
	signUpView.show();
	backMenuButtonView.show();
});


eventBus.on('openLogin', function () {
	Views.forEach((view) => {
		view.hide();
	});
	gameNameView.show();
	loginView.show();
	backMenuButtonView.show();
});


eventBus.on('openUpdate', function () {
	Views.forEach((view) => {
		view.hide();
	});
	gameNameView.show();
	updateView.show();
	backMenuButtonView.show();
});


eventBus.on('openRules', function () {
	Views.forEach((view) => {
		view.hide();
	});
	gameNameView.show();
	rulesView.show();
	backMenuButtonView.show();
});


eventBus.on('openMenu', function () {
	Views.forEach((view) => {
		view.hide();
	});
	themeButtonView.show();
	const browserStorage = window.localStorage;
	gameNameView.show();
	if (browserStorage.gameID) {
		browserStorage.removeItem('gameID');
	}

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
	gameNameView.show();
	scoreboardView.show();
	backMenuButtonView.show();
});


eventBus.on('openGame', () => {
	Views.forEach((view) => {
		view.hide();
	});
	backButtonView.show();
	gameContainer.show();
});


eventBus.on('openLobby', function () {
	Views.forEach((view) => {
		view.hide();
	});
	gameNameView.show();
	backMenuButtonView.show();
	lobbyView.show();
});

eventBus.on('openWaitingHall', function () {
	Views.forEach((view) => {
		view.hide();
	});
	gameNameView.show();
	backButtonView.show();
	gamePrepareView.show();
});


app
	.append(gameNameView)
	.append(menuView)
	.append(signUpView)
	.append(loginView)
	.append(backMenuButtonView)
	.append(backButtonView)
	.append(themeButtonView)
	.append(profileView)
	.append(rulesView)
	.append(scoreboardView)
	.append(lobbyView)
	.append(updateView)
	.append(gameCreateView)
	.append(gamePrepareView)
	.append(gameContainer);


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'})
		.then((reg) => {
			console.log('Succeeded registration ' + reg.scope);
		})
		.catch((err) => {
			console.log('Registration error');
		});
}

//убрать адресную строку на мобилке
// document.documentElement.scrollTop;
// document.body.scrollTop;
// window.scrollTo(0, 0);
// window.scrollTo(1, 0)


router.start();
