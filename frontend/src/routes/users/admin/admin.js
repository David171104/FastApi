import axios from 'axios';
import Swal from 'sweetalert2';
import { goto } from '$app/navigation';


const API_URL = "http://127.0.0.1:8000/users";

export async function getUsers() {
  const token = localStorage.getItem('token');

  if (!token) {
    goto("/login");
    return [];
  }

  try {
    const res = await axios.get(`${API_URL}/get_users`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data.resultado;
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');

    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      goto("/login");
    }

   
  }
}



export async function updateUser(userId, updatedUser) {
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire("Sesión expirada", "Por favor inicia sesión nuevamente.", "warning");
    goto("/login");
    return;
  }

  try {
    const res = await axios.put(`${API_URL}/update_user/${userId}`, updatedUser, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire("¡Éxito!", "Usuario actualizado correctamente ", "success");
    return res.data;
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    const msg = err.response?.data?.detail || "No se pudo actualizar el usuario.";
    Swal.fire("Error", msg, "error");
    throw err;
  }
}
