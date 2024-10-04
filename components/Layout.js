// components/Layout.js
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/router';
import LogoutButton from './LogoutButton'; // Importa el LogoutButton
import UserProfile from './UserProfile'; // Importa el componente UserProfile

const Layout = ({ children }) => {
  const router = useRouter();

  // Definimos los items del menú de navegación
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        router.push('/');
      },
    },
    {
      label: 'Servicios',
      icon: 'pi pi-briefcase',
      command: () => {
        router.push('/services');
      },
    },
    {
      label: 'Tienda',
      icon: 'pi pi-shopping-cart',
      command: () => {
        router.push('/store');
      },
    },
    {
      label: 'About Us',
      icon: 'pi pi-info-circle',
      command: () => {
        router.push('/about');
      },
    },
    {
      label: 'Login',
      icon: 'pi pi-user',
      command: () => {
        router.push('/login');
      },
    },
  ];

  return (
    <div>
      {/* Menubar de navegación con PrimeReact */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo o nombre */}
            <div className="text-2xl font-bold">
              <a href="#">Wonder Pet</a>
            </div>

            {/* Menú de navegación usando PrimeReact */}
            <div className="flex-grow">
              <Menubar model={items} />
            </div>

            {/* Mostrar el nombre del usuario y el icono */}
            <UserProfile /> {/* Aquí se muestra el nombre del usuario y el icono */}

            {/* Agregar el botón de cierre de sesión aquí */}
            <LogoutButton /> {/* Asegúrate de que LogoutButton esté importado */}
          </div>
        </div>
      </nav>

      {/* Espaciado para evitar solapamiento del navbar */}
      <div className="mt-16"></div>

      {/* Contenido de las páginas */}
      <main className="container mx-auto px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;

