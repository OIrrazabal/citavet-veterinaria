// pages/cliente.js
import Layout from '../components/Layout'; // Importa el Layout
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito

const ClientePage = () => {
  const { currentUser } = useAuth(); // Obtiene el usuario autenticado
  const { cart, removeFromCart } = useCart(); // Obtiene el carrito y removeFromCart

  // Log para verificar el estado del carrito
  console.log('Cart:', cart);

  return (
    <Layout>
      <div className="container mx-auto p-8 bg-green-100">
        <h1 className="text-3xl font-bold text-center mt-10">Perfil de Usuario</h1>
        
        {/* Verifica si el usuario está autenticado */}
        {currentUser ? (
          <>
            {/* Información del perfil del usuario */}
            <div className="text-center mt-5">
              <h2 className="text-2xl">{currentUser.name}</h2>
              <p>Email: {currentUser.email}</p>
              <p>Rol: {currentUser.role}</p>
            </div>

            {/* Sección del carrito */}
            <h3 className="text-xl font-semibold mt-10">Servicios en el Carrito</h3>
            {cart.length > 0 ? (
              <ul className="mt-4">
                {cart.map((service, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
                    <span>{service.name}</span> {/* Muestra el nombre del servicio */}
                    <button
                      className="ml-4 bg-red-500 text-white p-1 rounded"
                      onClick={() => removeFromCart(service.name)} // Cambiado a service.name para eliminar por nombre
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4">No hay servicios en el carrito.</p>
            )}
            
            {/* Total de servicios en el carrito */}
            <div className="mt-4">
              <strong>Total de servicios en el carrito: {cart.length}</strong> {/* Total de elementos en el carrito */}
            </div>
          </>
        ) : (
          <p className="text-center mt-5">Por favor, inicia sesión para ver tu perfil.</p>
        )}
      </div>
    </Layout>
  );
};

export default ClientePage;



