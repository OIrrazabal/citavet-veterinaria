// context/CartContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener Axios instalado (npm install axios)

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para obtener el carrito desde el backend (Express)
  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cart', { withCredentials: true });
      setCart(response.data); // Actualiza el carrito con los datos de la sesión
    } catch (error) {
      console.error('Error al obtener el carrito', error);
    }
  };

  // Función para agregar un servicio al carrito en el backend (Express)
  const addToCart = async (service) => {
    try {
      const response = await axios.post('http://localhost:3000/api/cart', { service }, { withCredentials: true });
      setCart(response.data.cart); // Actualiza el carrito con el nuevo servicio agregado
    } catch (error) {
      console.error('Error al agregar el servicio al carrito', error);
    }
  };
  

  // Función para eliminar un servicio del carrito en el backend (Express)
  const removeFromCart = async (service) => {
    try {
      // Aquí puedes crear una ruta en tu backend para eliminar el servicio del carrito.
      // Asumiendo que el backend tiene una ruta para eliminar un servicio
      const response = await axios.delete('http://localhost:3000/api/cart', {
        data: { service }, // Eliminar el servicio del carrito
        withCredentials: true
      });
      setCart(response.data.cart); // Actualiza el carrito después de la eliminación
    } catch (error) {
      console.error('Error al eliminar el servicio del carrito', error);
    }
  };

  // Obtener el carrito de la sesión cuando se monte el componente
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

