import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';

const API_URL = "http://127.0.0.1:8000/users";

export async function createService(formData) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      goto("/login");
      return [];
    }

    const response = await axios.post(`${API_URL}/services/create`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire("¡Éxito!", "Servicio solicitado correctamente.", "success");
    return response.data;
  } catch (err) {
    console.error("Error creando servicio:", err);
    const msg = err.response?.data?.detail || "No se pudo solicitar el servicio.";
    Swal.fire("Error", msg, "error");
    throw err;
  }
}


export async function getUserServices(clientId) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      goto("/login");
      return [];
    }

    const response = await axios.get(`${API_URL}/services/list/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.resultado;
  } catch (err) {
    console.error("Error al obtener servicios:", err);
    Swal.fire("Error", "No se pudieron cargar los servicios.", "error");
    return [];
  }
}


export async function updateService(serviceId, updatedService) { 
  const token = localStorage.getItem("token");

  if (!token) {
    goto("/login");
    Swal.fire("Sesión expirada", "Por favor inicia sesión nuevamente.", "warning");
    return;
  }

  try {
    const res = await axios.put(`${API_URL}/services/update/${serviceId}`, updatedService, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire("¡Éxito!", "Servicio actualizado correctamente", "success");
    return res.data;

  } catch (err) {
    console.error(" Error al actualizar el servicio:", err);
    Swal.fire("Error", "No se pudo actualizar el servicio.", "error");
    return null; 
  }
}