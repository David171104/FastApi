<script>
  // Datos de ejemplo (simulación visual)
  const servicios = [
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

<div class="servicios-page">
  <section class="intro">
    <h1>Bienvenido a tus servicios</h1>
    <p>Consulta el estado actual de tus mantenimientos y solicitudes.</p>
  </section>

  <section class="lista-servicios">
    {#each servicios as servicio}
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

  <!-- Simulación de gráficas -->
  <section class="graficas">
    <div class="grafica barras">
      <h2>Servicios por tipo</h2>
      <div class="bar-chart">
        {#each datosBarras as d}
          <div class="bar-item">
            <div class="bar" style="height: {d.cantidad * 10}px"></div>
            <span>{d.tipo}</span>
          </div>
        {/each}
      </div>
    </div>

    <div class="grafica circular">
      <h2>Estados de servicios</h2>
      <div class="pie">
        <div class="slice completado"></div>
        <div class="slice pendiente"></div>
        <div class="slice curso"></div>
      </div>
      <ul class="leyenda">
        <li><span class="color completado"></span> Completado</li>
        <li><span class="color curso"></span> En curso</li>
        <li><span class="color pendiente"></span> Pendiente</li>
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