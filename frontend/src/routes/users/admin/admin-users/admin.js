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

export async function createUser(formData) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      goto("/login");
      return;
    }

    
    const response = await axios.post(`${API_URL}/admin-create_user`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire(" ¡Éxito!", "Usuario creado correctamente.", "success");
    return response.data;

  } catch (err) {
    console.error(" Error creando usuario:", err);

    const msg =
      err.response?.data?.detail ||
      err.response?.data?.message ||
      "No se pudo crear el usuario.";

    Swal.fire("Error", msg, "error");
    throw err;
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

export async function deleteUser(userId) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/delete/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    Swal.fire({
      icon: "success",
      title: "Usuario eliminado",
      text: res.data.message,
      timer: 2000,
      showConfirmButton: false,
    });
    return res.data;
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.detail || "No se pudo eliminar el usuario.",
    });
    throw error;
  }
}

