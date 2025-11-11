<style>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    background-color: #1e1e2f;
    min-height: 100vh;
  }

  .card {
    width: 100%;
    max-width: 1000px;
    background: #2a2a40;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    color: #cfcfe6;
  }

  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.6rem;
    color: #00d1b2;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 40px;
  }

  thead {
    background-color: #00d1b2;
    color: white;
  }

  th, td {
    padding: 14px 18px;
    text-align: left;
  }

  tbody tr {
    background-color: #2f2f4f;
    transition: background 0.3s ease;
  }

  tbody tr:nth-child(even) {
    background-color: #35355a;
  }

  tbody tr:hover {
    background-color: #3f3f6b;
  }

    .header-row {
        display: flex;
        justify-content: space-between; /* separa el título del botón */
        align-items: center; /* centra verticalmente */
        margin-bottom: 15px;
    }

    /* ya tienes esto, solo agregamos margen para separarlo visualmente */
    .edit-btn {
    background-color: #00d1b2;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
    margin-left: auto; /* asegura que quede al extremo derecho */
    }

    .edit-btn:hover {
    background-color: #00b89c;
    }

  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(15, 15, 30, 0.85);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }

  .modal {
    background: #2a2a40;
    padding: 25px;
    border-radius: 10px;
    width: 400px;
    color: #cfcfe6;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  .modal h3 {
    color: #00d1b2;
    text-align: center;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-top: 10px;
    color: #b0b0d0;
    font-size: 0.9rem;
  }

  input, select {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: none;
    margin-top: 5px;
    background-color: #35355a;
    color: white;
  }

  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .save-btn {
    background-color: #00d1b2;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
  }

  .save-btn:hover {
    background-color: #00b89c;
  }

  .cancel-btn {
    background-color: #ff5c5c;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
  }

  .cancel-btn:hover {
    background-color: #e64b4b;
  }

  .delete-btn {
    background-color: #e63946;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  .delete-btn:hover {
    background-color: #d62828;
  }
</style>

<script>
  import Swal from 'sweetalert2';
  import { onMount } from 'svelte';
  import { createService, getUserServices, updateService, deleteService } from './services.js';
  import { getStatusLabel, formatDate, formatTime } from '$lib/helpers/constants.js';
  import { hasPermissionCreate, hasPermissionEdit, hasPermissionDelete } from '$lib/helpers/permissions.js';
  
  let user = null;
  let canCreate = false;
  let canEdit = false;
  let canDelete = false;
  let showModal = false;
  let showEditModal = false;
  let services = [];
  let selectedService = null;

  let formData = {
    client_id: '',
    request_date: '',
    request_time: '',
    service_type: 'Correctivo',
    address: ''
  };

  onMount(async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user){
      services = await getUserServices(user.id);
      formData.client_id = user.id;

      const permisoCrear = await hasPermissionCreate(user, 'Servicios');
      const permisoEditar = await hasPermissionEdit(user, 'Servicios');
      const permisoEliminar = await hasPermissionDelete(user, 'Servicios');

      canCreate = permisoCrear.permiso;
      canEdit = permisoEditar.permiso;
      canDelete = permisoEliminar.permiso;
    } 
  });

  async function handleSubmit() {
    try {
      await createService(formData);
      showModal = false;
    } catch (err) {
      console.error("Error:", err);
    }
      
  }


    
 function openEditServiceModal(service) {
  selectedService = { ...service, request_time: formatTime(service.request_time) };
  showEditModal = true;
}


  function closeEditServiceModal() {
    showEditModal = false;
    selectedService = null;
  }

  async function saveChanges() {
    const confirm = await Swal.fire({
      title: '¿Guardar cambios?',
      text: '¿Deseas actualizar los datos del servicio?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateService(selectedService.id, selectedService);
      Swal.fire('Éxito', 'Servicio actualizado correctamente', 'success');
      closeEditServiceModal();
      
    } catch (err) {
      console.error('Error:', err);
      Swal.fire('Error', 'No se pudo actualizar el servicio.', 'error');
    }
  }

  async function handleDelete(serviceId) {
    const confirm = await Swal.fire({
      title: '¿Eliminar servicio?',
      text: 'Esta acción marcará el servicio como eliminado.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteService(serviceId);
      Swal.fire('Eliminado', 'El servicio fue eliminado correctamente', 'success');
      
    } catch (err) {
      console.error('Error:', err);
      Swal.fire('Error', 'No se pudo eliminar el servicio.', 'error');
    }
  }

</script>

<div class="page-container">
  <div class="card">
    <div class="header-row">
      <h2>Servicios del Cliente</h2>
      {#if canCreate}
        <button class="edit-btn" on:click={() => (showModal = true)}>
          Solicitar Servicio
        </button>
      {/if}
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Tipo</th>
          <th>Dirección</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#if services.length > 0}
          {#each services as service}
            <tr>
             
              <td>{formatDate(service.request_date)}</td>
              <td>{formatTime(service.request_time)}</td>
              <td>{service.service_type}</td>
              <td>{service.address}</td>
              <td>{@html getStatusLabel(service.current_status)}</td>
              <td>
                {#if canEdit}
                  <button class="edit-btn" on:click={() => openEditServiceModal(service)}> Editar</button>
                {/if}

                {#if canDelete}
                  <button class="delete-btn" on:click={() => handleDelete(service.id)}>Eliminar</button>
                {/if}
              </td>
            </tr>
          {/each}
        {:else}
          <tr>
            <td colspan="5" style="text-align:center;">Sin servicios aún</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>


{#if showModal}
  <div class="modal-backdrop">
    <div class="modal">
      <h3>Solicitar Servicio</h3>

      <label>Fecha del servicio</label>
      <input type="date" bind:value={formData.request_date} required />

      <label>Hora del servicio</label>
      <input type="time" bind:value={formData.request_time} required />

      <label>Tipo de servicio</label>
      <select bind:value={formData.service_type}>
        <option value="Correctivo">Correctivo</option>
        <option value="Preventivo">Preventivo</option>
      </select>

      <label>Dirección</label>
      <input type="text" placeholder="Dirección del servicio" bind:value={formData.address} required />

      <div class="modal-actions">
        <button class="save-btn" on:click={handleSubmit}>Guardar</button>
        <button class="cancel-btn" on:click={() => (showModal = false)}>Cancelar</button>
      </div>
    </div>
  </div>
{/if}



{#if showEditModal}
  <div class="modal-backdrop">
    <div class="modal">
      <h3>Editar Servicio</h3>

      
      <label>Fecha del servicio</label>
      <input type="date" bind:value={selectedService.request_date} required/>

      <label>Hora del servicio</label>
      <input type="time" bind:value={selectedService.request_time} required />

      <label>Tipo de servicio</label>
      <select bind:value={selectedService.service_type}>
        <option value="Correctivo">Correctivo</option>
        <option value="Preventivo">Preventivo</option>
      </select>

      <label>Dirección</label>
      <input type="text" placeholder="Dirección del servicio" bind:value={selectedService.address} required />



      <div class="modal-actions">
        <button class="save-btn" on:click={saveChanges} disabled={!selectedService}>Guardar</button>

        <button class="cancel-btn" on:click={closeEditServiceModal}>❌ Cancelar</button>
      </div>
    </div>
  </div>
{/if}
