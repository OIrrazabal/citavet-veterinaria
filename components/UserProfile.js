// components/UserProfile.js
import React from 'react';
import { useUser } from '../context/UserContext'; // Importa el contexto del usuario

const UserProfile = () => {
  const { user } = useUser(); // Obtener el usuario del contexto

  if (!user) {
    // Si no hay usuario, no mostrar nada o mostrar un mensaje genérico
    return null;
  }

  return (
    <div className="flex items-center">
      {/* Mostrar el nombre del usuario y un icono (puedes personalizar el icono) */}
      <span className="mr-2">{user.name || user.email}</span>
      <i className="pi pi-user"></i> {/* Icono del usuario */}
    </div>
  );
};

export default UserProfile;

