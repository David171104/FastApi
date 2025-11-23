import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';

const API = "http://127.0.0.1:8000";


export async function saveReport(data) {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`${API}/reports`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });

        Swal.fire("Éxito", "Reporte registrado.", "success");
        return res.data;

    } catch (err) {
        Swal.fire("Error", "No se guardó el reporte.", "error");
    }
}


export async function getReports(technicianId) {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(`${API}/reports/technician/${technicianId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return res.data;
    } catch (err) {
        Swal.fire("Error", "No se pudieron cargar los reportes.", "error");
        return [];
    }
}




export async function downloadPDF(reportId) {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(
            `${API}/service-report/${reportId}/pdf`,
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
