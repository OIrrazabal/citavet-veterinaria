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
    origin: 'http://localhost:3000', // Esto es la URL de tu frontend en desarrollo
    credentials: true, // Permitir enviar cookies y autenticación
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  }));

  // Permitir JSON en las solicitudes
  server.use(express.json());

  // Configurar sesiones
  server.use(session({
    secret: 'secreto', // Cambia esto a una clave secreta
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Solo seguro en HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 día de duración de la sesión
    },
  }));

  // Middleware para verificar autenticación
  function verificarAutenticacion(req, res, next) {
    if (req.session.user) {
      next(); // El usuario está autenticado
    } else {
      res.status(401).json({ error: 'No autorizado' }); // Respuesta de error si no está autenticado
    }
  }

  // Rutas de autenticación
  server.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Simular autenticación (ajustar según tu lógica)
    if (email === 'cliente@example.com' && password === 'cliente') {
      const user = { email, role: 'cliente', name: 'Pepe Lopez' }; // Simular el usuario logueado
      req.session.user = user; // Guardar el usuario en la sesión
      return res.json({ user });
    } else {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  });

  server.post('/api/logout', (req, res) => {
    req.session.destroy(); // Elimina la sesión
    res.sendStatus(200); // Respuesta exitosa
  });

  server.get('/api/current_user', (req, res) => {
    if (req.session.user) {
      res.json({ user: req.session.user }); // Devolver el usuario si está autenticado
    } else {
      res.status(401).json({ user: null }); // No autenticado
    }
  });

  // Ruta para obtener el carrito desde la sesión
  server.get('/api/cart', verificarAutenticacion, (req, res) => {
    const cart = req.session.cart || []; // Si no hay carrito en la sesión, retorna un array vacío
    res.json(cart); // Envía el carrito al frontend
  });

  // Ruta para agregar un servicio al carrito
  server.post('/api/cart', verificarAutenticacion, (req, res) => {
    const { service } = req.body; // Recibe el servicio desde el frontend
    if (!service) {
      return res.status(400).json({ error: 'Servicio no proporcionado' }); // Error si no se proporciona el servicio
    }
    if (!req.session.cart) {
      req.session.cart = []; // Inicializa el carrito si está vacío
    }
    req.session.cart.push(service); // Agrega el servicio al carrito
    res.json({ message: 'Servicio agregado al carrito', cart: req.session.cart }); // Retorna el carrito actualizado
  });

  // Ruta para eliminar un servicio del carrito
  server.delete('/api/cart', verificarAutenticacion, (req, res) => {
    const { service } = req.body; // Recibe el servicio desde el frontend
    if (req.session.cart) {
      req.session.cart = req.session.cart.filter((s) => s.id !== service.id); // Elimina por ID en lugar de nombre
    }
    res.json({ message: 'Servicio eliminado del carrito', cart: req.session.cart }); // Retorna el carrito actualizado
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

