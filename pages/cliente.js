import Layout from '../components/Layout'; // Importa el Layout
import { useUser } from '../context/UserContext'; // Usa el contexto de usuario
import { useCart } from '../context/CartContext'; // Importa el contexto del carrito
import 'primereact/resources/themes/saga-blue/theme.css';  // theme
import 'primereact/resources/primereact.min.css';          // core css
import 'primeicons/primeicons.css';                        // icons
import { useState } from 'react'; // Importar useState
import jsPDF from 'jspdf'; // Importar jsPDF para generar PDF

const ClientePage = () => {
  const { user } = useUser(); // Obtiene el usuario autenticado del UserContext
  const { cart = [], removeFromCart } = useCart(); // Asignar valor por defecto a cart
  const [paymentMethod, setPaymentMethod] = useState('tarjeta'); // Estado para el método de pago
  const [appointments, setAppointments] = useState(cart.map(service => ({ serviceId: service.id, date: '', time: '' }))); // Estado para las citas

  // Depuración para verificar los datos del carrito
  console.log('Estado del carrito:', cart);

  // Calcular el subtotal del carrito
  const subtotal = cart.reduce((acc, service) => {
    const price = service.price || 0;  // Asegurar que el precio esté definido
    const quantity = service.quantity || 1;  // Asegurar que la cantidad esté definida

    console.log(`Calculando servicio: ${service.name}, Cantidad: ${quantity}, Precio: ${price}`);
    
    return acc + price * quantity; // Calcular el subtotal por servicio
  }, 0);

  const shippingCost = 20000; // Puedes ajustar esto según la necesidad
  const total = subtotal + shippingCost; // Total incluyendo el costo de envío

  const handleAppointmentChange = (serviceId, field, value) => {
    setAppointments(appointments.map(appointment => 
      appointment.serviceId === serviceId ? { ...appointment, [field]: value } : appointment
    ));
  };

  const numberToWords = (num) => {
    // Función para convertir números a palabras (puedes usar una biblioteca externa si prefieres)
    // Aquí se proporciona una implementación básica para números en español
    const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const decenas = ['diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['cien', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (num < 10) return unidades[num];
    if (num < 100) return decenas[Math.floor(num / 10) - 1] + (num % 10 ? ' y ' + unidades[num % 10] : '');
    if (num < 1000) return centenas[Math.floor(num / 100) - 1] + (num % 100 ? ' ' + numberToWords(num % 100) : '');
    return num.toString(); // Para números mayores, se puede extender la lógica
  };

  const generateInvoicePDF = (invoice) => {
    const doc = new jsPDF();
    doc.text('Veterinaria Wonder PET', 10, 10);
    doc.text('Dirección: calle 12', 10, 20);
    doc.text('Teléfono: 021 576 884', 10, 30);
    doc.text(`Nombre del cliente: ${invoice.user}`, 10, 40);
    doc.text(`Correo: ${invoice.email}`, 10, 50);
    doc.text('Servicios:', 10, 60);
    invoice.cart.forEach((service, index) => {
      const appointment = invoice.appointments.find(app => app.serviceId === service.id);
      doc.text(`${index + 1}. ${service.name} - Cantidad: ${service.quantity} - Precio: Gs. ${service.price}`, 10, 70 + index * 10);
      if (appointment) {
        doc.text(`Fecha: ${appointment.date} - Hora: ${appointment.time}`, 10, 80 + index * 10);
      }
    });
    doc.text(`Subtotal: Gs. ${invoice.subtotal.toLocaleString('es-PY')}`, 10, 90 + invoice.cart.length * 10);
    doc.text(`Envío: Gs. ${invoice.shippingCost.toLocaleString('es-PY')}`, 10, 100 + invoice.cart.length * 10);
    doc.text(`Total: Gs. ${invoice.total.toLocaleString('es-PY')}`, 10, 110 + invoice.cart.length * 10);
    doc.text(`Total en letras: ${numberToWords(invoice.total)}`, 10, 120 + invoice.cart.length * 10);
    doc.save('factura.pdf');
  };

  const generateInvoiceTXT = (invoice) => {
    let content = 'Veterinaria Wonder PET\n';
    content += 'Dirección: calle 12\n';
    content += 'Teléfono: 021 576 884\n';
    content += `Nombre del cliente: ${invoice.user}\n`;
    content += `Correo: ${invoice.email}\n`;
    content += 'Servicios:\n';
    invoice.cart.forEach((service, index) => {
      const appointment = invoice.appointments.find(app => app.serviceId === service.id);
      content += `${index + 1}. ${service.name} - Cantidad: ${service.quantity} - Precio: Gs. ${service.price}\n`;
      if (appointment) {
        content += `Fecha: ${appointment.date} - Hora: ${appointment.time}\n`;
      }
    });
    content += `Subtotal: Gs. ${invoice.subtotal.toLocaleString('es-PY')}\n`;
    content += `Envío: Gs. ${invoice.shippingCost.toLocaleString('es-PY')}\n`;
    content += `Total: Gs. ${invoice.total.toLocaleString('es-PY')}\n`;
    content += `Total en letras: ${numberToWords(invoice.total)}\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'factura.txt';
    link.click();
  };

  const handleConfirmOrder = () => {
    if (paymentMethod === 'efectivo') {
      const invoice = {
        user: user.name || user.email,
        email: user.email,
        role: user.role,
        cart,
        appointments,
        subtotal,
        shippingCost,
        total,
        paymentMethod,
      };
      console.log('Factura generada:', invoice);
      alert('Pago realizado con éxito. Factura generada.');
      generateInvoicePDF(invoice); // Generar PDF
      generateInvoiceTXT(invoice); // Generar TXT
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-green-100">
        {/* Sección del carrito de compras */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Carrito de compras</h2>

          {/* Verifica si el usuario está autenticado */}
          {user ? (
            <>
              {/* Información del perfil del usuario */}
              <div className="text-center mb-6">
                <h2 className="text-2xl">{user.name || user.email}</h2> {/* Fallback en caso de que no tenga name */}
                <p>Email: {user.email}</p>
                <p>Rol: {user.role}</p>
              </div>

              {/* Mostrar servicios en el carrito */}
              <div>
                {cart.length > 0 ? (
                  <div>
                    <ul>
                      {cart.map((service, index) => (
                        <li key={index} className="flex justify-between items-center mb-4 p-4 border rounded-lg">
                          <div>
                            <h3 className="font-bold">{service.name || 'Sin nombre'}</h3>
                            <p className="text-sm text-gray-500">{service.description || 'Sin descripción'}</p>
                            <p className="font-semibold text-gray-800">
                              Cantidad: {service.quantity || 1} {/* Fallback por si no se encuentra la cantidad */}
                            </p>
                            <div className="mt-2">
                              <label className="block mb-1">Fecha de la cita</label>
                              <input
                                type="date"
                                className="w-full p-2 rounded"
                                value={appointments.find(app => app.serviceId === service.id)?.date || ''}
                                onChange={(e) => handleAppointmentChange(service.id, 'date', e.target.value)}
                              />
                              <label className="block mb-1 mt-2">Hora de la cita</label>
                              <input
                                type="time"
                                className="w-full p-2 rounded"
                                value={appointments.find(app => app.serviceId === service.id)?.time || ''}
                                onChange={(e) => handleAppointmentChange(service.id, 'time', e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">
                              Gs. {((service.price || 0) * (service.quantity || 1)).toLocaleString('es-PY')}
                            </p>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => removeFromCart(service.id)} // Pasar todo el servicio para eliminar correctamente
                            >
                              Eliminar
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between mt-4">
                      <span className="font-semibold">Subtotal:</span>
                      <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
                    </div>
                  </div>
                ) : (
                  <p>No hay servicios en el carrito.</p>
                )}
              </div>
            </>
          ) : (
            <p className="text-center">Por favor, inicia sesión para ver tu perfil.</p>
          )}
        </div>

        {/* Sección de detalles de pago */}
        <div className="bg-blue-500 p-6 rounded-lg shadow-md text-black">
          <h2 className="text-xl font-bold mb-4">Detalles del pago</h2>

          {/* Selección del método de pago */}
          <div className="mb-4">
            <label className="block mb-2">Método de pago:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 rounded"
            >
              <option value="tarjeta">Tarjeta</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>

          {/* Formulario de pago con tarjeta */}
          {paymentMethod === 'tarjeta' && (
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Nombre del titular</label>
                <input type="text" className="w-full p-2 rounded" placeholder="Nombre del titular de la tarjeta" />
              </div>
              <div>
                <label className="block mb-1">Número de la tarjeta</label>
                <input type="text" className="w-full p-2 rounded" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="flex space-x-4">
                <div>
                  <label className="block mb-1">Expiración</label>
                  <input type="text" className="w-full p-2 rounded" placeholder="MM/AA" />
                </div>
                <div>
                  <label className="block mb-1">CVV</label>
                  <input type="text" className="w-full p-2 rounded" placeholder="123" />
                </div>
              </div>
            </form>
          )}

          {/* Resumen de la compra */}
          <div className="mt-4">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal:</span>
              <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Envío:</span>
              <span>Gs. {shippingCost.toLocaleString('es-PY')}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>Gs. {total.toLocaleString('es-PY')}</span>
            </div>
          </div>

          {/* Botón para proceder al pago */}
          <button
            className="w-full bg-green-500 text-black py-2 mt-4 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={paymentMethod === 'efectivo' ? handleConfirmOrder : null}
          >
            {paymentMethod === 'tarjeta' ? `Pagar Gs. ${total.toLocaleString('es-PY')}` : 'Confirmar pedido'}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ClientePage;
