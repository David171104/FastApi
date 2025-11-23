<script>
  import { onMount } from 'svelte';
  import { getAllServices, loadTechnicians, assignTechnician   } from './admin-services.js';
  import { getStatusLabel } from '$lib/helpers/constants.js';
  import Swal from 'sweetalert2';


  let services = [];
  let technicians = [];
  let showAssignModal = false;
  let selectedServiceId = null;
  let selectedTechnician = "";
  onMount(async () => {

    try {
      services = await getAllServices();
      technicians = await loadTechnicians();

    } catch (error) {
      console.error("Error al inicializar:", error);
    }

  });



  async function openAssignModal(serviceId) {
    selectedServiceId = serviceId;
    showAssignModal = true;
  }


  function closeAssignModal() {
    showAssignModal = false;
  }

  
  async function confirmAssignTechnician() {
    if (!selectedTechnician) {
      Swal.fire("Atención", "Debes seleccionar un técnico antes de continuar.", "warning");
      return;
    }

    try {
      await assignTechnician(selectedServiceId, selectedTechnician);
      Swal.fire("¡Éxito!", "Técnico asignado correctamente.", "success");
      closeAssignModal();
      services = await getAllServices();
    } catch (error) {
      const msg = error?.response?.data?.detail || "Error al asignar técnico.";
      Swal.fire("Error", msg, "error");
    }
  }
</script>



<div class="assign-container">
  <div class="assign-header">
    <h6>Asignar Servicios</h6>
    <p>Selecciona un técnico y asigna los servicios pendientes de mantenimiento.</p>
       
  </div>

  <div class="assigned-list">
    <h4>Servicios Registrados</h4>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Técnico</th>
          <th>Tipo de Servicio</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Dirección</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {#if services.length > 0}
          {#each services as service}
            <tr>
              <td>{service.id}</td>
              <td>{service.client_name || 'Sin cliente'}</td>
              <td>{service.technician_name || 'Sin asignar'}</td>
              <td>{service.service_type}</td>
              <td>{service.request_date}</td>
              <td>{service.request_time}</td>
              <td>{service.address}</td>
              <td>{@html getStatusLabel(service.current_status)}</td>
              <td>
                {#if service.current_status === 'pending'}
                  <button class="assign-btn" on:click={() => openAssignModal(service.id)}>
                    <i class="fas fa-user-gear"></i> Asignar Técnico
                  </button>
                {:else}
                  <span style="color:#999;">—</span>
                {/if}
              </td>
            </tr>
          {/each}
        {:else}
          <tr><td colspan="9" style="text-align:center;color:#aaa;">No hay servicios registrados</td></tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>

<!-- Modal -->

{#if showAssignModal}
  <div class="modal-overlay" on:click={closeAssignModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>Asignar Técnico</h2>
      <p>Selecciona un técnico para este servicio:</p>

      <!-- ÚNICO SELECT -->
      <select
        bind:value={selectedTechnician}
        class="w-full border rounded p-2"
      >
        <option value="">Seleccionar técnico...</option>
        {#each technicians as t}
          <option value={t.id}>{t.name} {t.last_name}</option>
        {/each}
      </select>

      <div class="modal-actions">
        <button class="btn btn-cancel" on:click={closeAssignModal}>Cancelar</button>
        <button class="btn btn-confirm" on:click={confirmAssignTechnician}>Asignar</button>
      </div>
    </div>
  </div>
{/if}

<style>
  body {
    background-color: #161625;
    font-family: "Poppins", sans-serif;
    color: #e4e4e7;
  }

  .assign-container {
    max-width: 1100px;
    margin: 40px auto;
    background-color: #1f1f2f;
    padding: 2rem;
    border-radius: 14px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  }

  .assign-header h6 {
    font-size: 1.6rem;
    color: #00ffc6;
    margin-bottom: 5px;
  }

  .assign-header p {
    color: #b5b5c3;
    font-size: 0.95rem;
    margin-bottom: 20px;
  }

  .assign-btn {
    background-color: #00ffc6;
    color: #0a0a0f;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .assign-btn:hover {
    background-color: #00d1b2;
    transform: scale(1.03);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #1e1e2f;
    border-radius: 10px;
    overflow: hidden;
  }

  th, td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #2d2d45;
  }

  th {
    background-color: #23233a;
    color: #00ffc6;
  }

  tr:hover {
    background-color: #292942;
  }

  /* --- MODAL --- */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease forwards;
    z-index: 999;
  }

  .modal-content {
    background: #1e1e2f;
    color: #e4e4e7;
    padding: 2rem;
    border-radius: 12px;
    width: 420px;
    max-width: 90%;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    animation: slideUp 0.3s ease forwards;
  }

  .modal-content h2 {
    margin-bottom: 1rem;
    color: #00ffc6;
  }

  .modal-content p {
    color: #b5b5c3;
    margin-bottom: 1rem;
  }

  
  .modal-content select {
    background-color: #1e1e2f;
    color: #e4e4e7;
    border: 1px solid #00ffc6;
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 1.8rem;
    appearance: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .modal-actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem; 
  }

  .btn {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
  }

  .btn-cancel {
    background: #2d2d45;
    color: #ccc;
  }

  .btn-confirm {
    background: #00ffc6;
    color: #0a0a0f;
  }

  .btn-cancel:hover {
    background: #38385c;
  }

  .text-right {
    text-align: right;
  }

  .btn-confirm:hover {
    background: #00d1b2;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
</style>