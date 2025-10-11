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

  
</style>

<script>
    import Swal from 'sweetalert2';
    import { onMount } from 'svelte';
    import { createService, getUserServices } from './services.js';
    import { getStatusLabel, formatDate, formatTime } from '$lib/helpers/constants.js';

    let user = null;
    let showModal = false;
    let services = [];
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

</script>

<div class="page-container">
  <div class="card">
    <div class="header-row">
      <h2>Servicios del Cliente</h2>
      <button class="edit-btn" on:click={() => (showModal = true)}>
        Solicitar Servicio
      </button>
    </div>

    <table class="user-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Tipo</th>
          <th>Dirección</th>
          <th>Estado</th>
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
              <td>{getStatusLabel(service.current_status)}</td>
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
