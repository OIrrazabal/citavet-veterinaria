// components/Layout.js
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/router';
import LogoutButton from './LogoutButton'; // Importa el LogoutButton
import UserProfile from './UserProfile'; // Importa el componente UserProfile
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito

const Layout = ({ children }) => {
  const router = useRouter();
  const { cart } = useCart(); // Obtiene el carrito del contexto

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
      label: 'Tienda',
      icon: 'pi pi-shopping-cart',
      command: () => {
        router.push('/services');
      },
    },
    {
      label: 'Nosotros',
      icon: 'pi pi-info-circle',
      command: () => {
        router.push('/about');
      },
    },
    {
      label: 'Mi cuenta',
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
              <a href="/">Wonder Pet</a>
              <a href="/" className="text-sm text-gray-500">  Veterinaria</a>
            </div>

            {/* Menú de navegación usando PrimeReact */}
            <div className="flex-grow">
              <Menubar model={items} />
            </div>

            {/* Sección para UserProfile, Carrito y Logout, alineados a la derecha */}
            <div className="flex items-center space-x-4">
              {/* Mostrar el nombre del usuario y el icono */}
              <UserProfile /> {/* Aquí se muestra el nombre del usuario y el icono */}

              {/* Agregar el icono del carrito aquí */}
              <div className="flex items-center cursor-pointer" onClick={() => router.push('/cliente')}>
                <i className="pi pi-shopping-cart mr-2"></i>
                {cart.length > 0 && (
                  <span className="p-tag p-tag-danger">{cart.length}</span> // Muestra la cantidad de items en el carrito
                )}
                <span className="hidden md:block">Carrito</span>
              </div>

              {/* Agregar el botón de cierre de sesión aquí */}
              <LogoutButton /> {/* Asegúrate de que LogoutButton esté importado */}
            </div>
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

