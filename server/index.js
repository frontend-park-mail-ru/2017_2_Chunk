'use strict';

const express = require('express');             // Веб-фреймворк
const morgan = require('morgan');               // Выводит информацию о пришедшем запросе в консоль
const bodyParser = require('body-parser');      // Парсер для тела запроса
const cookieParser = require('cookie-parser');  // Парсер для куков
const idCreator = require('uuid/v4');           // Создает уникальные id
const app = express();


// Middleware
app.use(morgan('dev'));                  // Формат выводимой инфы о запросах
app.use(express.static('./public'));        // Отдаёт статику при совпадении имён
app.use(bodyParser.json());                 // С помощью какой-то древней магии парсит тело запроса,
app.use(cookieParser());                    // всё то же волшебство, но уже для кук

let users = {};
let ids = {};

app.get('/', (request, response) => {
    response.send("<h2><i>Unknown page</i></h2>");
});
app.get('/whoisit', (request, response) => {
    const id = request.cookies['my_cookie'];
    if (id === undefined) {
        response.end("Cookie net, но вы держитесь");
    }
    response.end();
});
app.post('/sign_up', (request, response) => {

    // request и response что за объекты?

    const username = request.body.username;
    const password = request.body.password;

    if (!username || !password) {
        response.status(400).end(JSON.stringify({
            error: "Логин и(или) пароль не указаны"
        }));
        return;
    }
    if (users[username]) {
        return response.status(400).end(JSON.stringify({
            error: ("Пользователь с именем '" + username + "' уже существует!")
        }));
    }

    const new_id = idCreator();
    users[username] = password;      // его вроде хешировать, по хорошему, надо?
    ids[new_id] = username;


    response.cookie(
        'my_cookie', new_id,                        // Название и значение куки
        { expires: new Date(Date.now() + 60 * 5) }  // Время истечения
    );
    response.status(200).end();
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Server run!");
});
