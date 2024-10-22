const express = require('express');
const session = require('express-session'); // Importar express-session
const cors = require('cors'); // Importar CORS para permitir la comunicación entre frontend y backend
const next = require('next'); // Importar Next.js
const services = require('./data/services'); // Ajusta la ruta según tu estructura de carpetas

const port = 3000;
const dev = process.env.NODE_ENV !== 'development'; // Determinar si está en desarrollo o producción
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
  /* function verificarAutenticacion(req, res, next) {
    if (req.session.user) {
      next(); // El usuario está autenticado
    } else {
      res.status(401).json({ error: 'No autorizado' }); // Respuesta de error si no está autenticado
    }
  } */

  // Rutas de autenticación
  server.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Simular autenticación (ajustar según tu lógica)
    if (email === 'cliente@example.com' && password === 'cliente') {
      const user = { email, role: 'cliente', name: 'Pepe Lopez' }; // Simular el usuario logueado
      req.session.user = user; // Guardar el usuario en la sesión
      console.log(`Usuario autenticado: ${JSON.stringify(user)}`); // Log de autenticación
      return res.json({ user });
    } else {
      console.log('Intento de inicio de sesión fallido'); // Log de error
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
  });

  server.post('/api/logout', (req, res) => {
    req.session.destroy(); // Elimina la sesión
    console.log('Sesión eliminada'); // Log de sesión eliminada
    res.sendStatus(200); // Respuesta exitosa
  });

  server.get('/api/current_user', (req, res) => {
    if (req.session.user) {
      console.log(`Usuario actual: ${JSON.stringify(req.session.user)}`); // Log del usuario actual
      res.json({ user: req.session.user }); // Devolver el usuario si está autenticado
    } else {
      console.log('No hay usuario autenticado'); // Log de no autenticación
      res.status(401).json({ user: null }); // No autenticado
    }
  });

  // Ruta para obtener el carrito desde la sesión
  server.get('/api/cart', /*verificarAutenticacion,*/ (req, res) => {
    const cart = req.session.cart || []; // Si no hay carrito en la sesión, retorna un array vacío
    console.log(`Carrito actual: ${JSON.stringify(cart)}`); // Log del carrito
    res.json(cart); // Envía el carrito al frontend
  });

  // Ruta para agregar un servicio al carrito
  server.post('/api/cart', /* verificarAutenticacion, */ (req, res) => {
    const { serviceId } = req.body; // Recibe el id del servicio desde el frontend
    console.log(`Solicitud para agregar servicio ID: ${serviceId}`); // Log de solicitud

    // Verifica que se haya proporcionado un id de servicio
    if (!serviceId) {
      console.log('ID del servicio no proporcionado'); // Log de error
      return res.status(400).json({ error: 'ID del servicio no proporcionado' });
    }

    // Buscar el servicio por id
    const service = services.find(s => s.id == serviceId);
    
    // Si el servicio no existe, devolver error
    if (!service) {
      console.log('Servicio no encontrado'); // Log de error
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    // Si no existe un carrito en la sesión, inicializarlo
    if (!req.session.cart) {
      req.session.cart = [];
      console.log('Carrito inicializado'); // Log de inicialización
    }

    // Agregar el servicio al carrito
    req.session.cart.push(service);
    console.log(`Servicio agregado al carrito: ${JSON.stringify(service)}`); // Log del servicio agregado

    // Responder con el carrito actualizado
    res.json({ message: 'Servicio agregado al carrito', cart: req.session.cart });
  });

// Ruta para eliminar un servicio del carrito
server.delete('/api/cart', /*verificarAutenticacion,*/ (req, res) => {
  const { serviceId } = req.body; // Cambiamos aquí para obtener directamente el serviceId
  console.log(`Solicitud para eliminar servicio ID: ${serviceId}`); // Log de solicitud

  if (req.session.cart) {
    const originalLength = req.session.cart.length; // Longitud original del carrito
    req.session.cart = req.session.cart.filter((s) => s.id !== serviceId); // Elimina por ID

    if (req.session.cart.length < originalLength) {
      console.log(`Servicio eliminado del carrito: ID ${serviceId}`); // Log del servicio eliminado
    } else {
      console.log(`Servicio no encontrado en el carrito: ID ${serviceId}`); // Log de no encontrado
    }

    console.log('Carrito después de la eliminación:', req.session.cart); // Log del carrito actualizado
  } else {
    console.log('No hay carrito en la sesión'); // Log de carrito no existente
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
