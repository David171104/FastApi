import axios from 'axios';
import Swal from 'sweetalert2';

export async function register_user() {
  const form = document.getElementById('register-form');
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  if (!userData.name || !userData.email || !userData.password) {
    Swal.fire('Campos incompletos', 'Por favor completa los campos obligatorios', 'warning');
    return;
  }

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/users/create_user',
      userData
    );

    Swal.fire('¡Registro exitoso!', 'Usuario creado correctamente', 'success');
    form.reset();
  } catch (error) {
    console.error(error);
    Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
  }
}
