// pages/veterinario.js
import Layout from '../components/Layout';
import VeterinarioRegistration from '../components/veterinario-registration';

const Veterinario = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Bienvenido Veterinario</h1>
        <p>Accede al historial médico de tus pacientes aquí.</p>
        <VeterinarioRegistration />
        {/* Aquí puedes añadir más contenido específico para veterinarios */}     
      </div>
    </Layout>
  );
};

export default Veterinario;


