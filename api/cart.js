
const express = require('express');
const router = express.Router();
const services = require('../data/services'); // Ensure this file has all services

// Add to cart endpoint
router.post('/', (req, res) => {
  const { serviceId } = req.body;
  console.log(`Solicitud para agregar servicio ID: ${serviceId}`); // Log the ID being added

  const service = services.find(s => s.id === serviceId);
  if (!service) {
    console.log('Servicio no encontrado');
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }

  // ...existing code to add service to cart...

  res.json({ cart: updatedCart });
});

// ...existing code...