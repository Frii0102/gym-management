# Gym Management System

Система управління спортзалом, розроблена на Node.js, Express, PostgreSQL та Handlebars.

## Можливості системи

- авторизація користувачів (логін/логаут)
- ролі: admin і client з різними правами доступу
- перегляд тренерів, локацій, тренувань, відгуків
- адміністрування користувачів, тренувань, абонементів, оплат
- діаграма абонементів
- експорт та імпорт абонементів у Excel

## Технології

- Node.js
- Express.js
- PostgreSQL
- Handlebars
- Bootstrap 5
- Chart.js
- express-session
- multer
- xlsx

## Структура проєкту

```
gym-management/
├── controllers/        — контролери
├── middleware/         — middleware для авторизації та ролей
├── views/              — шаблони Handlebars
│   └── layouts/        — майстер-сторінка
├── database/
│   └── init.sql        — SQL-скрипт для розгортання БД
├── index.js            — головний файл сервера
├── db.js               — підключення до PostgreSQL
├── .env.example        — приклад змінних середовища
├── .gitignore
└── README.md           — документація проєкту
```
## Як запустити проєкт

### 1. Клонувати репозиторій

```bash
git clone https://github.com/Frii0102/gym-management.git
cd gym-management
```

### 2. Встановити залежності

```bash
npm install
```

### 3. Налаштувати .env

Створіть файл `.env` у корені проєкту на основі `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gym_db
DB_USER=postgres
DB_PASSWORD=your_password
SESSION_SECRET=your_secret_key
```

### 4. Створити базу даних PostgreSQL

Створіть базу даних `gym_db` у PostgreSQL, потім виконайте SQL-скрипт:

```bash
psql -U postgres -d gym_db -f database/init.sql
```

### 5. Запустити сервер

```bash
node index.js
```

Відкрийте браузер: [http://localhost:3000](http://localhost:3000)

## Тестові акаунти

| Роль  | Email           | Пароль |
|-------|-----------------|--------|
| Admin | admin@gym.com   | admin123 |
| Client | client@gym.com | client123 |

## Права доступу

| Функція                        | Admin | Client |
|-------------------------------|-------|--------|
| Перегляд тренерів              | ✅    | ✅     |
| Перегляд локацій               | ✅    | ✅     |
| Перегляд тренувань             | ✅    | ✅     |
| Перегляд відгуків              | ✅    | ✅     |
| Залишити свій відгук           | ✅    | ✅     |
| Управління користувачами       | ✅    | ❌     |
| Додавання тренерів             | ✅    | ❌     |
| Додавання локацій              | ✅    | ❌     |
| Додавання тренувань            | ✅    | ❌     |
| Управління абонементами        | ✅    | ❌     |
| Управління оплатами            | ✅    | ❌     |
| Діаграма та експорт/імпорт     | ✅    | ❌     |