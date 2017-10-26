'use strict';

const cool = require('cool-ascii-faces');
const express = require('express');             // Веб-фреймворк
const morgan = require('morgan');               // Выводит информацию о пришедшем запросе в консоль
const bodyParser = require('body-parser');      // Парсер для тела запроса
const cookieParser = require('cookie-parser');  // Парсер для куков
const idCreator = require('uuid/v4');           // Создает уникальные id
const app = express();


// const {pug_escape, template} = require("./recordList");
//
// console.log(template({name: 'Igor'}));
// console.log(template({name: 'Igor'}));



// Middleware

// app.use(morgan('dev'));                     // Формат выводимой инфы о запросах
// app.use("/", express.static('./public'));// Отдаёт статику при совпадении имён
app.use("/menu", express.static('./public'));
app.use("/sign_up", express.static('./public'));
app.use("/login", express.static('./public'));
app.use("/rules", express.static('./public'));
app.use("/scoreboard", express.static('./public'));
// app.use("/exit", express.static('./public'));


app.use(bodyParser.json());                 // С помощью какой-то древней магии парсит тело запроса,
app.use(cookieParser());                    // всё то же волшебство, но уже для кук

let users = {};
let ids = {};
const ttl = 1000 * 60 * 60 * 24;            // 1 день

//
app.get('/', (request, response) => {
	response.redirect("/menu")
});


app.get('/whoisit', (request, response) => {

	// Вытаскиваем нужную куку
	console.log('my cookie = ', request.cookies['my_cookie']);
	const id = request.cookies['my_cookie'];
	console.log('my id: ', id);

	// Устанавливаем заголовки ответа
	response.set('Content-Type', 'application/json; charset=utf8');

	// array[undefined] === undefined
	!ids[id] ? response.status(404).end() :
		response.status(200).send(JSON.stringify({username: ids[id]}));

});

app.get('/exit', (request, response) => {
	console.log('URL = /exit');

	console.log('try to find coockie');
	response.cookie('my_cookie', null, {
		expires: new Date(Date.now() - ttl)
	});

	response.status(200).end();
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.post('/sign_up', (request, response) => {

	console.log("in server");
	const username = request.body.username;
	const email = request.body.email;
	const password = request.body.password;

	console.log(username, password);
	// Устанавливаем заголовок ответа
	response.set('Content-Type', 'application/json; charset=utf8');

	if (!username || !password) {
		return response.status(400).send(JSON.stringify({
			message: "Логин и(или) пароль не указаны"
		}));
	}
	if (username === password) {
		return response.status(400).send(JSON.stringify({
			message: "Пароль и логин совпадают"
		}));
	}
	if (users[username]) {
		return response.status(400).send(JSON.stringify({
			message: "Пользователь существует"
		}));
		}

	const new_id = idCreator();
	users[username] = password;
	ids[new_id] = username;

	response.cookie('my_cookie', new_id, {          // Название и значение куки
		expires: new Date(Date.now() + ttl)        // Время жизни куки
	});
	console.log("resp status 200");
	response.status(200).send(JSON.stringify({username: username, email: email}));
});



app.post('/sign_in', (request, response) => {

	const username = request.body.email;
	const password = request.body.password;
	console.log(username, password);


	// Устанавливаем заголовок ответа
	response.set('Content-Type', 'application/json; charset=utf8');

	if (!username || !password) {
		return response.status(400).send(JSON.stringify({
			errorMessage: "Логин и(или) пароль не указаны"
		}))
	}
	if (users[username] !== password) {
		return response.status(400).send(JSON.stringify({
			errorMessage: "Неверные логин и(или) пароль"
		}))
	}

	const new_id = idCreator();
	ids[new_id] = username;
	response.cookie('my_cookie', new_id, {
		expires: new Date(Date.now() + ttl)
	});
	response.status(200).end();
});


app.listen(process.env.PORT || 8081, function () {
    console.log("Server run!");
});
