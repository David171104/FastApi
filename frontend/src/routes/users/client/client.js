import axios from "axios";
import Swal from "sweetalert2";
import { goto } from '$app/navigation';


const API_URL = "http://127.0.0.1:8000";

export async function getStats(client_id) {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/client/stats/${client_id}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    return response.data;
} 