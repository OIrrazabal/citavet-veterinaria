import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticación
import { useCart } from '../context/CartContext'; // Contexto del carrito
import Layout from '../components/Layout';

const services = [
  { name: 'Baño y Peluquería', icon: '🐶', price: 25 },
  { name: 'Desparacitación', icon: '🧹', price: 15 },
  { name: 'Consulta Médica', icon: '🩺', price: 30 },
  { name: 'Análisis Clínicos', icon: '🏥', price: 50 },
  { name: 'Cirugía e Internación', icon: '🩹', price: 100 },
  { name: 'Vacunación', icon: '💉', price: 20 },
  { name: 'Consultas a domicilio', icon: '🏠', price: 40 },
];

export default function Services() {
  const { user } = useAuth(); // Verifica si el usuario está logueado
  const { addToCart, cart } = useCart(); // Funciones del carrito
  const router = useRouter();

  const handleAddToCart = async (service) => {
    if (!user) {
      // Si el usuario no está logueado, redirigirlo al login
      router.push('/login');
    } else {
      // Si está logueado, agregar el servicio al carrito
      await addToCart(service); // Espera a que se agregue el servicio al carrito
      alert(`Has agregado ${service.name} al carrito.`);
      // Redirige a la página de cliente después de agregar al carrito
      router.push('/cliente');
    }
  };

  // Calcular el total del carrito
  const total = cart.reduce((acc, service) => acc + service.price, 0);

  return (
    <Layout>
      <div className="container mx-auto p-8 bg-green-100">
        <h1 className="text-3xl font-bold text-center mt-10">Nuestros Servicios</h1>
        <p className="text-center mt-5">Aquí ofrecemos una variedad de servicios para tu mascota.</p>
        
        {/* Sección de servicios */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {services.map((service) => {
            const isInCart = cart.some(item => item.name === service.name); // Verifica si el servicio está en el carrito
            return (
              <div
                key={service.name}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-4">{service.name}</h3>
                <p className="text-lg font-semibold mb-4">${service.price}</p> {/* Mostrar precio */}
                <button
                  onClick={() => handleAddToCart(service)} // Lógica para agregar al carrito
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300 mb-2"
                  disabled={isInCart} // Desactiva el botón si ya está en el carrito
                >
                  {isInCart ? 'Ya en el Carrito' : 'Agregar al Carrito'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mostrar total del carrito */}
        <div className="text-right mt-5">
          <h2 className="text-2xl font-bold">Total: ${total}</h2>
        </div>
      </div>
    </Layout>
  );
}
