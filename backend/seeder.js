const { faker } = require('@faker-js/faker'); // Импортируем faker
const mysql = require('mysql2');

// MySQL connection details (используем значения из .env)
const db = mysql.createConnection({
  host: 'br7ht48k7h1bbkpcjwzg-mysql.services.clever-cloud.com', // Хост базы данных
  user: 'uhxjw67kxkzjkg05', // Имя пользователя базы данных
  password: 'vlGkJwj7djnacMwi20IE', // Пароль от базы данных
  database: 'br7ht48k7h1bbkpcjwzg', // Название базы данных
  port: 3306, // Порт базы данных
});


// Функция для генерации случайного числа в диапазоне
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Списки изображений для таблиц
const clientImages = ['cli.png', 'cli1.png', 'cli2.png', 'cli3.png', 'cli4.png', 'cli5.png'];
const apartmentImages = ['kv.png', 'kv2.png', 'kv3.png', 'kv4.png'];

// Генерация данных для таблицы apartments
async function seedApartments() {
  const apartments = [];
  for (let i = 0; i < 100; i++) {
    apartments.push([
      faker.location.streetAddress(), // address
      faker.number.int({ min: 1, max: 5 }), // rooms
      getRandomNumber(30, 200).toFixed(2), // total_area (м²)
      faker.number.int({ min: 1, max: 20 }), // floor
      faker.number.int({ min: 5, max: 30 }), // floors_in_building
      getRandomNumber(1000000, 10000000).toFixed(2), // price (₽)
      faker.helpers.arrayElement(['Косметический', 'Капитальный', 'Евро']), // renovation_type
      faker.lorem.sentence(), // description
      apartmentImages[i % apartmentImages.length], // photo_path (фиксированные изображения)
    ]);
  }

  const query = `
    INSERT INTO apartments (address, rooms, total_area, floor, floors_in_building, price, renovation_type, description, photo_path)
    VALUES ?
  `;

  db.query(query, [apartments], (err) => {
    if (err) {
      console.error('Ошибка при заполнении таблицы apartments:', err.message);
    } else {
      console.log('Таблица apartments успешно заполнена 100 записями.');
    }
  });
}

// Генерация данных для таблицы clients
async function seedClients() {
  const clients = [];
  for (let i = 0; i < 100; i++) {
    const phoneNumber = faker.phone.number('+7 (###) ###-##-##').slice(0, 20); // Ограничиваем длину до 20 символов
    clients.push([
      faker.person.firstName(), // first_name
      faker.person.lastName(), // last_name
      phoneNumber, // phone_number
      faker.internet.email(), // email
      faker.location.streetAddress(), // address
      faker.number.int({ min: 18, max: 80 }), // age
      faker.helpers.arrayElement(['Программист', 'Дизайнер', 'Менеджер', 'Врач', 'Учитель']), // profession
      faker.lorem.sentence(), // description
      clientImages[i % clientImages.length], // photo_path (фиксированные изображения)
    ]);
  }

  const query = `
    INSERT INTO clients (first_name, last_name, phone_number, email, address, age, profession, description, photo_path)
    VALUES ?
  `;

  db.query(query, [clients], (err) => {
    if (err) {
      console.error('Ошибка при заполнении таблицы clients:', err.message);
    } else {
      console.log('Таблица clients успешно заполнена 100 записями.');
    }
  });
}

// Запуск seeder'а
db.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
    return;
  }
  console.log('Подключено к базе данных.');

  // Заполняем таблицы
  seedApartments();
  seedClients();
});