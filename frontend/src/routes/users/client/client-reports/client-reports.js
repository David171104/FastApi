import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';

const API_URL = "http://127.0.0.1:8000";



export async function getClientReports(clientId) {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(`${API_URL}/users/reports/client/${clientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return res.data;
    } catch (err) {
        Swal.fire("Error", "No se pudieron cargar los reportes.", "error");
        return [];
    }
}


export async function getReportById(id) {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.get(`${API_URL}/users/report/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return res.data;

    } catch (err) {
        Swal.fire("Error", "No se pudieron cargar los reportes.", "error");
        return [];
    }
}

export async function updateReport(data) {
    const token = localStorage.getItem("token");

    await axios.put(`${API_URL}/users/update/reports/${data.id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

    Swal.fire("Éxito", "Reporte actualizado correctamente", "success");
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
