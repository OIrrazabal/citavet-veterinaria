// server.js
const express = require('express');
const session = require('express-session'); // Importar express-session
const cors = require('cors'); // Importar CORS para permitir la comunicación entre frontend y backend
const next = require('next'); // Importar Next.js

const port = 3000;
const dev = process.env.NODE_ENV !== 'production'; // Determinar si está en desarrollo o producción
const app = next({ dev }); // Inicializar Next.js
const handle = app.getRequestHandler(); // Obtener el manejador de solicitudes de Next.js

app.prepare().then(() => {
  const server = express();

  // Configurar CORS para permitir las solicitudes entre tu frontend (Next.js) y backend (Express)
  server.use(cors({
    origin: 'http://localhost:3000', // Esto es la URL de tu frontend
    credentials: true, // Permitir enviar cookies y autenticación
  }));

  // Configurar sesiones
  server.use(session({
    secret: 'mi_secreto', // Cambia esto por algo más seguro
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
  }));

  // Permitir JSON en las solicitudes
  server.use(express.json());

  // Ruta para obtener el carrito desde la sesión
  server.get('/api/cart', (req, res) => {
    const cart = req.session.cart || []; // Si no hay carrito en la sesión, retorna un array vacío
    res.json(cart); // Envía el carrito al frontend
  });

  // Ruta para agregar un servicio al carrito
  server.post('/api/cart', (req, res) => {
    const { service } = req.body; // Recibe el servicio desde el frontend
    if (!req.session.cart) {
      req.session.cart = []; // Inicializa el carrito si está vacío
    }
    req.session.cart.push(service); // Agrega el servicio al carrito
    res.json({ message: 'Servicio agregado al carrito', cart: req.session.cart }); // Retorna el carrito actualizado
  });

  // Delegar el manejo de todas las rutas a Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Iniciar el servidor
  server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}).catch((err) => {
  console.error(err.stack);
  process.exit(1);
});

