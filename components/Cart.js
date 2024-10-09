// components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Asegúrate de que el contexto esté importado
import { useUser } from '../context/UserContext'; // Importa el contexto de usuario para verificar autenticación

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext); // Obtén el carrito y la función para eliminar
  const { user } = useUser(); // Obtén el usuario actual

  // Verifica si el usuario está autenticado
  if (!user) {
    return <div>Debes iniciar sesión para ver tu carrito.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en tu carrito.</p>
      ) : (
        <ul className="list-disc">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2"> {/* Usar item.id en vez de index */}
              <span>{item.name}</span>
              <button
                onClick={() => removeFromCart(item)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

