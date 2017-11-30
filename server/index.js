'use strict';

const express = require('express'); // Веб-фреймворк
const morgan = require('morgan'); // Выводит информацию о пришедшем запросе в консоль
const bodyParser = require('body-parser'); // Парсер для тела запроса
const cookieParser = require('cookie-parser'); // Парсер для куков
const fallback = require('express-history-api-fallback');
//Переход на https
// const fs = require('fs');
// const key = fs.readFileSync('./server/encryption/private.key');
// const cert = fs.readFileSync( './server/encryption/chunk-frontend.herokuapp.crt' );
// const ca = fs.readFileSync( './server/encryption/chunk-frontend.herokuapp.csr' );
const app = express();
const compass = require('compass');
//
// const options = {
// 	key: key,
// 	cert: cert,
// 	ca: ca
// };

// Отдаёт статику при совпадении имён
let options = {
	redirect: false,
};

app.use(express.static('./public'));
app.use(compass({ cwd: __dirname + 'public' }));
// app.use('/signup', express.static('./public', options));
// app.use('/login', express.static('public', options));
// app.use('/update', express.static('./public', options));
// app.use('/game', express.static('./public', options));
// app.use('/lobby', express.static('./public', options));
// app.use('/rules', express.static('./public', options));
// app.use('/scoreboard', express.static('./public', options));
// app.use('/waiting-hall', express.static('./public', options));
// app.use('/exit', express.static('./public', options));
// app.use('/', express.static('./public', options));

app.use(fallback('index.html', { root: 'public' }));


app.use(bodyParser.json()); // С помощью какой-то древней магии парсит тело запроса,
app.use(cookieParser()); // всё то же волшебство, но уже для кук


// app.get('*', (request, response) => {
// 	response.redirect('/menu');
// });

const https = require('https');
https.createServer(options, app).listen(8082);


app.listen(process.env.PORT || 8081, function () {
	console.log('Server run!');
});
