// components/LogoutButton.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // Cierra sesión
    router.push('/login'); // Redirige al login
    router.reload(); // Recarga la página para actualizar el estado del usuario
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;

