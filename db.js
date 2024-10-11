const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Ruta absoluta de la base de datos
const dbPath = path.join(process.cwd(), 'db', 'database.sqlite');

// Conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Crear tabla Roles
    db.run(`CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role_name TEXT NOT NULL UNIQUE
    )`, (err) => {
      if (err) console.error("Error creating roles table:", err.message);
    });

    // Crear tabla Clientes
    db.run(`CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phoneNumber TEXT,
      address TEXT,
      password TEXT NOT NULL,
      role_id INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    )`, (err) => {
      if (err) console.error("Error creating clients table:", err.message);
    });

    // Crear tabla Veterinarios
    db.run(`CREATE TABLE IF NOT EXISTS veterinarians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phoneNumber TEXT,
      address TEXT,
      specialization TEXT,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error("Error creating veterinarians table:", err.message);
    });

    // Crear tabla Deliverys
    db.run(`CREATE TABLE IF NOT EXISTS deliverys (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phoneNumber TEXT,
      address TEXT,
      vehicleType TEXT,
      password TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error("Error creating deliverys table:", err.message);
    });

    // Crear tabla Productos
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error("Error creating products table:", err.message);
    });

    // Crear tabla Mascotas (Pets)
    db.run(`CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER,
      petName TEXT NOT NULL,
      breed TEXT,
      healthNotes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE
    )`, (err) => {
      if (err) console.error("Error creating pets table:", err.message);
    });

    // Crear tabla Servicios
    db.run(`CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      duration TEXT,  -- Por ejemplo, 1h 30m, o podrías usar un campo numérico si prefieres
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error("Error creating services table:", err.message);
    });

    // Crear tabla Carrito (relación cliente-servicio)
    db.run(`CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clientId INTEGER,
      serviceId INTEGER,
      quantity INTEGER DEFAULT 1,
      addedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
      FOREIGN KEY (serviceId) REFERENCES services(id) ON DELETE CASCADE
    )`, (err) => {
      if (err) console.error("Error creating cart table:", err.message);
    });
  }
});

module.exports = db;








