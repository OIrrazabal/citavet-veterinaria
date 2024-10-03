import Head from 'next/head';
import Layout from '../components/Layout'; // Importar el Layout
import PerroImagen from '../components/PerroImagen';
import 'primeicons/primeicons.css';

export default function Home({ pets }) {
  return (
    <Layout>
      <Head>
        <title>Veterinaria Wonder Pet</title>
      </Head>

      {/* Imagen y otros contenidos */}
      <div className="flex justify-center mt-10">
        <PerroImagen />
      </div>

      {/* Lista de mascotas */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-5">Lista de Mascotas</h2>
        <ul className="text-center">
          {pets.map((pet) => (
            <li key={pet.id} className="mb-3">
              {pet.name} - {pet.type} - Propietario: {pet.owner}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

// Esta función se ejecuta en el servidor antes de renderizar la página
export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/pets');
  const pets = await res.json();

  return {
    props: {
      pets,
    },
  };
}
