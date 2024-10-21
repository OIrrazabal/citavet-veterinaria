import db from '../../db'; // Importamos la conexión a la base de datos SQLite.

export default function handler(req, res) {
  const { method } = req; // Obtenemos el método de la solicitud.

  // Manejo de la solicitud GET para obtener todos los servicios o uno específico.
  if (method === 'GET') {
    const { id } = req.query;

    if (id) {
      // Buscar un servicio específico por ID
      db.get('SELECT * FROM services WHERE id = ?', [id], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (!row) {
          return res.status(404).json({ message: 'Service not found.' });
        }
        res.status(200).json(row);
      });
    } else {
      // Obtener todos los servicios
      db.all('SELECT * FROM services', [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
      });
    }
  } 

  // Manejo de la solicitud POST para agregar un nuevo servicio
  else if (method === 'POST') {
    const { name, description, price, duration } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!name || !description || !price || !duration) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Insertar el nuevo servicio en la base de datos
    const stmt = db.prepare(
      `INSERT INTO services (name, description, price, duration, createdAt)
       VALUES (?, ?, ?, ?, datetime('now'))`
    );
    
    stmt.run(name, description, price, duration, function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, description, price, duration });
    });
    stmt.finalize();
  } 

  // Manejo de la solicitud PUT para actualizar un servicio existente
  else if (method === 'PUT') {
    const { id, name, description, price, duration } = req.body;

    db.get('SELECT * FROM services WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Service not found.' });
      }

      const stmt = db.prepare(
        `UPDATE services SET name = ?, description = ?, price = ?, 
         duration = ? WHERE id = ?`
      );

      stmt.run(name, description, price, duration, id, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id, name, description, price, duration });
      });
      stmt.finalize();
    });
  } 

  // Manejo de la solicitud DELETE para eliminar un servicio
  else if (method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID is required.' });
    }

    db.get('SELECT * FROM services WHERE id = ?', [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Service not found.' });
      }

      const stmt = db.prepare('DELETE FROM services WHERE id = ?');
      stmt.run(id, function(err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json(row);
      });
      stmt.finalize();
    });
  } 

  // Si se recibe un método no permitido
  else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
