export default function handler(req, res) {
    if (req.method === 'POST') {
      const { name, type, owner } = req.body;
  
      if (!name || !type || !owner) {
        return res.status(400).json({ message: 'All fields are required: name, type, owner' });
      }
  
      const sql = 'INSERT INTO pets (name, type, owner) VALUES (?, ?, ?)';
      db.run(sql, [name, type, owner], function (err) {
        if (err) {
          return res.status(500).json({ message: 'Error inserting data', error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, type, owner }); // Respuesta con el nuevo ID
      });
    } else if (req.method === 'GET') {
      // Lógica para manejar GET (como ya lo tienes)
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  
