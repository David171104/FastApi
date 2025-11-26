

<script>
  import { onMount } from "svelte";

  console.log("App.svelte CARGÓ");

  let kpis = {
    users: 0,
    services: 0,
    preventivos: 0,
    correctivos: 0,
    roles: 0
  };

  let error = "";
  let loading = true;

  let powerbiUrl =
    "https://app.powerbi.com/view?r=eyJrIjoiMjRiNTk0ZWEtZjkzMS00ZTRiLTg3NGUtNWZhYjY0ZjFhYTY2IiwidCI6IjFlOWFhYmU4LTY3ZjgtNGYxYy1hMzI5LWE3NTRlOTI0OTlhZSIsImMiOjR9";

  onMount(async () => {
    console.log("onMount ejecutado");

    try {
      const res = await fetch("http://localhost:8000/api/kpis");

      console.log("Respuesta recibida:", res.status);

      if (!res.ok) throw new Error("Error al obtener KPIs");

      const data = await res.json();

      console.log("KPIs cargadas:", data);

      kpis = data;
    } catch (err) {
      console.error("Error en KPIs:", err);
      error = "Error al cargar KPIs";
    } finally {
      loading = false;
    }
  });
</script>

{#if loading}
  <p>Cargando KPIs...</p>
{:else if error}
  <p style="color:red;">{error}</p>
{/if}


<div class="dashboard">
  <div class="main">
    <div class="kpi-container">
      <div class="kpi">
        <div class="kpi-value">{kpis.users}</div>
        <div class="kpi-label">Usuarios Totales</div>
      </div>

      <div class="kpi">
        <div class="kpi-value">{kpis.services}</div>
        <div class="kpi-label">Servicios Totales</div>
      </div>

      <div class="kpi">
        <div class="kpi-value">{kpis.preventivos}</div>
        <div class="kpi-label">Preventivos</div>
      </div>

      <div class="kpi">
        <div class="kpi-value">{kpis.correctivos}</div>
        <div class="kpi-label">Correctivos</div>
      </div>

      <div class="kpi">
        <div class="kpi-value">{kpis.roles}</div>
        <div class="kpi-label">Roles Totales</div>
      </div>
    </div>

    <div class="charts">
      <div class="chart">Gráfico 1</div>
      <div class="chart">Gráfico 2</div>
      <div class="chart">Gráfico 3</div>
      <div class="chart">Gráfico 4</div>
      <div class="chart">Gráfico 5</div>
      <div class="chart">
        <iframe title="Power BI" src={powerbiUrl} allowfullscreen="true"></iframe>
      </div>
    </div>
  </div>

  <div class="filter">
    <h3>Filtro</h3>
    <label>Seleccionar periodo:</label>
    <select>
      <option>Última semana</option>
      <option>Último mes</option>
      <option>Último trimestre</option>
      <option>Último año</option>
    </select>
  </div>
</div>

<style>
  .dashboard {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 1rem;
    padding: 1rem 2rem;
    height: 100vh;
    box-sizing: border-box;
  }

  .main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* KPIs */
  .kpi-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .kpi {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .kpi-value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #004aad;
  }

  .kpi-label {
    font-size: 0.9rem;
    color: #555;
  }

  /* Charts grid */
  .charts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 1rem;
    flex: 1;
  }

  .chart {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    font-size: 0.9rem;
  }

  /* Filtro lateral */
  .filter {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .filter h3 {
    margin-bottom: 1rem;
    color: #004aad;
  }

  select {
    width: 100%;
    padding: 0.5rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
  }
</style>