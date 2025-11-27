<script>
  import { onMount } from "svelte";
  import { getAllReports, downloadPDF } from "./admin-reports.js";
  import { getStatusLabel } from '$lib/helpers/constants.js';

  let reports = [];

  // filtros
  let technician_id = null; // null para que cargue todos
  let status = "all";
  let date_from = "";
  let date_to = "";

  onMount(async () => {
    reports = await getAllReports();
  });

  async function search() {
    reports = await getAllReports({
      technician_id,
      status,
      date_from,
      date_to
    });
  }

  function download(id) {
    downloadPDF(id);
  }
</script>




<div class="container">
  <!-- <header class="appbar">
    <div class="brand">
      <div class="logo">SD</div>
      <div>
        <div class="title">Formulario de Búsqueda — Demo</div>
        <div class="subtitle">Página estática de prueba (no funcional)</div>
      </div>
    </div>
  </header> -->

  <div class="card">
  <h3>Buscar reportes</h3>

  <form class="search-form" on:submit|preventDefault={search}>
    
    <div class="row">
      <div class="field">
        <label>Estado</label>
        <select bind:value={status}>
          <option value="all">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="assigned">Asignado</option>
          <option value="completed">Completado</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="field">
        <label>Rango de fechas</label>
        <div class="dates">
          <input type="date" bind:value={date_from} />
          <input type="date" bind:value={date_to} />
        </div>
      </div>
    </div>

    <div class="buttons">
      <button class="btn primary">Buscar</button>
    </div>

  </form>
</div>

  <div class="card table-wrap">
    <h3>Resultados </h3>
    {#if reports.length === 0}
      <p style="color: #666; margin-top: 10px;">No hay reportes registrados.</p>
    {:else}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Técnico</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {#each reports as r}
            <tr>
              <td>{r.id}</td>
              <td>{r.technician_name} {r.technician_last_name}</td>
              <td>{r.client_name} {r.client_last_name}</td>
              <td>{new Date(r.created_at).toLocaleDateString("es-CO")}</td>
              <td>{r.service_description}</td>
              <td>{@html getStatusLabel(r.current_status)}</td>
              <td class="text-right">
                <button class="btn-pdf" on:click={() => download(r.id)}>
                  <i class="fa-solid fa-file-pdf"></i> PDF
                </button>
              </td>
            </tr>
          {/each}
        </tbody>

      </table>
    {/if}
  </div>
</div>

<style>
  .container {
    max-width: 1100px;
    margin: 30px auto;
    padding: 20px;
    color: #f0f4f8;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .card {
    background: #141b2d;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  h3 {
    margin-top: 0;
    color: #00ffc6;
  }

  .search-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .row {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .field {
    flex: 1;
  }

  label {
    display: block;
    font-size: 14px;
    color: #00ffc6;
    margin-bottom: 6px;
  }

  input[type='text'],
  input[type='date'],
  select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #334155;
    background: #1e293b;
    color: #e2e8f0;
  }

  .dates {
    display: flex;
    gap: 10px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  button {
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 600;
    cursor: not-allowed;
  }

  .btn.primary {
    background-color: #00ffc6;
    color: #0a0a0f;
  }


  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #1e293b;
    border-radius: 10px;
  }

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #334155;
  }

  th {
    color: #94a3b8;
    text-transform: uppercase;
    font-size: 12px;
  }

  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 12px;
    color: #111827;
  }

  .btn-pdf {
    background: linear-gradient(135deg, var(--danger) 0%, #ff6b85 100%);
    border: none;
    cursor: pointer;
    color: #00ffc6;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.btn-pdf:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 78, 109, 0.4);
}

button.btn.primary {
  cursor: pointer;
}

</style>
