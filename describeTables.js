// describeTables.js
const db = require('./db');

const describeTable = (tableName) => {
  return new Promise((resolve, reject) => {
    db.all(`PRAGMA table_info(${tableName});`, [], (err, columns) => {
      if (err) {
        reject(err);
      } else {
        resolve({ tableName, columns });
      }
    });
  });
};

const describeAllTables = async () => {
  const tables = ['clients', 'pets', 'veterinarians', 'deliverys', 'products', 'services'];

  for (const table of tables) {
    try {
      const { tableName, columns } = await describeTable(table);
      console.log(`Columnas en la tabla ${tableName}:`);
      columns.forEach((column) => {
        console.log(`- ${column.name} (${column.type})`);
      });
      console.log('--------------------');
    } catch (error) {
      console.error(`Error al describir la tabla ${table}:`, error.message);
    }
  }

  // Cerrar la base de datos después de que todas las tablas han sido descritas
  db.close((err) => {
    if (err) {
      console.error('Error al cerrar la base de datos:', err.message);
    } else {
      console.log('Conexión a la base de datos cerrada.');
    }
  });
};

describeAllTables();

