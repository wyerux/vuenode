require('dotenv').config(); // Загружаем переменные из .env файла
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Используем порт из .env или по умолчанию 5000

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// MySQL connection details
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Хост базы данных
  user: process.env.DB_USER, // Имя пользователя базы данных
  password: process.env.DB_PASSWORD, // Пароль от базы данных
  database: process.env.DB_NAME, // Название базы данных
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('MySQL connected...');
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Убрана функция authenticateToken, так как аутентификация больше не требуется

// Создание таблиц и начального пользователя при запуске сервера
const initDatabase = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') NOT NULL
    )
  `;
  const createCustomersTable = `
    CREATE TABLE IF NOT EXISTS customers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      phone VARCHAR(20),
      email VARCHAR(255),
      address TEXT,
      company VARCHAR(255),
      position VARCHAR(255),
      birthdate DATE,
      is_regular BOOLEAN DEFAULT FALSE,
      notes TEXT
    )
  `;
  const createForgeShopTable = `
    CREATE TABLE IF NOT EXISTS forgeshop (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      description TEXT NOT NULL,
      weight DECIMAL(10, 2) NOT NULL,
      length DECIMAL(10, 2) NOT NULL,
      width DECIMAL(10, 2) NOT NULL,
      height DECIMAL(10, 2) NOT NULL,
      temperature INT NOT NULL,
      is_completed BOOLEAN DEFAULT FALSE
    )
  `;

  db.query(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  db.query(createCustomersTable, (err) => {
    if (err) {
      console.error('Error creating customers table:', err.message);
    } else {
      console.log('Customers table created or already exists.');
    }
  });

  db.query(createForgeShopTable, (err) => {
    if (err) {
      console.error('Error creating forgeshop table:', err.message);
    } else {
      console.log('Forgeshop table created or already exists.');
    }
  });

  const checkAdminQuery = 'SELECT COUNT(*) AS adminCount FROM users WHERE role = ?';
  db.query(checkAdminQuery, ['admin'], async (err, result) => {
    if (err) {
      console.error('Error checking admin user:', err.message);
      return;
    }
    const isAdminExists = result[0].adminCount > 0;
    if (!isAdminExists) {
      const hashedPassword = await bcrypt.hash('password', 10);
      const insertAdminQuery = `
        INSERT INTO users (username, password, role)
        VALUES (?, ?, ?)
      `;
      db.query(insertAdminQuery, ['admin', hashedPassword, 'admin'], (err) => {
        if (err) {
          console.error('Error creating admin user:', err.message);
        } else {
          console.log('Admin user created successfully.');
        }
      });
    } else {
      console.log('Admin user already exists.');
    }
  });
};

initDatabase();

// Registration (оставлено для возможного использования в будущем)
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('SELECT COUNT(*) AS adminCount FROM users WHERE role = ?', ['admin'], (err, result) => {
      if (err) {
        console.error('Database error during admin check:', err.message);
        return res.status(500).send('Database error');
      }
      const isAdmin = result[0].adminCount === 0;
      const role = isAdmin ? 'admin' : 'user';
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

// Login (оставлено для возможного использования в будущем)
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
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });
    console.log('Login successful for user:', username);
    res.json({ message: 'Login successful', role: user.role });
  });
});

// Logout (оставлено для возможного использования в будущем)
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

// Получение всех клиентов (без аутентификации)
app.get('/api/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

// Получение клиента по ID (без аутентификации)
app.get('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM customers WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('Customer not found');
    res.json(results[0]);
  });
});

// Создание нового клиента (без аутентификации)
app.post('/api/customers', (req, res) => {
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

// Обновление клиента (без аутентификации)
app.put('/api/customers/:id', (req, res) => {
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

// Удаление клиента (без аутентификации)
app.delete('/api/customers/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM customers WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Customer deleted successfully');
  });
});

// Получение всех товаров (без аутентификации)
app.get('/api/forgeshop', (req, res) => {
  db.query('SELECT * FROM forgeshop', (err, results) => {
    if (err) {
      console.error('Database error during fetching all items:', err.message);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Получение товара по ID (без аутентификации)
app.get('/api/forgeshop/:id', (req, res) => {
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

// Создание нового товара (без аутентификации)
app.post('/api/forgeshop', (req, res) => {
  const { name, image, description, weight, length, width, height, temperature, is_completed } = req.body;

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
      return res.status(500).send('Database error');
    }
    res.status(201).send('Item created successfully');
  });
});

// Обновление товара (без аутентификации)
app.put('/api/forgeshop/:id', (req, res) => {
  const { id } = req.params;
  const { name, image, description, weight, length, width, height, temperature, is_completed } = req.body;

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

// Удаление товара (без аутентификации)
app.delete('/api/forgeshop/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM forgeshop WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Database error during item deletion:', err.message);
      return res.status(500).send('Database error');
    }
    res.send('Item deleted successfully');
  });
});

// Serve static files from the Vue.js build
const publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir));

// Catch-all route for SPA
app.use((req, res, next) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});