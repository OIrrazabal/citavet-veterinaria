import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener Axios instalado (npm install axios)

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de errores

  // Función para obtener el carrito desde el backend (Express)
  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3000/api/cart', { withCredentials: true });
      setCart(response.data.cart || []); // Actualiza el carrito con los datos de la sesión o un arreglo vacío
    } catch (error) {
      setError('Error al obtener el carrito. Inténtalo de nuevo más tarde.');
      console.error('Error al obtener el carrito', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (serviceId) => {
    console.log(`Adding to cart: ID ${serviceId}`); // Log the ID being added
    try {
      const response = await axios.post('/api/cart', { serviceId }); // Asegúrate de que se envía el ID
      console.log('Respuesta del servidor al agregar al carrito:', response.data); // Log de la respuesta
      // Actualiza el estado del carrito según la respuesta
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

// context/CartContext.js
const removeFromCart = async (serviceId) => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.delete('/api/cart', {
      data: { serviceId }, // Enviar solo el ID del servicio
      withCredentials: true,
    });
    setCart(response.data.cart || []); // Actualiza el carrito después de la eliminación
    console.log('Servicio eliminado del carrito:', response.data.cart); // Log del carrito actualizado
  } catch (error) {
    setError('Error al eliminar el servicio del carrito.');
    console.error('Error al eliminar el servicio del carrito:', error);
  } finally {
    setLoading(false);
  }
};


  // Obtener el carrito de la sesión cuando se monta el componente
  useEffect(() => {
    fetchCart(); // Siempre obtener el carrito al montar el componente
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};
