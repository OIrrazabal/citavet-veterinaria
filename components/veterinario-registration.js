import GenericForm from './GenericForm';

const VeterinarioRegistration = () => {
  const handleSubmit = (formData) => {
    console.log('Datos del Veterinario:', formData);
    // Aquí podrías manejar el envío de los datos del veterinario
  };

  return (
    <div>
      <h2>Registro de Veterinario</h2>
      <GenericForm role="veterinario" onSubmit={handleSubmit} />
    </div>
  );
};

export default VeterinarioRegistration;
