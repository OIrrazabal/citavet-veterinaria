const db = require('./db');

// Leer los registros
db.serialize(() => {
  db.all(`SELECT * FROM pets`, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log(rows);
  });
});

// Cerrar la conexión
db.close();
