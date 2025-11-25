import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';

const API_URL = "http://127.0.0.1:8000";



// export async function getAllReports() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     Swal.fire("Sesión", "Por favor inicia sesión.", "warning");
//     goto("/login");
//     return [];
//   }

//   try {
//     const res = await axios.get(`${API_URL}/admin/reports`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     return res.data.resultado || [];
//   } catch (err) {
//     console.error("Error cargando reportes (admin):", err);
//     Swal.fire("Error", "No se pudieron cargar los reportes.", "error");
//     return [];
//   }
// }


export async function getAllReports(filters = {}) {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const params = new URLSearchParams();

  if (filters.technician_id) params.append("technician_id", filters.technician_id);
  if (filters.status && filters.status !== "all") params.append("status", filters.status);
  if (filters.date_from) params.append("date_from", filters.date_from);
  if (filters.date_to) params.append("date_to", filters.date_to);

  const query = params.toString();
  const url = `${API_URL}/admin/reports${query ? ("?" + query) : ""}`;

  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error("Error cargando reportes:", error);
    return [];
  }
}






export async function downloadPDF(reportId) {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(
            `${API_URL}/service-report/${reportId}/pdf`,
            {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob"
            }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

    } catch (err) {
        console.error("Error al generar PDF:", err);
        Swal.fire("Error", "No se pudo generar el PDF.", "error");
    }
}
