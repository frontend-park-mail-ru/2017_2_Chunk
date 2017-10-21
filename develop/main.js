import Block from "./blocks/block/index.js";

/**
 * Основной модуль работатющий со всеми объектами
 *@module main
 */

import MenuView from "./views/menuView"

import Scoreboard from "./blocks/scoreboard/index.js";
import Form from "./blocks/form/index.js";
import Message from "./blocks/message/index.js";

import loginFields from "./configs/login-fields";
import signupFields from "./configs/signup-fields";
import UserService from "./services/user-service.js"

const userService = new UserService();

const app = new Block(document.body);

const menuView = new MenuView();

app.append(menuView);

menuView.show();
