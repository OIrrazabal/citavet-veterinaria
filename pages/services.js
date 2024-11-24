import { useRouter } from 'next/router';
import { useCart } from '../context/CartContext'; // Contexto del carrito
import Layout from '../components/Layout';
import { useState } from 'react'; // Importa useState para manejar el estado de la cantidad

const services = [
  { 
    id: 1, 
    name: 'Baño y Peluquería', 
    description: "Baño normal utilizando jabón neutro y secado con toalla.", 
    icon: '🐶', 
    price: 60000 
  },
  { 
    id: 2, 
    name: 'Desparacitación', 
    description: "Tratamiento para eliminar parásitos internos y externos.", 
    icon: '🧹', 
    price: 150000 
  },
  { 
    id: 3, 
    name: 'Consulta Médica', 
    description: "Examen clínico general y diagnóstico por veterinario.", 
    icon: '🩺', 
    price: 300000 
  },
  { 
    id: 4, 
    name: 'Análisis Clínicos', 
    description: "Exámenes de laboratorio para diagnóstico de enfermedades.", 
    icon: '🏥', 
    price: 500000 
  },
  { 
    id: 5, 
    name: 'Cirugía e Internación', 
    description: "Procedimientos quirúrgicos y cuidados postoperatorios.", 
    icon: '🩹', 
    price: 1000000 
  },
  { 
    id: 6, 
    name: 'Vacunación', 
    description: "Aplicación de vacunas para prevenir enfermedades.", 
    icon: '💉', 
    price: 200000 
  },
  { 
    id: 7, 
    name: 'Consultas a domicilio', 
    description: "Visitas de veterinario a tu hogar para atención de mascotas.", 
    icon: '🏠', 
    price: 400000 
  },
  { 
    id: 8, 
    name: 'Shampoo para Perros', 
    description: "Shampoo especial para el cuidado del pelaje.", 
    icon: '🧴', 
    price: 50000 
  },
  { 
    id: 9, 
    name: 'Juguete para Mascotas', 
    description: "Juguete interactivo para mantener a tu mascota entretenida.", 
    icon: '🧸', 
    price: 30000 
  },
  { 
    id: 10, 
    name: 'Collar Antipulgas', 
    description: "Collar para prevenir pulgas y garrapatas.", 
    icon: '🦟', 
    price: 45000 
  },
  { 
    id: 11, 
    name: 'Comida para Perros', 
    description: "Alimento balanceado para perros.", 
    icon: '🍖', 
    price: 70000 
  },
  { 
    id: 12, 
    name: 'Comida para Gatos', 
    description: "Alimento balanceado para gatos.", 
    icon: '🐱', 
    price: 65000 
  },
];

export default function Services() {
  const { addToCart, removeFromCart, cart } = useCart(); // Funciones del carrito
  const router = useRouter();

  const handleAddToCart = async (service, quantity) => {
    console.log(`Intentando agregar al carrito: ${JSON.stringify(service)}`); // Log del servicio
    for (let i = 0; i < quantity; i++) {
      await addToCart(service.id); // Enviar solo el `id` del servicio
    }
    alert(`Has agregado ${quantity} ${service.name}(s) al carrito.`);
  };

  const handleRemoveFromCart = async (serviceId) => {
    try {
      console.log(`Eliminando servicio del carrito con ID: ${serviceId}`); // Log del ID
      await removeFromCart(serviceId); // Pasa solo el ID del servicio

      console.log(`Servicio eliminado: ID ${serviceId}`);
      alert(`Has eliminado el servicio del carrito.`);
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
      alert('Error al eliminar el servicio del carrito.');
    }
  };

  // Calcular el total del carrito
  const total = cart.reduce((acc, service) => acc + service.price, 0);

  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantity(prev => ({ ...prev, [id]: value }));
  };

  const renderServices = (startId, endId) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {services.filter(service => service.id >= startId && service.id <= endId).map((service) => {
        const isInCart = cart.some(item => item.id === service.id);
        const serviceCount = cart.filter(item => item.id === service.id).length;

        return (
          <div
            key={service.id}
            className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-2xl mb-2">{service.icon}</div>
            <h3 className="text-sm font-semibold mb-2">{service.name}</h3>
            <p className="text-xs text-gray-600">{service.description}</p>
            <p className="text-sm font-semibold mb-2">{service.price.toLocaleString('es-PY')} Gs.</p>
            
            <div className="flex items-center mb-2">
              <label className="mr-2 text-xs">Cantidad:</label>
              <input 
                type="number" 
                min="1" 
                value={quantity[service.id] || 1} 
                onChange={(e) => handleQuantityChange(service.id, Number(e.target.value))} 
                className="border rounded p-1 w-12 text-xs"
              />
            </div>

            {isInCart && (
              <p className="text-xs text-gray-500">Cantidad en carrito: {serviceCount}</p>
            )}

            <button
              onClick={() => handleAddToCart(service, quantity[service.id] || 1)}
              className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-colors duration-300 mb-2 text-xs"
            >
              {isInCart ? 'Ya en el Carrito' : 'Agregar al Carrito'}
            </button>

            {isInCart && (
              <button
                onClick={() => handleRemoveFromCart(service.id)} // Asegúrate de pasar el ID
                className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors duration-300 text-xs"
              >
                Eliminar
              </button>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto p-8 bg-green-100">
        <h1 className="text-3xl font-bold text-center mt-10">Nuestros Servicios</h1>
        {renderServices(1, 8)}
        <h1 className="text-3xl font-bold text-center mt-10">Nuestros Productos</h1>
        {renderServices(9, 12)}
        <div className="text-right mt-5">
          <h2 className="text-2xl font-bold">Total: {total.toLocaleString('es-PY')} Gs.</h2>
        </div>
      </div>
    </Layout>
  );
}
