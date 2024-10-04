import GenericForm from '../components/GenericForm';

const ClienteRegistration = () => {
  const handleSubmit = (formData) => {
    console.log('Datos del Cliente:', formData);
    // Aquí podrías agregar la lógica para enviar los datos a un servidor
  };

  return (
    <div>
      <h2>Completa con tus datos</h2>
      <GenericForm role="cliente" onSubmit={handleSubmit} />
    </div>
  );
};

export default ClienteRegistration;
