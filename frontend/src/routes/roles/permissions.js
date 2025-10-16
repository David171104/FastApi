import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';

const API_URL = "http://127.0.0.1:8000/permissions";

export async function getPermissions(roleId) {
  const token = localStorage.getItem("token");

  if (!token) {
    goto("/login");
    return [];
  }

  try {
    const res = await axios.get(`${API_URL}/get/${roleId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.resultado;
  } catch (err) {
    console.error("Error al obtener permisos:", err);
    Swal.fire("Error", "No se pudieron cargar los permisos.", "error");
    return [];
  }
}

export async function updatePermissions(roleId, permissions) {
  const token = localStorage.getItem("token");

  if (!token) {
    goto("/login");
    return [];
  }

  try {
    const res = await axios.put(`${API_URL}/update/${roleId}`, permissions, {
      headers: { Authorization: `Bearer ${token}` }
    });
    Swal.fire("Éxito", "Permisos actualizados correctamente", "success");
    return res.data;
  } catch (err) {
    console.error("Error al actualizar permisos:", err);
    Swal.fire("Error", "No se pudieron actualizar los permisos.", "error");
    return null;
  }
}
