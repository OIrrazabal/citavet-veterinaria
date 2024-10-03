// components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirigir a login si no está autenticado
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? children : null; // Renderizar hijos solo si está autenticado
};

export default ProtectedRoute;
