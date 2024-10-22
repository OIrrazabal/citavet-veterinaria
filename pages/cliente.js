import Layout from '../components/Layout'; // Importa el Layout
import { useUser } from '../context/UserContext'; // Usa el contexto de usuario
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito

const ClientePage = () => {
  const { user } = useUser(); // Obtiene el usuario autenticado del UserContext
  const { cart = [], removeFromCart } = useCart(); // Asignar valor por defecto a cart

  // Depuración para verificar los datos del carrito
  console.log('Estado del carrito:', cart);

  // Calcular el subtotal del carrito
  const subtotal = cart.reduce((acc, service) => {
    const price = service.price || 0;  // Asegurar que el precio esté definido
    const quantity = service.quantity || 1;  // Asegurar que la cantidad esté definida

    console.log(`Calculando servicio: ${service.name}, Cantidad: ${quantity}, Precio: ${price}`);
    
    return acc + price * quantity; // Calcular el subtotal por servicio
  }, 0);

  const shippingCost = 20000; // Puedes ajustar esto según la necesidad
  const total = subtotal + shippingCost; // Total incluyendo el costo de envío

  return (
    <Layout>
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-green-100">
        {/* Sección del carrito de compras */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>

          {/* Verifica si el usuario está autenticado */}
          {user ? (
            <>
              {/* Información del perfil del usuario */}
              <div className="text-center mb-6">
                <h2 className="text-2xl">{user.name || user.email}</h2> {/* Fallback en caso de que no tenga name */}
                <p>Email: {user.email}</p>
                <p>Rol: {user.role}</p>
              </div>

              {/* Mostrar servicios en el carrito */}
              <div>
                {cart.length > 0 ? (
                  <div>
                    <ul>
                      {cart.map((service, index) => (
                        <li key={index} className="flex justify-between items-center mb-4 p-4 border rounded-lg">
                          <div>
                            <h3 className="font-bold">{service.name || 'Sin nombre'}</h3>
                            <p className="text-sm text-gray-500">{service.description || 'Sin descripción'}</p>
                            <p className="font-semibold text-gray-800">
                              Cantidad: {service.quantity || 1} {/* Fallback por si no se encuentra la cantidad */}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              Gs. {((service.price || 0) * (service.quantity || 1)).toLocaleString('es-PY')}
                            </p>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(service.id)} // Pasar todo el servicio para eliminar correctamente
                            >
                              Eliminar
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                      <span className="font-semibold">Subtotal:</span>
                      <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
                    </div>
                  </div>
                ) : (
                  <p>No hay servicios en el carrito.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center">Por favor, inicia sesión para ver tu perfil.</p>
          )}
        </div>

        {/* Sección de detalles de pago */}
        <div className="bg-blue-500 p-6 rounded-lg shadow-md text-white">
          <h2 className="text-xl font-bold mb-4">Detalles del pago</h2>

          <form className="space-y-4">
            <div>
              <label className="block mb-1">Nombre del titular</label>
              <input type="text" className="w-full p-2 rounded" placeholder="Nombre del titular de la tarjeta" />
            </div>
            <div>
              <label className="block mb-1">Número de la tarjeta</label>
              <input type="text" className="w-full p-2 rounded" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="flex space-x-4">
              <div>
                <label className="block mb-1">Expiración</label>
                <input type="text" className="w-full p-2 rounded" placeholder="MM/AA" />
              </div>
              <div>
                <label className="block mb-1">CVV</label>
                <input type="text" className="w-full p-2 rounded" placeholder="123" />
              </div>
            </div>
          </form>

          {/* Resumen de la compra */}
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Envío:</span>
              <span>Gs. {shippingCost.toLocaleString('es-PY')}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>Gs. {total.toLocaleString('es-PY')}</span>
            </div>
          </div>

          {/* Botón para proceder al pago */}
          <button className="w-full bg-green-500 text-white py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-300">
            Pagar Gs. {total.toLocaleString('es-PY')}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ClientePage;


