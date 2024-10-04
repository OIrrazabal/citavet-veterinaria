// login.js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout'; 
import users from '../data/users';
import { useUser } from '../context/UserContext'; // Importa el contexto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const router = useRouter();
  const { setUser } = useUser(); // Obtén setUser del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Buscar el usuario
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      setUser(user); // Establecer el usuario en el contexto
      // Redirigir según el rol del usuario
      switch (user.role) {
        case 'veterinario':
          router.push('/veterinario');
          break;
        case 'cliente':
          router.push('/cliente');
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
            <div className="flex items-center justify-between mb-4">
              <label className="inline-flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={keepLoggedIn}
                  onChange={(e) => setKeepLoggedIn(e.target.checked)}
                  className="form-checkbox text-blue-500 mr-2"
                />
                Mantener sesión iniciada
              </label>
              <a href="#" className="text-blue-500 hover:underline text-sm">¿Olvidaste tu contraseña?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-700">
              ¿No tienes una cuenta? <a href="/signup" className="text-blue-500 hover:underline">Regístrate</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
