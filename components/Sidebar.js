// src/components/Sidebar.js

import { FaFacebookF, FaInstagram, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className="fixed right-0 top-1/4 bg-white p-6 shadow-lg rounded-lg">
      {/* Follow Us Section */}
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-lg mb-4">SÍGUENOS</h3>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-700">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Contacts Section */}
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-lg mb-4">CONTACTOS</h3>
        <p className="flex items-center justify-center text-gray-600 mb-2">
          <FaPhone className="mr-2" /> (0991) 798 999
        </p>
        <p className="flex items-center justify-center text-gray-600">
          <FaEnvelope className="mr-2" /> wonderpets@gmail.com
        </p>
      </div>

      {/* Location Section */}
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-4">LOCATION</h3>
        <p className="text-gray-600">24 de Junio c/ José Rivera</p>
        <p className="text-gray-600">San Lorenzo</p>
        <p className="text-gray-600">Villa del Maestro</p>
      </div>
    </div>
  );
}
