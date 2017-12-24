# 2017_2_Chunk

## GUARDIANS
> ***Поглощай или будь поглощен<br>***
> (пока только авторизируйся и посмотри на плейсхолдеры)


Посмотреть работу приложения можно [здесь](https://chunk-frontend.herokuapp.com/menu)<br>
Репозиторий github серверной части можно увидить [здесь](https://github.com/java-park-mail-ru/Chunk-09-2017)

## Travis deploy status [![Build Status](https://travis-ci.org/frontend-park-mail-ru/2017_2_Chunk.svg?branch=travis)](https://travis-ci.org/frontend-park-mail-ru/2017_2_Chunk)

## How to install localy
### 1
- clone or download [repository](https://github.com/frontend-park-mail-ru/2017_2_Chunk/tree/drujinin)
- `$ cd /home/.../2017_2_Chunk`
- run `$ npm install`
- run `$ npm run start`

### 2
- clone or download [repository](https://github.com/java-park-mail-ru/Chunk-09-2017)
- `$ cd /home/.../Chunk-09-2017`
- run `$ mvn install`
- run `$ java -jar ./target/Chunk-1.0-SNAPSHOT.jar`

### 3
- open localy *url(127.0.0.1:8081)*
- ready!

## Members
* Андрей Савосин
* Игорь Дружинин
* Дима Трубников

## API
| Действие | Тип запроса, URL | Тело запроса | Тело ответа |
| --- | --- | --- | --- |
| Зарегистрироваться | POST, /sign_up | "username", "email", "password" | "username", "email" |
| Авторизоваться | POST, /sign_in | "login", "password" | "username", "email" |
| Изменить профиль текущего пользователя | POST, /update | “username”, ”email”, “password”, “old_password” | "username", "email" |
| Запросить данные пользователя текущей сессии | GET, /whoisit | | "username", "email" | |
| Разлогиниться | GET, /exit |  |  |

## About project
### We use:
- node js
- ES6
- babel
- webpack
- tree js
- visability js
- service worker
- derived workers
- shared workers
- scss
- web video API
- web audio API
