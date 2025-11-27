<script>
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import { getStats } from "./client.js";

 
  const serviciosPrincipales = [
    {
      id: 1,
      nombre: "Mantenimiento Preventivo",
      descripcion: "Revisión y limpieza de componentes del sistema de climatización.",
      estado: "Completado",
      icono: "🧰",
      color: "#00d4b3"
    },
    {
      id: 2,
      nombre: "Instalación de Equipos",
      descripcion: "Montaje e instalación de unidades de aire acondicionado residenciales y comerciales.",
      estado: "En curso",
      icono: "⚙️",
      color: "#1ea9ff"
    },
    {
      id: 3,
      nombre: "Recarga de Gas",
      descripcion: "Servicio técnico de recarga de gas refrigerante con certificación y garantía.",
      estado: "Pendiente",
      icono: "❄️",
      color: "#d4d4d4"
    },
    {
      id: 4,
      nombre: "Diagnóstico Técnico",
      descripcion: "Detección y análisis de fallas para reparación rápida y eficiente.",
      estado: "En curso",
      icono: "🔍",
      color: "#00d4b3"
    }
  ];

  let user = {};
  let resumen = [];
  let datosBarras = [];
  let torta = {};

  onMount(async () => {
    user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
      Swal.fire("Error", "No se encontró la sesión del usuario", "error");
      return;
    }

    const data = await getStats(user.id);

    if (!data || !data.success) {
      Swal.fire("Error", "No se pudieron cargar las estadísticas", "error");
      return;
    }

    resumen = data.resumen;
    datosBarras = data.barras;
    torta = data.torta;
  });
</script>

<div class="servicios-page">
  <section class="intro">
    <h1>Bienvenido a tus servicios {user?.name}</h1>
    <p>Consulta el estado actual de tus mantenimientos y solicitudes.</p>
  </section>

  <section class="lista-servicios">
    {#each serviciosPrincipales as servicio}
      <div class="card">
        <div class="icon" style="color: {servicio.color}">{servicio.icono}</div>
        <h2>{servicio.nombre}</h2>
        <p>{servicio.descripcion}</p>
        <span class="estado {servicio.estado.toLowerCase().replace(' ', '-')}">
          {servicio.estado}
        </span>
      </div>
    {/each}
  </section>
</div>

<div class="reportes-page">
  <section class="intro">
    <h1>Reportes del sistema</h1>
    <p>Monitorea el rendimiento de los servicios y el estado general de operaciones.</p>
  </section>

  <!-- Tarjetas resumen -->
  <section class="resumen">
    {#each resumen as r}
      <div class="card" style="border-top: 4px solid {r.color}">
        <h3>{r.titulo}</h3>
        <p>{r.valor}</p>
      </div>
    {/each}
  </section>

  <!-- Gráficas -->
  <section class="graficas">

    <!-- BARRAS -->
    <div class="grafica barras">
      <h2>Servicios por tipo</h2>

      <div class="bar-chart">
        {#each datosBarras as d}
          <div class="bar-item">
            <div 
              class="bar" 
              style="height: {d.cantidad * 12}px" 
              data-tooltip="{d.cantidad}"
            >
              
            </div>
            <span class="label">{d.service_type || d.tipo}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- TORTA -->
    <div class="grafica circular">
      <h2>Estados de servicios</h2>

      <div class="pie">
        <div class="slice completado" style="--value:{torta.completed}"></div>
        <div class="slice pendiente" style="--value:{torta.pending}"></div>
        <div class="slice curso" style="--value:{torta.assigned}"></div>
      </div>

      <ul class="leyenda">
        <li><span class="color completado"></span> Completado ({torta.completed})</li>
        <li><span class="color curso"></span> En curso ({torta.assigned})</li>
        <li><span class="color pendiente"></span> Pendiente ({torta.pending})</li>
      </ul>
    </div>

  </section>
</div>

<style>
  .servicios-page {
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

  .lista-servicios {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    width: 100%;
    max-width: 1000px;
  }

  .card {
    background: #25243a;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 0 20px rgba(0, 212, 179, 0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 25px rgba(0, 212, 179, 0.25);
  }

  .card h2 {
    margin: 1rem 0 0.5rem;
    color: #fff;
    font-size: 1.3rem;
  }

  .card p {
    color: #ccc;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .estado {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .estado.completado {
    background: rgba(0, 212, 179, 0.2);
    color: #00d4b3;
  }

  .estado.en-curso {
    background: rgba(30, 169, 255, 0.2);
    color: #1ea9ff;
  }

  .estado.pendiente {
    background: rgba(255, 255, 255, 0.1);
    color: #d4d4d4;
  }

  @media (max-width: 600px) {
    .intro h1 {
      font-size: 1.8rem;
    }
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

  /* Tarjetas resumen */
  .resumen {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1000px;
    margin-bottom: 3rem;
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

  /* Gráfica de barras */
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
    position: relative;
    cursor: pointer;
  }

  .bar-item span {
    display: block;
    margin-top: 0.5rem;
    color: #d4d4d4;
    font-size: 0.85rem;
  }

  /* Tooltip */
  .bar::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #00d4b3;
    color: #1c1b29;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: bold;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    white-space: nowrap;
    box-shadow: 0 0 10px rgba(0, 212, 179, 0.4);
  }

  .bar::before {
    content: "";
    position: absolute;
    bottom: 92%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #00d4b3 transparent transparent transparent;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .bar:hover::after,
  .bar:hover::before {
    opacity: 1;
  }

  /* Gráfica circular */
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

</style>
