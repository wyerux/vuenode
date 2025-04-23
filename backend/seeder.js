const { faker } = require('@faker-js/faker'); // Импортируем faker
const mysql = require('mysql2');

// Создаем подключение к базе данных
const db = mysql.createConnection({
  host: 'bstcg9ifznrw4wz9k0x1-mysql.services.clever-cloud.com', // Хост базы данных
  user: 'uw40ayuqhrvzbokd', // Имя пользователя базы данных
  password: '2zNddQptA5Y0y1IbrTJA', // Пароль от базы данных
  database: 'bstcg9ifznrw4wz9k0x1', // Название базы данных
});

// Функция для генерации случайного числа в диапазоне
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Генерация данных для таблицы forgeshop
async function seedForgeShop() {
  const items = [];
  for (let i = 0; i < 100; i++) {
    items.push([
      `Product ${i + 1}`, // name
      'guz1.png',         // image (фиксированное имя файла)
      `Description for product ${i + 1}`, // description
      getRandomNumber(0.5, 50).toFixed(2), // weight (кг)
      getRandomNumber(10, 200).toFixed(2), // length (см)
      getRandomNumber(5, 100).toFixed(2),  // width (см)
      getRandomNumber(5, 100).toFixed(2),  // height (см)
      faker.number.int({ min: 100, max: 1000 }), // temperature (°C)
      Math.random() < 0.5, // is_completed (случайное значение true/false)
    ]);
  }

  const query = `
    INSERT INTO forgeshop (name, image, description, weight, length, width, height, temperature, is_completed)
    VALUES ?
  `;

  db.query(query, [items], (err) => {
    if (err) {
      console.error('Ошибка при заполнении таблицы forgeshop:', err.message);
    } else {
      console.log('Таблица forgeshop успешно заполнена 100 записями.');
    }
  });
}

// Генерация данных для таблицы customers
async function seedCustomers() {
  const customers = [];
  for (let i = 0; i < 100; i++) {
    customers.push([
      `Customer ${i + 1}`, // full_name
      'cus1.png',          // image (фиксированное имя файла)
      `+123456789${i}`,    // phone (уникальный номер)
      `customer${i + 1}@example.com`, // email
      `Address ${i + 1}`,  // address
      `Company ${i + 1}`,  // company
      `Position ${i + 1}`, // position
      '1990-01-01',         // birthdate (фиксированная дата)
      Math.random() < 0.5,  // is_regular (случайное значение true/false)
      `Notes for customer ${i + 1}`, // notes
    ]);
  }

  const query = `
    INSERT INTO customers (full_name, image, phone, email, address, company, position, birthdate, is_regular, notes)
    VALUES ?
  `;

  db.query(query, [customers], (err) => {
    if (err) {
      console.error('Ошибка при заполнении таблицы customers:', err.message);
    } else {
      console.log('Таблица customers успешно заполнена 100 записями.');
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
  seedForgeShop();
  seedCustomers();
});