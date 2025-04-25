const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

// MySQL connection details
const db = mysql.createConnection({
  host: 'b1dhoue1m2ldy1eovm1j-mysql.services.clever-cloud.com',
  user: 'u8o8rsrgudy12a4e',
  password: 'Vto2edNgmIxvGfe773cW',
  database: 'b1dhoue1m2ldy1eovm1j',
  port: 3306,
});

// Функция для генерации случайного числа в диапазоне
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Списки изображений и данных для генерации
const carBrands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Ford', 'Chevrolet', 'Volkswagen'];
const carModels = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Prius'],
  Honda: ['Accord', 'Civic', 'CR-V', 'Pilot'],
  BMW: ['X5', 'X3', '3 Series', '5 Series'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC'],
  Audi: ['A4', 'A6', 'Q5', 'Q7'],
  Ford: ['Focus', 'Fiesta', 'Explorer', 'Mustang'],
  Chevrolet: ['Cruze', 'Malibu', 'Tahoe', 'Camaro'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Jetta']
};
const engineTypes = ['Бензин', 'Дизель', 'Гибрид', 'Электрический'];
const transmissions = ['Автомат', 'Механика', 'Робот', 'Вариатор'];
const carImages = ['car1.png', 'car2.png', 'car3.png', 'car4.png', 'car5.png','car6.png','car7.png','car8.png','car9.png',];

const clientImages = ['cus1.png', 'cus2.png', 'cus3.png', 'cus4.png', 'cus5.png', 'cus6.png'];

// Генерация данных для таблицы cars
async function seedCars() {
  const cars = [];
  for (let i = 0; i < 100; i++) {
    const brand = faker.helpers.arrayElement(carBrands);
    const model = faker.helpers.arrayElement(carModels[brand]);
    
    cars.push([
      brand, // brand
      model, // model
      faker.number.int({ min: 2000, max: 2023 }), // year
      getRandomNumber(500000, 5000000).toFixed(2), // price
      faker.number.int({ min: 0, max: 200000 }), // mileage
      faker.helpers.arrayElement(engineTypes), // engine_type
      faker.helpers.arrayElement(transmissions), // transmission
      faker.lorem.sentences(2), // description
      carImages[i % carImages.length], // photo_path
    ]);
  }

  const query = `
    INSERT INTO cars (brand, model, year, price, mileage, engine_type, transmission, description, photo_path)
    VALUES ?
  `;

  db.query(query, [cars], (err) => {
    if (err) {
      console.error('Ошибка при заполнении таблицы cars:', err.message);
    } else {
      console.log('Таблица cars успешно заполнена 100 записями.');
    }
  });
}

// Генерация данных для таблицы clients (новая версия)
async function seedClients() {
  const clients = [];
  for (let i = 0; i < 100; i++) {
    const phoneNumber = faker.phone.number('+7 (###) ###-##-##').slice(0, 20);
    clients.push([
      faker.person.firstName(), // first_name
      faker.person.lastName(), // last_name
      phoneNumber, // phone_number
      faker.internet.email(), // email
      faker.location.streetAddress(), // address
      faker.number.int({ min: 18, max: 80 }), // age
      faker.helpers.arrayElement(['Программист', 'Дизайнер', 'Менеджер', 'Врач', 'Учитель']), // profession
      faker.lorem.sentence(), // description
      clientImages[i % clientImages.length], // photo_path
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
  seedCars();
  seedClients();
});