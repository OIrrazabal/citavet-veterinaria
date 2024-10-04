// signup.js
import Layout from '../components/Layout';
import ClienteRegistration from '../components/cliente-registration';

const Signup = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-xl"> {/* Cambiado de max-w-md a max-w-lg */}
          <h2 className="text-2xl font-bold mb-6 text-center">Regístrate como Cliente</h2>
          
          {/* Renderiza directamente el formulario para clientes */}
          <ClienteRegistration />
          
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

