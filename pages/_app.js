// pages/_app.js
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';                // Estilos de PrimeReact
import 'primeicons/primeicons.css';                              // Iconos de PrimeIcons
import '../styles/globals.css'; 
import { AuthProvider } from '../context/AuthContext';                                  // Estilos globales (Tailwind)

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
