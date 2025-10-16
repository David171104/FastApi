<script>
  import { onMount } from "svelte";
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer
  } from "recharts";

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

  const datosPie = [
    { estado: "Completado", valor: 19, color: "#00d4b3" },
    { estado: "En curso", valor: 3, color: "#1ea9ff" },
    { estado: "Pendiente", valor: 6, color: "#d4d4d4" }
  ];

  const reportes = [
    {
      fecha: "10/10/2025",
      servicio: "Mantenimiento preventivo",
      tecnico: "Carlos Ruiz",
      estado: "Completado",
      observacion: "Sistema en óptimas condiciones"
    },
    {
      fecha: "08/10/2025",
      servicio: "Recarga de gas",
      tecnico: "Luis Pérez",
      estado: "Pendiente",
      observacion: "Requiere visita adicional"
    },
    {
      fecha: "05/10/2025",
      servicio: "Instalación de split",
      tecnico: "Ana Torres",
      estado: "Completado",
      observacion: "Instalación certificada"
    }
  ];
</script>

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
    <div class="grafica">
      <h2>Servicios por tipo</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={datosBarras}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3b" />
          <XAxis dataKey="tipo" stroke="#d4d4d4" />
          <YAxis stroke="#d4d4d4" />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#00d4b3" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div class="grafica">
      <h2>Estados de servicios</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={datosPie}
            dataKey="valor"
            nameKey="estado"
            outerRadius={80}
            label
          >
            {#each datosPie as d}
              <Cell fill={d.color} />
            {/each}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </section>

  <!-- Tabla de reportes -->
  <section class="tabla">
    <h2>Reportes recientes</h2>
    <table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Servicio</th>
          <th>Técnico</th>
          <th>Estado</th>
          <th>Observación</th>
        </tr>
      </thead>
      <tbody>
        {#each reportes as r}
          <tr>
            <td>{r.fecha}</td>
            <td>{r.servicio}</td>
            <td>{r.tecnico}</td>
            <td class="estado {r.estado.toLowerCase()}">{r.estado}</td>
            <td>{r.observacion}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </section>
</div>

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
    margin-bottom: 1rem;
  }

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

  .estado.en {
    color: #1ea9ff;
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
