<script>
  import { onMount } from "svelte";

  let pbiUrl = "https://app.powerbi.com/view?r=eyJrIjoiNzUyZmY3ZjAtYTZjNC00N2ExLTlhMTAtMjVjOTkyOTE3NGQ2IiwidCI6IjFlOWFhYmU4LTY3ZjgtNGYxYy1hMzI5LWE3NTRlOTI0OTlhZSIsImMiOjR9";
  let pbiFrame;

  function refreshDashboard() {
    // Recarga el contenido internamente SIN recrear el iframe
    if (pbiFrame?.contentWindow) {
      pbiFrame.contentWindow.location.reload();
      console.log("🔄 Dashboard refrescado sin recargar página");
    }
  }
</script>

<div class="page">

  <div class="header">
    <h1>MONITOREO AMBIENTAL IoT – ESP32</h1>
    <p>Datos en tiempo real → ESP32 • FastAPI • MySQL • Power BI</p>
  </div>

  <div class="dashboard-card">

    <div class="card-info">
      <div class="metric">
        <h3>Temperatura (°C)</h3>
        <span>—</span>
      </div>
      <div class="metric">
        <h3>Humedad (%)</h3>
        <span>—</span>
      </div>
      <div class="metric">
        <h3>Corriente (A)</h3>
        <span>—</span>
      </div>
      <div class="metric">
        <h3>Última lectura</h3>
        <span>—</span>
      </div>
    </div>

    <div class="frame-wrapper">
      <iframe
        bind:this={pbiFrame}
        src={pbiUrl}
        allowfullscreen
        title="Dashboard IoT"
      ></iframe>
    </div>

    <button class="btn-refresh" on:click={refreshDashboard}>
      ⟳ Actualizar Dashboard
    </button>

  </div>

  

</div>

<style>

  .page {
    min-height: 100vh;
    padding: 2rem;
    background: radial-gradient(circle at top, #0f172a, #020617);
    color: #e2e8f0;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .header h1 {
    font-size: 2rem;
    color: #38bdf8;
    text-shadow: 0 0 15px rgba(56, 189, 248, 0.6);
  }

  .header p {
    color: #94a3b8;
    margin-top: 0.3rem;
  }

  .dashboard-card {
    max-width: 1200px;
    margin: auto;
    padding: 2rem;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    box-shadow: 0 0 40px rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .card-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .metric {
    background: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 14px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .metric h3 {
    font-size: 0.9rem;
    color: #94a3b8;
    margin-bottom: 0.4rem;
  }

  .metric span {
    font-size: 1.5rem;
    font-weight: bold;
    color: #38bdf8;
    text-shadow: 0 0 10px rgba(56,189,248,0.4);
  }

  .frame-wrapper {
    width: 100%;
    padding-top: 56.25%;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid rgba(148,163,184,0.25);
    background: rgba(30,41,59,0.5);
    margin-bottom: 1.5rem;
  }

  .frame-wrapper iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
  }

  .btn-refresh {
    display: block;
    margin: auto;
    padding: 0.8rem 1.6rem;
    font-size: 1rem;
    border: none;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    color: white;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 8px 30px rgba(14,165,233,0.4);
    transition: 0.2s;
  }

  .btn-refresh:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(14,165,233,0.6);
  }

  footer {
    margin-top: 2rem;
    text-align: center;
    color: #64748b;
    font-size: 0.85rem;
  }

</style>
