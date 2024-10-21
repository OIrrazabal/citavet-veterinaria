// context/CartContext.js
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

  const addToCart = async (service) => {
    setLoading(true);
    setError(null);
    let response; // Declarar response aquí
    try {
      response = await axios.post(
        'http://localhost:3000/api/cart',
        { service },
        { withCredentials: true }
      );
      setCart(response.data.cart); // Actualiza el carrito con el nuevo servicio agregado
    } catch (error) {
      setError('Error al agregar el servicio al carrito.');
      console.error('Error al agregar el servicio al carrito', error);
    } finally {
      setLoading(false);
    }
    return response; // Ahora response está definida correctamente
  };

  // Función para eliminar un servicio del carrito en el backend (Express)
  const removeFromCart = async (service) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete('http://localhost:3000/api/cart', {
        data: { service }, // Eliminar el servicio del carrito
        withCredentials: true,
      });
      setCart(response.data.cart || []); // Actualiza el carrito después de la eliminación
    } catch (error) {
      setError('Error al eliminar el servicio del carrito.');
      console.error('Error al eliminar el servicio del carrito', error);
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


