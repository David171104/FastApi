<script>
    import { onMount } from "svelte";
    import Swal from 'sweetalert2';
    import { getTechnicianServices, completeService  } from "./technician-services.js";
    import { getStatusLabel, formatDate, formatTime } from '$lib/helpers/constants.js';

    let services = [];
    let hasShownAlert = false;

    onMount(async () => {
        try {

            const storedUser = localStorage.getItem("user");
            let userId = null;

            if (storedUser) {
                const parsed = JSON.parse(storedUser);

                userId = parsed.id ?? JSON.parse(parsed.user || "{}").id;
            }

            if (userId) {
                let result = await getTechnicianServices(userId);

                services = result.map(service => ({
                    id: service[0],
                    technician_id: service[1],
                    service_id: service[2],
                    request_date: service[3],
                    request_time: service[4],
                    service_type: service[5],
                    address: service[6],
                    current_status: service[7],
                    client_name: service[8],
                    technician_name: service[9],
                }));

                const today = new Date();
                const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split("T")[0];
                    
                setTimeout(() => {
                    
                    const servicetoday = services.find(service => service.request_date === localDate);

                    if (servicetoday && !hasShownAlert) {
                        hasShownAlert = true;
                        Swal.fire({
                            title: "📅 Recordatorio",
                            text: `Tienes un servicio programado para hoy con ${servicetoday.client_name} en la dirección  ${servicetoday.address}`,
                            icon: "info",
                            timer: 5000,
                            showConfirmButton: false,
                            toast: true,
                            position: "top-end",
                            background: "#1f1f2f",
                            color: "#00ffc6",
                        });
                    }
                }, 500);

            } else {
                Swal.fire("Error", "No se encontró el usuario en sesión.", "error");
            }
        } catch (err) {
            console.error("Error al cargar los servicios:", err);
            Swal.fire("Error", "Hubo un problema al cargar los servicios.", "error");
        }
    });


    async function markAsCompleted(service) {
        try {
            const result = await completeService(service.id);

            Swal.fire({
                title: "✔ Servicio completado",
                text: "El servicio se marcó como completado.",
                icon: "success",
            });

            // actualizar en frontend sin recargar todo
            service.current_status = "completed";
            services = [...services];
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "No se pudo completar el servicio", "error");
        }
    }
</script>

<div class="services-container">
    <h2>Servicios Asignados</h2>

    {#if services.length > 0}
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Tipo</th>
                    <th>Dirección</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {#each services as service}
                <tr>
                    <td>{service.id}</td>
                    <td>{service.client_name}</td>
                    <td>{service.service_type}</td>
                    <td>{service.address}</td>
                    <td>{formatDate(service.request_date)}</td>
                    <td>{formatTime(service.request_time)}</td>
                    <td>
                        {@html getStatusLabel(service.current_status)}
                    </td>

                        <td>
                        {#if service.current_status === "assigned"}
                            <button class="complete-btn" on:click={() => markAsCompleted(service)}>
                                Completar
                            </button>
                        {:else }
                            <p></p>
                        {/if}
                    </td>
                </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>No tienes servicios asignados.</p>
    {/if}
</div>

<style>
  .services-container {
    max-width: 900px;
    margin: 40px auto;
    background: #1f1f2f;
    padding: 1.5rem;
    border-radius: 12px;
    color: #e4e4e7;
    font-family: "Poppins", sans-serif;
  }

  h2 {
    color: #00ffc6;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 10px 12px;
    border-bottom: 1px solid #2d2d45;
  }

  th {
    background: #23233a;
    color: #00ffc6;
    text-align: left;
  }

  tr:hover {
    background: #292942;
  }

  .complete-btn {
    background: linear-gradient(135deg, var(--success) 0%, #00d4aa 100%);
    border: none;
    cursor: pointer;
    color: var(--bg-dark);
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 255, 198, 0.3);
}

.complete-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 255, 198, 0.5);
}

.complete-btn:active {
    transform: translateY(0);
}

.complete-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}
</style>
