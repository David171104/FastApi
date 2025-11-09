import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://127.0.0.1:8000/roles"; // Ruta base de FastAPI

// ✅ OBTENER TODOS LOS ROLES
export async function getRoles() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/list`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data?.roles || [];
  } catch (error) {
    console.error("Error al obtener roles:", error);
    Swal.fire({
      icon: "error",
      title: "Error al cargar roles",
      text: error.response?.data?.detail || "No se pudieron obtener los roles.",
    });
    return [];
  }
}

// ✅ CREAR NUEVO ROL
export async function createRole(name) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/create`, name ,{
       headers: { Authorization: `Bearer ${token}` } 
    });

    Swal.fire({
      icon: "success",
      title: "Rol creado",
      text: res.data.message || "El rol fue creado correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });

    return res.data;
  } catch (error) {
    console.error("Error al crear rol:", error);
    Swal.fire({
      icon: "error",
      title: "Error al crear rol",
      text: error.response?.data?.detail || "No se pudo crear el rol.",
    });
  }
}

// ✅ EDITAR ROL
export async function updateRole(id, name) {
  console.log('name', name);
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `${API_URL}/update/${id}`,name ,{

      headers: {Authorization: `Bearer ${token}` } 
     
    });

    Swal.fire({
      icon: "success",
      title: "Rol actualizado",
      text: res.data.message || "El rol fue actualizado correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });

    return res.data;
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    Swal.fire({
      icon: "error",
      title: "Error al actualizar rol",
      text: error.response?.data?.detail || "No se pudo actualizar el rol.",
    });
  }
}

// ✅ ELIMINAR (soft delete)
export async function deleteRole(id) {
  try {
    const token = localStorage.getItem("token");

    const confirm = await Swal.fire({
      title: "¿Eliminar rol?",
      text: "Este rol será desactivado (soft delete).",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    Swal.fire({
      icon: "success",
      title: "Rol eliminado",
      text: res.data.message || "El rol fue desactivado correctamente.",
      timer: 1500,
      showConfirmButton: false,
    });

    return res.data;
  } catch (error) {
    console.error("Error al eliminar rol:", error);
    Swal.fire({
      icon: "error",
      title: "Error al eliminar rol",
      text: error.response?.data?.detail || "No se pudo eliminar el rol.",
    });
  }
}
