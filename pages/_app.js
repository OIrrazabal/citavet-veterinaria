<<<<<<< HEAD
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';                // Estilos de PrimeReact
import 'primeicons/primeicons.css';                              // Iconos de PrimeIcons
import '../styles/globals.css';                                  // Estilos globales (Tailwind)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;


=======
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
>>>>>>> d07fb5c (Initial commit from Create Next App)
