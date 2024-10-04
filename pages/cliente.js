// pages/cliente.js
import Layout from '../components/Layout'; // Importa el Layout
import { useAuth } from '../context/AuthContext'; // Importa el contexto de autenticación
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito

const ClientePage = () => {
  const { currentUser } = useAuth(); // Cambiado de user a currentUser
  const { cart } = useCart(); // Obtiene los servicios en el carrito

  // Calcula el total de los servicios en el carrito
  const total = cart.length; // Modifica esto si necesitas calcular un total en valor monetario

  return (
    <Layout>
      <div className="container mx-auto p-8 bg-green-100">
        <h1 className="text-3xl font-bold text-center mt-10">Perfil de Usuario</h1>
        
        {/* Verifica si el usuario está definido */}
        {currentUser ? ( // Cambiado de user a currentUser
          <>
            {/* Información del perfil del usuario */}
            <div className="text-center mt-5">
              <h2 className="text-2xl">{currentUser.name}</h2> {/* Cambiado a currentUser */}
              <p>Email: {currentUser.email}</p> {/* Cambiado a currentUser */}
              <p>Rol: {currentUser.role}</p> {/* Cambiado a currentUser */}
            </div>

            {/* Sección del carrito */}
            <h3 className="text-xl font-semibold mt-10">Servicios en el Carrito</h3>
            {cart.length > 0 ? (
              <ul className="mt-4">
                {cart.map((service, index) => (
                  <li key={index} className="py-2">
                    {service.name} {/* Ajusta esto para mostrar el nombre del servicio */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4">No hay servicios en el carrito.</p>
            )}
            
            {/* Total de servicios en el carrito */}
            <div className="mt-4">
              <strong>Total de servicios en el carrito: {total}</strong>
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
