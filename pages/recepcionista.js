// pages/recepcionista.js
import Layout from '../components/Layout';

const Recepcionista = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Bienvenido Recepcionista</h1>
        <p>Accede al historial médico de tus pacientes aquí.</p>
        {/* Aquí puedes añadir más contenido específico para veterinarios */}
      </div>
    </Layout>
  );
};

export default Recepcionista;