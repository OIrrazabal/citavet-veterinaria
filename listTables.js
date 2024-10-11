const db = require('./db'); // Asegúrate de que la ruta sea correcta

db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
  if (err) {
    throw err;
  }
  console.log("Tablas en la base de datos:");
  tables.forEach((table) => {
    console.log(table.name);
  });
});
