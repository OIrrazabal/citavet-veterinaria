import Layout from '../components/Layout'; // Importar el Layout

export default function About() {
    return (
      <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">Sobre Nosotros</h1>
        <p className="text-center mt-5">Conoce más sobre nuestra veterinaria y nuestro equipo.</p>
      </div>
      </Layout>
    );
  }
  