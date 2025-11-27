<script>
  import { onMount } from "svelte";

  let powerbiUrl =
    "https://app.powerbi.com/reportEmbed?reportId=97816d51-2d3a-47b7-891d-d9224b9ca6bf&autoAuth=true&ctid=1e9aabe8-67f8-4f1c-a329-a754e92499ae";

  let pbiFrame;
  let ws;

  onMount(() => {
    // 1. Conectar WebSocket al backend FastAPI
    ws = new WebSocket("ws://192.168.1.9:8002/ws/actualizaciones");

    // 2. Cuando llegue una nueva lectura → refrescar dashboard
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.evento === "nueva_lectura") {
        console.log("Nueva lectura recibida:", data);

        // Refrescar Power BI sin recargar página
        if (pbiFrame) {
          pbiFrame.src = pbiFrame.src;
        }
      }
    };

    ws.onopen = () => {
      console.log("WebSocket conectado a FastAPI ✔");
    };

    ws.onclose = () => {
      console.log("WebSocket desconectado. Reintentando…");
      setTimeout(() => location.reload(), 1500);
    };
  });

  // Botón manual opcional
  function refreshDashboard() {
    pbiFrame.src = pbiFrame.src;
  }
</script>

<div class="container">
  <div class="header">
    <div class="title-block">
      <h1>MONITOREO AMBIENTAL IoT ESP32 – DASHBOARD EN TIEMPO REAL</h1>
      <p>Datos provenientes del ESP32 → FastAPI → MySQL → Power BI</p>
    </div>

    <div class="status-pill">
      <div class="status-dot"></div>
      Actualizando automáticamente (WebSocket)
    </div>
  </div>

  <div class="frame-wrapper">
    <iframe
      bind:this={pbiFrame}
      title="Dashboard IoT ESP32"
      src={powerbiUrl}
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>

  <div class="actions">
    <button class="btn-refresh" on:click={refreshDashboard}>
      <span class="icon">⟳</span>
      Refrescar manual
    </button>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", sans-serif;
    background: #f5f7fa;
    color: #333;
  }

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

    .header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
    }

    .title-block h1 {
      font-size: clamp(1.3rem, 2.2vw, 1.8rem);
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #38bdf8;
    }

    .title-block p {
      font-size: 0.85rem;
      color: #9ca3af;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      background: rgba(34, 197, 94, 0.12);
      border: 1px solid rgba(34, 197, 94, 0.35);
      font-size: 0.75rem;
      color: #22c55e;
      white-space: nowrap;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #22c55e;
      box-shadow: 0 0 12px rgba(34, 197, 94, 0.8);
    }

    .frame-wrapper {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid rgba(55, 65, 81, 0.9);
      background: radial-gradient(circle at top left, #111827, #020617);
    }

    .frame-wrapper iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 0.5rem;
    }

    .btn-refresh {
      border: none;
      outline: none;
      cursor: pointer;
      padding: 0.45rem 0.95rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #0ea5e9, #6366f1);
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.4);
      transition: transform 0.12s ease-out, box-shadow 0.12s ease-out;
    }

    .btn-refresh:hover {
      transform: translateY(-1px);
      box-shadow: 0 14px 30px rgba(56, 189, 248, 0.55);
    }

    .btn-refresh span.icon {
      font-size: 0.9rem;
    }

    @media (max-width: 640px) {
      .container {
        padding: 1.1rem 1.1rem 1.6rem;
      }
    }
</style>
