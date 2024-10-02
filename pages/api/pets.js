import db from '../../db'; // Importamos la conexión a la base de datos SQLite.

export default function handler(req, res) {
  const { method } = req; // Obtenemos el método de la solicitud (GET, POST, PUT, DELETE).

  // Manejo de la solicitud GET para obtener todas las mascotas o una específica.
  if (method === 'GET') {
    const { id } = req.query; // Extraemos el ID de los parámetros de la URL.

    if (id) {
      // Si se proporciona un ID, buscamos la mascota específica.
      db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message }); // Si hay un error, respondemos con un estado 500.
        }
        if (!row) {
          return res.status(404).json({ message: 'Pet not found.' }); // Si no encontramos la mascota, respondemos con un 404.
        }
        res.status(200).json(row); // Respondemos con los datos de la mascota en formato JSON.
      });
    } else {
      // Si no se proporciona un ID, obtenemos todas las mascotas.
      db.all('SELECT * FROM pets', [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message }); // Si hay un error, respondemos con un estado 500.
        }
        console.log("Datos obtenidos:", rows); // Imprimimos los datos obtenidos en la consola.
        res.status(200).json(rows); // Respondemos con los datos en formato JSON.
      });
    }
  } 
  // Manejo de la solicitud POST para agregar una nueva mascota.
  else if (method === 'POST') {
    const { name, type, owner } = req.body; // Extraemos los datos del cuerpo de la solicitud.

    // Preparamos la consulta SQL para insertar una nueva mascota.
    const stmt = db.prepare(`INSERT INTO pets (name, type, owner) VALUES (?, ?, ?)`);
    
    stmt.run(name, type, owner, function(err) {
      if (err) {
        return res.status(500).json({ error: err.message }); // Si hay un error, respondemos con un estado 500.
      }
      // Respondemos con el ID y los datos de la mascota recién agregada.
      res.status(201).json({ id: this.lastID, name, type, owner });
    });
    stmt.finalize(); // Finalizamos la declaración.
  } 
  // Manejo de la solicitud PUT para actualizar una mascota existente.
  else if (method === 'PUT') {
    const { id, name, type, owner } = req.body; // Extraemos el ID y los datos actualizados del cuerpo de la solicitud.

    // Primero, verificamos si la mascota existe
    db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message }); // Si hay un error, respondemos con un estado 500.
      }
      if (!row) {
        return res.status(404).json({ message: 'Pet not found.' }); // Si no encontramos la mascota, respondemos con un 404.
      }

      // Preparamos la consulta SQL para actualizar los datos de la mascota.
      const stmt = db.prepare(`UPDATE pets SET name = ?, type = ?, owner = ? WHERE id = ?`);

      stmt.run(name, type, owner, id, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message }); // Si hay un error, respondemos con un estado 500.
        }
        // Respondemos con los datos actualizados de la mascota.
        res.status(200).json({ id, name, type, owner });
      });
      stmt.finalize(); // Finalizamos la declaración.
    });
  } 
  // Manejo de la solicitud DELETE para eliminar una mascota.
  else if (method === 'DELETE') {
    const { id } = req.query; // Extraemos el ID de la mascota a eliminar desde los parámetros de la URL.

    // Verificamos que el ID esté presente
    if (!id) {
      return res.status(400).json({ error: 'ID is required.' }); // Si no hay ID, respondemos con un error 400.
    }

    // Primero, verificamos si la mascota existe
    db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message }); // Si hay un error, respondemos con un estado 500.
      }
      if (!row) {
        return res.status(404).json({ message: 'Pet not found.' }); // Si no encontramos la mascota, respondemos con un 404.
      }

      // Si existe, procedemos a eliminarla
      const stmt = db.prepare(`DELETE FROM pets WHERE id = ?`);
      stmt.run(id, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message }); // Si hay un error al eliminar, respondemos con un estado 500.
        }
        // Respondemos con los datos de la mascota eliminada.
        res.status(200).json(row); // Enviamos los datos de la mascota eliminada.
      });
      stmt.finalize(); // Finalizamos la declaración.
    });
  } 
  // Si se recibe un método no permitido, respondemos con un estado 405.
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']); // Especificamos los métodos permitidos.
    res.status(405).end(`Method ${method} Not Allowed`); // Respondemos con un mensaje de error.
  }
}




