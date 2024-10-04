// components/UserProfile.js
import { useUser } from '../context/UserContext'; // Asegúrate de importar el hook de contexto

const UserProfile = () => {
  const { user } = useUser(); // Obtén el usuario del contexto

  return (
    <div className="flex items-center">
      {user ? ( // Verifica si hay un usuario logueado
        <>
          <span className="mr-2">{user.name}</span> {/* Muestra el nombre del usuario */}
          <span className="material-icons">account_circle</span> {/* Icono de usuario */}
        </>
      ) : (
        <span>No logueado</span> // Mensaje alternativo si no hay usuario logueado
      )}
    </div>
  );
};

export default UserProfile;
