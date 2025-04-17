const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection details
const db = mysql.createConnection({
  host: 'localhost', // Хост базы данных
  user: 'root',      // Имя пользователя базы данных
  password: '',      // Пароль от базы данных (если нет пароля, оставьте пустым)
  database: 'forge', // Название базы данных
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Завершаем процесс, если ошибка
  }
  console.log('MySQL connected...');
});

// JWT Secret
const JWT_SECRET = 'f1d2e3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2'; // Замените на ваш секретный ключ

// Helper function to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Registration
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  // Проверяем, что username и password переданы
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Проверяем, есть ли уже администратор
    db.query('SELECT COUNT(*) AS adminCount FROM users WHERE role = ?', ['admin'], (err, result) => {
      if (err) {
        console.error('Database error during admin check:', err.message);
        return res.status(500).send('Database error');
      }

      const isAdmin = result[0].adminCount === 0; // Первый пользователь становится админом
      const role = isAdmin ? 'admin' : 'user';

      // Добавляем пользователя в базу данных
      db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, role],
        (err) => {
          if (err) {
            console.error('Database error during registration:', err.message);
            return res.status(500).send('Registration failed');
          }
          res.status(201).send({ message: 'User registered successfully', role });
        }
      );
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).send('Internal server error');
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.error('Missing username or password in login request');
    return res.status(400).send('Username and password are required');
  }

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      console.error('Database error during login:', err.message);
      return res.status(500).send('Database error');
    }

    if (results.length === 0) {
      console.error('User not found:', username);
      return res.status(400).send('Invalid credentials');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Invalid password for user:', username);
      return res.status(400).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful for user:', username);

    res.json({ token, role: user.role });
  });
});

// Получение всех клиентов
app.get('/api/customers', authenticateToken, (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

// Получение клиента по ID
app.get('/api/customers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('Customer not found');
    res.json(results[0]);
  });
});

// Создание нового клиента
app.post('/api/customers', authenticateToken, (req, res) => {
  const { full_name, image, phone, email, address, company, position, birthdate, is_regular, notes } = req.body;
  const query = `
    INSERT INTO customers (full_name, image, phone, email, address, company, position, birthdate, is_regular, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(
    query,
    [full_name, image, phone, email, address, company, position, birthdate, is_regular, notes],
    (err) => {
      if (err) return res.status(500).send('Database error');
      res.status(201).send('Customer created successfully');
    }
  );
});

// Обновление клиента
app.put('/api/customers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { full_name, image, phone, email, address, company, position, birthdate, is_regular, notes } = req.body;
  const query = `
    UPDATE customers
    SET full_name = ?, image = ?, phone = ?, email = ?, address = ?, company = ?, position = ?, birthdate = ?, is_regular = ?, notes = ?
    WHERE id = ?
  `;
  db.query(
    query,
    [full_name, image, phone, email, address, company, position, birthdate, is_regular, notes, id],
    (err) => {
      if (err) return res.status(500).send('Database error');
      res.send('Customer updated successfully');
    }
  );
});

// Удаление клиента
app.delete('/api/customers/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Customer deleted successfully');
  });
});

// **API для ForgeShop**

// Получение всех товаров
app.get('/api/forgeshop', authenticateToken, (req, res) => {
  db.query('SELECT * FROM forgeshop', (err, results) => {
    if (err) {
      console.error('Database error during fetching all items:', err.message);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Получение товара по ID
app.get('/api/forgeshop/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM forgeshop WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Database error during fetching item by ID:', err.message);
      return res.status(500).send('Database error');
    }
    if (results.length === 0) {
      return res.status(404).send('Item not found');
    }
    res.json(results[0]);
  });
});

// Создание нового товара
app.post('/api/forgeshop', authenticateToken, (req, res) => {
  const { name, image, description, weight, length, width, height, temperature, is_completed } = req.body;

  // Проверяем, что все обязательные поля заполнены
  if (!name || !image || !description || weight == null || length == null || width == null || height == null || temperature == null || is_completed == null) {
    return res.status(400).send('Missing required fields');
  }

  const query = `
    INSERT INTO forgeshop (name, image, description, weight, length, width, height, temperature, is_completed)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, image, description, weight, length, width, height, temperature, is_completed], (err) => {
    if (err) {
      console.error('Database error during item creation:', err.message);
      console.error('Query:', query); // Логируем запрос
      console.error('Parameters:', [name, image, description, weight, length, width, height, temperature, is_completed]); // Логируем параметры
      return res.status(500).send('Database error');
    }
    res.status(201).send('Item created successfully');
  });
});

// Обновление товара
app.put('/api/forgeshop/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, image, description, weight, length, width, height, temperature, is_completed } = req.body;

  // Проверяем, что все обязательные поля заполнены
  if (!name || !image || !description || weight == null || length == null || width == null || height == null || temperature == null || is_completed == null) {
    return res.status(400).send('Missing required fields');
  }

  const query = `
    UPDATE forgeshop
    SET name = ?, image = ?, description = ?, weight = ?, length = ?, width = ?, height = ?, temperature = ?, is_completed = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [name, image, description, weight, length, width, height, temperature, is_completed, id],
    (err) => {
      if (err) {
        console.error('Database error during item update:', err.message);
        return res.status(500).send('Database error');
      }
      res.send('Item updated successfully');
    }
  );
});

// Удаление товара
app.delete('/api/forgeshop/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM forgeshop WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Database error during item deletion:', err.message);
      return res.status(500).send('Database error');
    }
    res.send('Item deleted successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});