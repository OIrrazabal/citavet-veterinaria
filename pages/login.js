// login.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'; 
import users from '../data/users'; // Asegúrate de importar el archivo de usuarios

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Buscar el usuario
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // Redirigir según el rol del usuario
      switch (user.role) {
        case 'veterinario':
          router.push('/veterinario');
          break;
        case 'cliente':
          router.push('/index');
          break;
        case 'administrador':
          router.push('/administrador');
          break;
        case 'recepcionista':
          router.push('/recepcionista');
          break;
        default:
          break;
      }
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Head>
          <title>Login</title>
        </Head>
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
