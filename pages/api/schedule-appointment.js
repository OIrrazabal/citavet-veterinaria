export default async (req, res) => {
  if (req.method === 'POST') {
    const { user, email, date, time, serviceId } = req.body;

    // Aquí puedes agregar la lógica para guardar la cita en tu base de datos
    // Por ejemplo, usando MongoDB, Firebase, etc.

    console.log('Cita agendada:', { user, email, date, time, serviceId });

    res.status(200).json({ message: 'Cita agendada con éxito' });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};