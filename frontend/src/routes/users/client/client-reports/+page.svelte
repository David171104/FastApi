<script>
  import { onMount } from "svelte";
  import { getClientReports, getReportById, updateReport, downloadPDF } from "./client-reports.js";
  import { getStatusLabel } from '$lib/helpers/constants.js';

  let reports = [];
  let userId = null;
  let form = {
    id: null,
    client_rating: "",
    client_comments: ""
  };

  let showModal = false;

  
  onMount(async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return;

    userId = JSON.parse(storedUser).id;

    reports = await getClientReports(userId);
  });

  async function download(reportId) {
    await downloadPDF(reportId);

    Swal.fire({
        icon: "success",
        title: "Descargando PDF...",
        timer: 1200,
        showConfirmButton: false
    });
  }


   

  async function showReport(id) {
    const data = await getReportById(id);
    console.log('data', data);

    form.id = id;
    form.client_rating = data.client_rating ?? "";
    form.client_comments = data.client_comments ?? "";

    showModal = true;
  }

  async function saveReport() {
    console.log('saveReport', form);
    await updateReport(form);
    showModal = false;


    const storedUser = JSON.parse(localStorage.getItem("user"));
    reports = await getClientReports(storedUser.id);
  }
  
  
</script>

<div class="reportes-page">
  

  

  <!-- Tabla -->
  <section class="tabla">
    <h2>Reportes recientes</h2>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Servicio</th>
          <th>Técnico</th>
          <th>Estado</th>
          <th>Calificación</th>
          <th>Observación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each reports as r}
          <tr>
            <td>{new Date(r.created_at).toLocaleDateString("es-CO")}</td>
            <td>{r.id}</td>
            <td>{r.technician_name} {r.technician_last_name}</td>
            <td>{@html getStatusLabel(r.current_status)}</td>
            <td>{r.client_rating}</td>
            <td>{r.client_comments}</td>
            <td>
              <button class="btn-edit" on:click={() => showReport(r.id)}>
                <i class="fa-solid fa-pen-to-square"></i>
                Editar
              </button>
              <button class="btn-pdf" on:click={() => download(r.id)} title="Descargar PDF">
                <i class="fa-solid fa-file-pdf"></i>
                <span>PDF</span>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>

<!-- MODAL -->
{#if showModal}
  <div class="modal-backdrop" on:click={() => showModal = false}>
    <div class="modal" on:click|stopPropagation>

      <div class="modal-header">
        <h3><i class="fa-solid fa-pen-to-square"></i> Editar Reporte</h3>
        <button class="close-btn" on:click={() => showModal = false}>×</button>
      </div>

      <div class="modal-body">
        <div class="grid">

          <div class="input-group">
            <label>Calificación (1–5)</label>
            <input type="text"  bind:value={form.client_rating} />
          </div>

          <div class="input-group full">
            <label>Comentarios</label>
            <textarea bind:value={form.client_comments}></textarea>
          </div>

        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-secondary" on:click={() => showModal = false}>Cancelar</button>
        <button class="btn-primary" on:click={saveReport}>Guardar Cambios</button>
      </div>

    </div>
  </div>
{/if}

<style>
  .reportes-page {
    background: #1c1b29;
    color: #fff;
    min-height: 100vh;
    padding: 5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .intro {
    text-align: center;
    margin-bottom: 3rem;
  }

  .intro h1 {
    font-size: 2.2rem;
    color: #00d4b3;
  }

  .intro p {
    color: #d4d4d4;
    font-size: 1rem;
    margin-top: 0.5rem;
  }

  /* Tarjetas resumen */
  .resumen {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 3rem;
  }

  .card {
    background: #25243a;
    border-radius: 1rem;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card h3 {
    color: #d4d4d4;
    font-size: 1rem;
  }

  .card p {
    font-size: 1.8rem;
    color: #fff;
    margin-top: 0.5rem;
  }

  /* Gráficas */
  .graficas {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 3rem;
  }

  .grafica {
    background: #25243a;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0 20px rgba(0, 212, 179, 0.15);
  }

  .grafica h2 {
    color: #00d4b3;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  /* Gráfica de barras simulada */
  .bar-chart {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 200px;
  }

  .bar-item {
    text-align: center;
  }

  .bar {
    width: 30px;
    background: linear-gradient(180deg, #00d4b3, #1ea9ff);
    border-radius: 6px 6px 0 0;
    transition: height 0.3s ease;
  }

  .bar-item span {
    display: block;
    margin-top: 0.5rem;
    color: #d4d4d4;
    font-size: 0.85rem;
  }

  /* Gráfica circular simulada */
  .circular {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pie {
    position: relative;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: conic-gradient(
      #00d4b3 0deg 200deg,
      #1ea9ff 200deg 260deg,
      #d4d4d4 260deg 360deg
    );
    margin-bottom: 1rem;
  }

  .leyenda {
    list-style: none;
    padding: 0;
  }

  .leyenda li {
    color: #d4d4d4;
    margin: 4px 0;
    font-size: 0.9rem;
  }

  .color {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 4px;
    margin-right: 8px;
  }

  .color.completado {
    background: #00d4b3;
  }
  .color.curso {
    background: #1ea9ff;
  }
  .color.pendiente {
    background: #d4d4d4;
  }

  /* Tabla */
  .tabla {
    width: 100%;
    max-width: 1000px;
  }

  .tabla h2 {
    color: #00d4b3;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #25243a;
    border-radius: 1rem;
    overflow: hidden;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    font-size: 0.95rem;
  }

  th {
    background: #2d2b3f;
    color: #00d4b3;
  }

  tr:nth-child(even) {
    background: #2a2940;
  }

  td {
    color: #d4d4d4;
  }

  .estado.completado {
    color: #00d4b3;
  }

  .estado.pendiente {
    color: #d4d4d4;
  }

  @media (max-width: 600px) {
    .intro h1 {
      font-size: 1.8rem;
    }
    th, td {
      font-size: 0.85rem;
    }
  }

  .btn-secondary {
    background: var(--bg-card);
    padding: 14px 28px;
    border-radius: 12px;
    color: var(--text-primary);
    border: 1px solid var(--border);
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: var(--bg-card-hover);
    border-color: var(--text-secondary);
}

.btn-pdf {
    background: linear-gradient(135deg, var(--danger) 0%, #ff6b85 100%);
    border: none;
    cursor: pointer;
    color: white;
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

.actions {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background: #3498db;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-edit i {
  margin-right: 4px;
}


/* FONDO OSCURO DE MODAL */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 20, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  z-index: 999;
}

/* CUERPO DE LA MODAL */
.modal {
  background: #111827;
  padding: 25px;
  width: 520px;
  border-radius: 14px;
  box-shadow: 0 0 20px rgba(0,0,0,0.45);
  animation: fadeIn 0.2s ease-out;
  border: 1px solid rgba(0,255,180,0.15);
}

@keyframes fadeIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* HEADER */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.modal-header h3 {
  color: #d1d5db;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  color: #1effc9;
}

/* BOTÓN CERRAR */
.close-btn {
  background: transparent;
  color: #1effc9;
  border: none;
  font-size: 22px;
  cursor: pointer;
}

/* FORM */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group.full {
  grid-column: 1 / -1;
}

label {
  color: #9ca3af;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

input, textarea {
  background: #0f172a;
  border: 1px solid #1f2937;
  padding: 10px;
  color: white;
  border-radius: 8px;
}

textarea {
  height: 120px;
}

/* FOOTER */
.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* BUTTONS */
.btn-secondary {
  background: #374151;
  color: #e5e7eb;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #10f5b1;
  color: #0f172a;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 245, 177, 0.3);
}

</style>
