<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { saveReport, getReports, downloadPDF } from "./technician-reports.js";
    import Swal from "sweetalert2";

    let reports = [];
    let userId = null;
    let showModal = false;

    let form = {
        service_id: "",
        technician_id: "",
        service_description: "",
        service_duration: "",
        recommendation: "",
        client_rating: "",
        client_comments: ""
    };

    onMount(async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;

        userId = JSON.parse(storedUser).id;
        form.technician_id = userId;

        reports = await getReports(userId);
    });

    async function submitForm() {
        await saveReport(form);
        reports = await getReports(userId);

        Swal.fire({
            icon: "success",
            title: "Reporte guardado",
            timer: 1500,
            showConfirmButton: false
        });

        showModal = false;

        form = {
            service_id: "",
            technician_id: userId,
            service_description: "",
            service_duration: "",
            recommendation: "",
            client_rating: "",
            client_comments: ""
        };
    }

    async function showReport(reportId) {
        await downloadPDF(reportId);

        Swal.fire({
            icon: "success",
            title: "Descargando PDF...",
            timer: 1200,
            showConfirmButton: false
        });
    }


// Datos de ejemplo
  const resumen = [
    { titulo: "Servicios este mes", valor: 28, color: "#00d4b3" },
    { titulo: "Completados", valor: 19, color: "#1ea9ff" },
    { titulo: "Pendientes", valor: 6, color: "#d4d4d4" },
    { titulo: "Promedio por semana", valor: 7, color: "#00d4b3" }
  ];

  const datosBarras = [
    { tipo: "Instalación", cantidad: 10 },
    { tipo: "Mantenimiento", cantidad: 12 },
    { tipo: "Recarga", cantidad: 5 },
    { tipo: "Diagnóstico", cantidad: 8 }
  ];

</script>

<div class="container">
    <div class="header">
        <div class="header-content">
            <div class="title-wrapper">
                <i class="fa-solid fa-clipboard-list"></i>
                <h2>Reportes del Técnico</h2>
            </div>
            <p class="subtitle">Gestiona y consulta todos tus reportes de servicio</p>
        </div>
        <button class="btn-primary" on:click={() => showModal = true}>
            <i class="fa-solid fa-plus"></i>
            <span>Nuevo Reporte</span>
        </button>
    </div>

    <!-- ESTADÍSTICAS -->
    <div class="stats">
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fa-solid fa-file-lines"></i>
            </div>
            <div class="stat-info">
                <p class="stat-label">Total Reportes</p>
                <p class="stat-value">{reports.length}</p>
            </div>
        </div>
    </div>

    <!-- TABLA -->
    <div class="table-wrapper">
        {#if reports.length === 0}
            <div class="no-data">
                <i class="fa-solid fa-folder-open"></i>
                <p>No hay reportes generados</p>
                <span>Crea tu primer reporte para comenzar</span>
            </div>
        {:else}
            <table>
                <thead>
                    <tr>
                        <th><span class="th-content">#</span></th>
                        <th><span class="th-content">Servicio</span></th>
                        <th><span class="th-content">Cliente</span></th>
                        <th><span class="th-content">Descripción</span></th>
                        <th><span class="th-content">Duración</span></th>
                        <th class="text-right"><span class="th-content">Acciones</span></th>
                    </tr>
                </thead>

                <tbody>
                    {#each reports as r, i}
                        <tr>
                            <td><span class="badge">{i + 1}</span></td>
                            <td><span class="service-id">#{r.service_id}</span></td>
                            <td><span class="client_name">{r.client_name} {r.client_last_name}</span></td>
                            <td><span class="description">{r.service_description}</span></td>
                            <td><span class="duration">{r.service_duration}</span></td>
                            <td class="text-right">
                                <button class="btn-pdf" on:click={() => showReport(r.id)} title="Descargar PDF">
                                <i class="fa-solid fa-file-pdf"></i>
                                <span>PDF</span>
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    </div>
</div>

<!-- MODAL -->
{#if showModal}
<div class="modal-backdrop" on:click={() => showModal = false} transition:fade>
    <div class="modal" on:click|stopPropagation transition:fade>

        <div class="modal-header">
            <h3>
                <i class="fa-solid fa-file-circle-plus"></i>
                Nuevo Reporte
            </h3>
            <button class="close-btn" on:click={() => showModal = false}>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>

        <div class="modal-body">
            <div class="grid">
                <div class="input-group">
                    <label>
                        <i class="fa-solid fa-hashtag"></i>
                        ID del Servicio
                    </label>
                    <input 
                        type="text" 
                        bind:value={form.service_id} 
                        placeholder="Ingresa el ID del servicio"
                    />
                </div>

                <div class="input-group">
                    <label>
                        <i class="fa-solid fa-clock"></i>
                        Duración
                    </label>
                    <input 
                        type="text" 
                        bind:value={form.service_duration} 
                        placeholder="Ej: 2 horas"
                    />
                </div>

                <div class="input-group full">
                    <label>
                        <i class="fa-solid fa-align-left"></i>
                        Descripción del Servicio
                    </label>
                    <textarea 
                        rows="3" 
                        bind:value={form.service_description}
                        placeholder="Describe el servicio realizado..."
                    ></textarea>
                </div>

                <div class="input-group full">
                    <label>
                        <i class="fa-solid fa-lightbulb"></i>
                        Recomendación
                    </label>
                    <textarea 
                        rows="2" 
                        bind:value={form.recommendation}
                        placeholder="Recomendaciones para el cliente..."
                    ></textarea>
                </div>

                <div class="input-group">
                    <label>
                        <i class="fa-solid fa-star"></i>
                        Calificación del Cliente
                    </label>
                    <input 
                        type="text" 
                        bind:value={form.client_rating}
                        placeholder="1-5"
                    />
                </div>

                <div class="input-group">
                    <label>
                        <i class="fa-solid fa-comment"></i>
                        Comentarios
                    </label>
                    <input 
                        type="text" 
                        bind:value={form.client_comments}
                        placeholder="Comentarios adicionales"
                    />
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button class="btn-secondary" on:click={() => showModal = false}>
                <i class="fa-solid fa-xmark"></i>
                Cancelar
            </button>
            <button class="btn-primary" on:click={submitForm}>
                <i class="fa-solid fa-check"></i>
                Guardar Reporte
            </button>
        </div>

    </div>
</div>
{/if}

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* --- VARIABLES --- */
:root {
    --primary: #00ffc6;
    --primary-dark: #00cc9e;
    --bg-dark: #0a0c12;
    --bg-card: #13151f;
    --bg-card-hover: #1a1d2b;
    --border: #1f2332;
    --text-primary: #ffffff;
    --text-secondary: #8b92b0;
    --danger: #ff4e6d;
    --warning: #ffb347;
    --success: #00ffc6;
    --shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
}

/* --- Layout general --- */
.container {
    padding: 40px 50px;
    max-width: 1400px;
    margin: 0 auto;
    color: var(--text-primary);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0c12 0%, #13151f 100%);
}

/* --- Header --- */
.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 35px;
    gap: 30px;
}

.header-content {
    flex: 1;
}

.title-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 8px;
}

.title-wrapper i {
    font-size: 32px;
    color: var(--primary);
}

h2 {
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary) 0%, #00d4aa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.subtitle {
    color: var(--text-secondary);
    font-size: 15px;
    margin-top: 5px;
}

/* --- Estadísticas --- */
.stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 20px;
    transition: all 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: var(--primary);
}

.stat-icon {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary) 0%, #00d4aa 100%);
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    color: var(--bg-dark);
    flex-shrink: 0;
}

.stat-info {
    flex: 1;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 13px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
}

/* --- Botones --- */
.btn-primary {
    background: linear-gradient(135deg, var(--primary) 0%, #00d4aa 100%);
    color: var(--bg-dark);
    padding: 14px 28px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 255, 198, 0.3);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 255, 198, 0.5);
}

.btn-primary:active {
    transform: translateY(0);
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

/* --- Tabla --- */
.table-wrapper {
    background: var(--bg-card);
    padding: 0;
    border-radius: 16px;
    border: 1px solid var(--border);
    overflow: hidden;
    box-shadow: var(--shadow);
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background: linear-gradient(135deg, #1a1d2b 0%, #13151f 100%);
}

thead tr {
    border-bottom: 2px solid var(--primary);
}

th {
    padding: 18px 20px;
    text-align: left;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--text-secondary);
}

.th-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

tbody tr {
    border-bottom: 1px solid var(--border);
    transition: all 0.2s ease;
}

tbody tr:hover {
    background: var(--bg-card-hover);
}

tbody tr:last-child {
    border-bottom: none;
}

td {
    padding: 18px 20px;
    color: var(--text-primary);
}

.badge {
    background: var(--primary);
    color: var(--bg-dark);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 700;
    display: inline-block;
}

.service-id {
    color: var(--primary);
    font-weight: 600;
    font-family: 'Courier New', monospace;
}

.description {
    color: var(--text-secondary);
    display: block;
    max-width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.duration {
    color: var(--warning);
    font-weight: 500;
}

.text-right {
    text-align: right;
}

.no-data {
    text-align: center;
    padding: 80px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.no-data i {
    font-size: 64px;
    color: var(--text-secondary);
    opacity: 0.3;
    margin-bottom: 10px;
}

.no-data p {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-secondary);
}

.no-data span {
    font-size: 14px;
    color: var(--text-secondary);
    opacity: 0.7;
}

/* --- MODAL --- */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(8px);
    z-index: 1000;
    padding: 20px;
}

.modal {
    background: var(--bg-card);
    padding: 0;
    width: 100%;
    max-width: 700px;
    border-radius: 20px;
    border: 1px solid var(--primary);
    box-shadow: var(--shadow-lg);
    animation: modalSlideIn 0.3s ease;
    max-height: 90vh;
    overflow-y: auto;
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }
    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 28px 32px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(135deg, #1a1d2b 0%, #13151f 100%);
}

.modal-header h3 {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
}

.modal-header i {
    color: var(--primary);
    font-size: 24px;
}

.close-btn {
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    font-size: 20px;
}

.close-btn:hover {
    background: var(--bg-card-hover);
    color: var(--danger);
}

.modal-body {
    padding: 32px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
}

.full {
    grid-column: span 2;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.input-group label {
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.input-group label i {
    color: var(--primary);
    font-size: 14px;
}

input, textarea {
    width: 100%;
    padding: 14px 16px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--bg-dark);
    color: var(--text-primary);
    font-size: 15px;
    font-family: inherit;
    transition: all 0.3s ease;
}

input::placeholder,
textarea::placeholder {
    color: var(--text-secondary);
    opacity: 0.5;
}

input:focus,
textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(0, 255, 198, 0.1);
    background: var(--bg-card);
}

textarea {
    resize: vertical;
    min-height: 80px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 24px 32px;
    gap: 12px;
    border-top: 1px solid var(--border);
    background: var(--bg-dark);
}

/* --- Responsive --- */
@media (max-width: 768px) {
    .container {
        padding: 25px 20px;
    }

    .header {
        flex-direction: column;
        align-items: stretch;
    }

    .grid {
        grid-template-columns: 1fr;
    }

    .full {
        grid-column: span 1;
    }

    table {
        font-size: 14px;
    }

    th, td {
        padding: 12px 10px;
    }

    .description {
        max-width: 200px;
    }
}

/* --- Scrollbar --- */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}

::-webkit-scrollbar-track {
    background: var(--bg-dark);
}

::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
}

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

</style>