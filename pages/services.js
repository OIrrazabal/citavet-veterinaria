import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'; // Contexto de autenticación
import { useCart } from '../context/CartContext'; // Contexto del carrito
import Layout from '../components/Layout';

const services = [
  { name: 'Baño y Peluquería', icon: '🐶' },
  { name: 'Desparacitación', icon: '🧹' },
  { name: 'Consulta Médica', icon: '🩺' },
  { name: 'Análisis Clínicos', icon: '🏥' },
  { name: 'Cirugía e Internación', icon: '🩹' },
  { name: 'Vacunación', icon: '💉' },
  { name: 'Consultas a domicilio', icon: '🏠' },
];

export default function Services() {
  const { user } = useAuth(); // Verifica si el usuario está logueado
  const { addToCart } = useCart(); // Función para agregar al carrito
  const router = useRouter();

  const handleAddToCart = (service) => {
    if (!user) {
      // Si el usuario no está logueado, redirigirlo al login
      router.push('/login');
    } else {
      // Si está logueado, agregar el servicio al carrito
      addToCart(service);
      alert(`Has agregado ${service.name} al carrito.`);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-8 bg-green-100">
        <h1 className="text-3xl font-bold text-center mt-10">Nuestros Servicios</h1>
        <p className="text-center mt-5">Aquí ofrecemos una variedad de servicios para tu mascota.</p>
        
        {/* Sección de servicios */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-4">{service.name}</h3>
              <button
                onClick={() => handleAddToCart(service)} // Lógica para agregar al carrito
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
              >
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
