import Layout from '../components/Layout'; // Importar el Layout
import ProtectedRoute from '../components/ProtectedRoute';

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
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
