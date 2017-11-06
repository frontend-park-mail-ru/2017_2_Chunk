# Tower Defense
### 2017_2_Chunk

> ***Не строй башни, не уничтожай врагов!<br>
> (пока только авторизируйся и посмотри на плейсхолдеры)***

Посмотреть работу приложения можно [здесь](https://tower-defense.herokuapp.com/)

## API
| Действие | Тип запроса, URL | Тело запроса | Тело ответа |
| --- | --- | --- | --- |
| Зарегистрироваться | POST, /sign_up | "username", "email", "password" | "username", "email" |
| Авторизоваться | POST, /sign_in | "login", "password" | "username", "email" |
| Изменить профиль текущего пользователя | POST, /update | “username”, ”email”, “password”, “old_password” | "username", "email" |
| Запросить данные пользователя текущей сессии | GET, /whoisit | | "username", "email" | |
| Разлогиниться | GET, /exit |  |  |

