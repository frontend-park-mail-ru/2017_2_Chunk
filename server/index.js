'use strict';

const cool = require('cool-ascii-faces');
const express = require('express'); // Веб-фреймворк
const morgan = require('morgan'); // Выводит информацию о пришедшем запросе в консоль
const bodyParser = require('body-parser'); // Парсер для тела запроса
const cookieParser = require('cookie-parser'); // Парсер для куков
const idCreator = require('uuid/v4');
// Создает уникальные id
const app = express();


// Middleware

// Отдаёт статику при совпадении имён
app.use('/menu', express.static('./public'));
app.use('/signup', express.static('./public'));
app.use('/login', express.static('./public'));
app.use('/update', express.static('./public'));
app.use('/game', express.static('./public'));
app.use('/rules', express.static('./public'));
app.use('/scoreboard', express.static('./public'));
app.use('/exit', express.static('./public'));


app.use(bodyParser.json()); // С помощью какой-то древней магии парсит тело запроса,
app.use(cookieParser()); // всё то же волшебство, но уже для кук

//
app.get('/', (request, response) => {
	response.redirect('/menu');
});

app.get('*', (request, response) => {
	response.redirect('/menu');
});


app.listen(process.env.PORT || 8081, function () {
	console.log('Server run!');
});
