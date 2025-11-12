import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';

const API_URL = "http://127.0.0.1:8000/services";




export async function getTechnicianServices(technicianId) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      goto("/login");
      return [];
    }

    const response = await axios.get(`${API_URL}/technician/${technicianId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.resultado;
  } catch (err) {
    console.error("Error al obtener los servicios del técnico:", err);
    Swal.fire("Error", "No se pudieron cargar los servicios asignados.", "error");
    return [];
  }
}