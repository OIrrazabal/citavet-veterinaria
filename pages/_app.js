// pages/_app.js
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';                // Estilos de PrimeReact
import 'primeicons/primeicons.css';                              // Iconos de PrimeIcons
import '../styles/globals.css'; 
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
}

export default MyApp;
