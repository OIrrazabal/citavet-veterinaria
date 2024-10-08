// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de tener Axios instalado

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Para almacenar la información del usuario

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password }, { withCredentials: true });
      setIsAuthenticated(true);
      setCurrentUser(response.data.user); // Suponiendo que la respuesta incluye la información del usuario
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  // Verificar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/current_user', { withCredentials: true });
        if (response.data.user) {
          setIsAuthenticated(true);
          setCurrentUser(response.data.user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar el usuario', error);
        setIsAuthenticated(false);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

