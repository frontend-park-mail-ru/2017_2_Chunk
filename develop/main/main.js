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
import ValidationInfoView from './views/gamePrepareView/validationFields/validationInfoField';
import Block from './blocks/block/block.js';
import userService from './services/user-service.js';
import EventBus from './modules/eventBus';
import Router from './modules/router/router';
import ThreeView from './views/treeView/threeView.js';
import Game3D from './game3D/gameMain';
import ServiceWorker from '../workers/serviceWorker';
import SoundsEvents from './services/sound/soundEvents/soundEvents';
import VideoEvents from './services/video/videoEvents/videoEvents';
import MusicPlayer from './services/sound/musicPlayer/musicPlayer';
import TabBlink from './views/tabBlink/tabBlink';
import BackendWaitingAnimation from './services/loaders/backendWaitingAnimation/backendWaitingAnimation';


if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'})
		.then((reg) => {
			console.log('Succeeded registration ' + reg.scope);
		})
		.catch((err) => {
			console.log('Registration error');
		});
	navigator.serviceWorker.ready
		.then(() =>
	{
		const gameNameView = new GameNameView();
		const eventBus = EventBus;
		const app = Block.create('main', {}, [, 'main']);
		app.el.classList.add('main_theme-black-orange');
		document.body.appendChild(app.el);
		const router = new Router();
		const menuView = new MenuView();
		const signUpView = new SignUpView();
		const loginView = new LoginView();
		const updateView = new UpdateView();
		const profileView = new ProfileView();
		const rulesView = new RulesView();
		const backMenuButtonView = new BackMenuButtonView();
		const backButtonView = new BackButtonView();
		const themeButtonView = new ThemeButtonView();
		const scoreboardView = new ScoreboardView();
		const lobbyView = new LobbyView();
		const gameCreateView = new GameCreateView();
		const gamePrepareView = new GamePrepareView();
		const validationInfoView = new ValidationInfoView();
		const gameContainer = new ThreeView();
		const game3D = new Game3D(gameContainer);
		const serviceWorker = ServiceWorker;
		const soundsEvents = new SoundsEvents();
		const videoEvents = new VideoEvents();
		const musicPlayer = new MusicPlayer();
		const tabBlink = new TabBlink();
		const backendWaitingAnimation = new BackendWaitingAnimation();
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


		function hideAllView() {
			Views.forEach((view) => {
				if (!view.hidden)
					view.hide();
			});
		}


		eventBus.on('openSignUp', function () {
			hideAllView();
			gameNameView.show();
			signUpView.show();
			backMenuButtonView.show();
		});
		eventBus.on('openLogin', function () {
			hideAllView();
			gameNameView.show();
			loginView.show();
			backMenuButtonView.show();
		});
		eventBus.on('openUpdate', function () {
			hideAllView();
			gameNameView.show();
			updateView.show();
			backMenuButtonView.show();
		});
		eventBus.on('openRules', function () {
			hideAllView();
			gameNameView.show();
			rulesView.show();
			backMenuButtonView.show();
		});
		eventBus.on('openMenu', function () {
			hideAllView();
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
			hideAllView();
			gameNameView.show();
			scoreboardView.show();
			backMenuButtonView.show();
		});
		eventBus.on('openGame', () => {
			hideAllView();
			backButtonView.show('game');
			gameContainer.show();
		});
		eventBus.on('openLobby', function () {
			hideAllView();
			gameNameView.show();
			backMenuButtonView.show();
			lobbyView.show();
		});
		eventBus.on('openWaitingHall', function () {
			hideAllView();
			gameNameView.show();
			backButtonView.show('waiting-hall');
			gamePrepareView.show();
			validationInfoView.show();
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
			.append(validationInfoView)
			.append(gameContainer);


		const main = document.body;


		function fullScreenOn() {
			document.body.addEventListener('keydown', function (e) {
				if (e.keyCode == 70) {
					main.requestFullscreen();
				}
			}, true);
		}


		function fullScreenOff() {
			document.addEventListener('keydown', function (e) {
				if (e.keyCode == 27) {
					main.cancelFullscreen();
				}
			});
		}


		fullScreenOff();
		fullScreenOn();
// window.onbeforeunload = function() {
// 	return "Вы уверены, что хотите покинут страницу?";
// };
		router.start();
		})
}

