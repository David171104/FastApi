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
</style>