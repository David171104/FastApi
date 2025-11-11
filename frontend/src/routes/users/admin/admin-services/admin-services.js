import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/users';



export async function getAllServices() {
  const token = localStorage.getItem('token');

  if (!token) {
    goto("/login");
    return [];
  }

  try {
    const res = await axios.get(`${API_URL}/services/all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data.resultado;
  } catch (err) {
    console.error('Error al obtener los servicios:', err);
    Swal.fire('Error', 'No se pudieron cargar los servicios.', 'error');

    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token');
      goto("/login");
    }

   
  }
}



export async function loadTechnicians() {
    const token = localStorage.getItem('token');

  if (!token) {
    goto("/login");
    return [];
  }
  try {
    const res = await axios.get(`${API_URL}/technicians/all`,{
    headers: {
        Authorization: `Bearer ${token}`
      }
  });
    return res.data.resultado;
  } catch (err) {
    console.error("Error al cargar técnicos:", err);
    return [];
  }
}

export async function initTechnicianSelect() {
  const select = $('#technicianSelect');

  select.empty();
  const technicians = await loadTechnicians();
  select.append(new Option("Seleccionar técnico...", "", true, false));

 
  technicians.forEach(item => {
    const option = new Option(`${item.name} ${item.last_name}`, item.id, false, false);
    select.append(option);
  });


  select.select2({
    placeholder: "Seleccionar técnico...",
    allowClear: true,
    width: '100%'
  });
}
