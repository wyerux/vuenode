const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// MySQL connection details (используем значения из .env)
const db = mysql.createConnection({
  host: 'br7ht48k7h1bbkpcjwzg-mysql.services.clever-cloud.com', // Хост базы данных
  user: 'uhxjw67kxkzjkg05', // Имя пользователя базы данных
  password: 'vlGkJwj7djnacMwi20IE', // Пароль от базы данных
  database: 'br7ht48k7h1bbkpcjwzg', // Название базы данных
  port: 3306, // Порт базы данных
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1); // Завершаем процесс при ошибке подключения
  }
  console.log('MySQL connected...');
});

// JWT Secret
const JWT_SECRET = '7f8a9b0c1d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4';

// Создание таблиц при запуске сервера
const initDatabase = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role ENUM('admin', 'user') NOT NULL
    )
  `;

  const createApartmentsTable = `
    CREATE TABLE IF NOT EXISTS apartments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      address VARCHAR(255) NOT NULL,
      rooms INT NOT NULL,
      total_area DECIMAL(10, 2) NOT NULL,
      floor INT NOT NULL,
      floors_in_building INT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      renovation_type VARCHAR(255) NOT NULL,
      description TEXT,
      photo_path VARCHAR(255)
    )
  `;

  const createClientsTable = `
    CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      age INT NOT NULL,
      profession VARCHAR(255),
      description TEXT,
      photo_path VARCHAR(255)
    )
  `;

  db.query(createUsersTable, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  db.query(createApartmentsTable, (err) => {
    if (err) {
      console.error('Error creating apartments table:', err.message);
    } else {
      console.log('Apartments table created or already exists.');
    }
  });

  db.query(createClientsTable, (err) => {
    if (err) {
      console.error('Error creating clients table:', err.message);
    } else {
      console.log('Clients table created or already exists.');
    }
  });

  // Проверка существования администратора
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

// Registration
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
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000,
    });
    console.log('Login successful for user:', username);
    res.json({ message: 'Login successful', role: user.role });
  });
});

// Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

// Routes for Apartments
app.get('/api/apartments', (req, res) => {
  db.query('SELECT * FROM apartments', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

app.get('/api/apartments/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM apartments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('Apartment not found');
    res.json(results[0]);
  });
});

app.post('/api/apartments', (req, res) => {
  const { address, rooms, total_area, floor, floors_in_building, price, renovation_type, description, photo_path } = req.body;
  const query = `
    INSERT INTO apartments (address, rooms, total_area, floor, floors_in_building, price, renovation_type, description, photo_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [address, rooms, total_area, floor, floors_in_building, price, renovation_type, description, photo_path], (err) => {
    if (err) return res.status(500).send('Database error');
    res.status(201).send('Apartment created successfully');
  });
});

app.put('/api/apartments/:id', (req, res) => {
  const { id } = req.params;
  const { address, rooms, total_area, floor, floors_in_building, price, renovation_type, description, photo_path } = req.body;
  const query = `
    UPDATE apartments
    SET address = ?, rooms = ?, total_area = ?, floor = ?, floors_in_building = ?, price = ?, renovation_type = ?, description = ?, photo_path = ?
    WHERE id = ?
  `;
  db.query(query, [address, rooms, total_area, floor, floors_in_building, price, renovation_type, description, photo_path, id], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Apartment updated successfully');
  });
});

app.delete('/api/apartments/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM apartments WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Apartment deleted successfully');
  });
});

// Routes for Clients
app.get('/api/clients', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) return res.status(500).send('Database error');
    res.json(results);
  });
});

app.get('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM clients WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send('Database error');
    if (results.length === 0) return res.status(404).send('Client not found');
    res.json(results[0]);
  });
});

app.post('/api/clients', (req, res) => {
  const { first_name, last_name, phone_number, email, address, age, profession, description, photo_path } = req.body;
  const query = `
    INSERT INTO clients (first_name, last_name, phone_number, email, address, age, profession, description, photo_path)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [first_name, last_name, phone_number, email, address, age, profession, description, photo_path], (err) => {
    if (err) return res.status(500).send('Database error');
    res.status(201).send('Client created successfully');
  });
});

app.put('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email, address, age, profession, description, photo_path } = req.body;
  const query = `
    UPDATE clients
    SET first_name = ?, last_name = ?, phone_number = ?, email = ?, address = ?, age = ?, profession = ?, description = ?, photo_path = ?
    WHERE id = ?
  `;
  db.query(query, [first_name, last_name, phone_number, email, address, age, profession, description, photo_path, id], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Client updated successfully');
  });
});

app.delete('/api/clients/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clients WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Database error');
    res.send('Client deleted successfully');
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