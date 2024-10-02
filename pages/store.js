import Layout from '../components/Layout'; // Importar el Layout

export default function Store() {
    return (
      <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">Nuestra Tienda</h1>
        <p className="text-center mt-5">Compra productos para tu mascota en nuestra tienda.</p>
      </div>
      </Layout>
    );
  }
  