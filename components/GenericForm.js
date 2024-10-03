import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';

const GenericForm = ({ role, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
    petName: '',      // Solo para clientes
    breed: '',        // Solo para clientes
    healthNotes: ''   // Solo para clientes
  });

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Pasar los datos al padre
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <FloatLabel>
            <InputText
              id="name"
              name="name"
              value={formData.name}
              className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="name">Nombre</label>
          </FloatLabel>
        </div>

        <div className="field">
          <FloatLabel>
            <InputText
              id="lastName"
              name="lastName"
              value={formData.lastName}
              className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="lastName">Apellido</label>
          </FloatLabel>
        </div>

        <div className="field">
          <FloatLabel>
            <InputText
              id="email"
              name="email"
              type="email"
              value={formData.email}
              className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="email">Correo Electrónico</label>
          </FloatLabel>
        </div>

        <div className="field">
          <FloatLabel>
            <InputText
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              onChange={handleInputChange}
            />
            <label htmlFor="phoneNumber">Número de Teléfono</label>
          </FloatLabel>
        </div>

        <div className="field">
          <FloatLabel>
            <InputText
              id="address"
              name="address"
              value={formData.address}
              className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              onChange={handleInputChange}
            />
            <label htmlFor="address">Dirección</label>
          </FloatLabel>
        </div>

        <div className="field">
          <FloatLabel>
            <InputText
              id="password"
              name="password"
              type="password"
              value={formData.password}
              className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
              onChange={handleInputChange}
              required
            />
            <label htmlFor="password">Contraseña</label>
          </FloatLabel>
        </div>

        {/* Mostrar campos adicionales si el rol es 'cliente' */}
        {role === 'cliente' && (
          <>
            <h3>Información de la Mascota</h3>
            <div className="field">
              <FloatLabel>
                <InputText
                  id="petName"
                  name="petName"
                  value={formData.petName}
                  className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="petName">Nombre de la Mascota</label>
              </FloatLabel>
            </div>
            <div className="field">
              <FloatLabel>
                <InputText
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                  onChange={handleInputChange}
                />
                <label htmlFor="breed">Raza</label>
              </FloatLabel>
            </div>
            <div className="field">
              <FloatLabel>
                <textarea
                  id="healthNotes"
                  name="healthNotes"
                  value={formData.healthNotes}
                  className="custom-input text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary"
                  onChange={handleInputChange}
                  rows="4"
                />
                <label htmlFor="healthNotes">Observaciones de Salud</label>
              </FloatLabel>
            </div>
          </>
        )}

        <button type="submit">Guardar</button>
      </form>

      <style jsx>{`
        .custom-input {
        width: 100%; /* Cambia el valor según necesites */
    }

        .form-container {
          max-width: 1000px; /* Ancho máximo del formulario */
          margin: 20px auto; /* Centrar el formulario */
          padding: 60px; /* Espaciado interno */
          border: 2px solid #ddd; /* Bordes suaves */
          border-radius: 8px; /* Bordes redondeados */
          background-color: #f9f9f9; /* Fondo suave */
        }

        .field {
          margin-bottom: 30px; /* Espaciado entre campos */
        }

        button {
          padding: 10px 15px; /* Espaciado interno del botón */
          background-color: #007bff; /* Color de fondo */
          color: white; /* Color del texto */
          border: none; /* Sin borde */
          border-radius: 4px; /* Bordes redondeados */
          cursor: pointer; /* Cambiar cursor al pasar el ratón */
        }

        button:hover {
          background-color: #0056b3; /* Color de fondo al pasar el ratón */
        }
      `}</style>
    </div>
  );
};

export default GenericForm;


