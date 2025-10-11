import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:8000/users";

export async function createService(formData) {
  try {
    const token = localStorage.getItem("token");

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