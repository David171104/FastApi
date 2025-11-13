<script>
  import { onMount } from "svelte";
  import { getData, postData } from "$lib/api.js";

  let asignaciones = [];
  let servicio_id = "";
  let tecnico_id = "";
  let fecha_asignacion = "";
  let editando = null;

  onMount(async () => {
    asignaciones = await getData("/asignaciones");
  });

  async function guardarAsignacion() {
    if (editando) {
      await fetch(`http://localhost:3000/asignaciones/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicio_id, tecnico_id, fecha_asignacion }),
      });
    } else {
      await postData("/asignaciones", { servicio_id, tecnico_id, fecha_asignacion });
    }

    asignaciones = await getData("/asignaciones");
    servicio_id = tecnico_id = fecha_asignacion = "";
    editando = null;
  }

  function editarAsignacion(a) {
    servicio_id = a.servicio_id || "";
    tecnico_id = a.tecnico_id || "";
    fecha_asignacion = a.fecha_asignacion || "";
    editando = a.id;
  }

  async function eliminarAsignacion(id) {
    if (confirm("¿Seguro que deseas eliminar esta asignación?")) {
      await fetch(`http://localhost:3000/asignaciones/${id}`, { method: "DELETE" });
      asignaciones = asignaciones.filter(a => a.id !== id);
    }
  }
</script>

<h2>Asignaciones</h2>

<form on:submit|preventDefault={guardarAsignacion}>
  <input type="number" placeholder="ID Servicio" bind:value={servicio_id} required />
  <input type="number" placeholder="ID Técnico" bind:value={tecnico_id} required />
  <input type="date" bind:value={fecha_asignacion} required />
  <button type="submit">{editando ? "Actualizar" : "Asignar"}</button>
  {#if editando}
    <button type="button" on:click={() => (editando = null)}>Cancelar</button>
  {/if}
</form>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Servicio</th>
      <th>Técnico</th>
      <th>Cliente</th>
      <th>Fecha</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each asignaciones as a}
      <tr>
        <td>{a.id}</td>
        <td>{a.servicio}</td>
        <td>{a.tecnico}</td>
        <td>{a.cliente}</td>
        <td>{a.fecha_asignacion}</td>
        <td>
          <button on:click={() => editarAsignacion(a)}>Editar</button>
          <button on:click={() => eliminarAsignacion(a.id)}>Eliminar</button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  h2 {
    text-align: center;
    color: #4cc9f0;
  }

  form {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 1rem;
    flex-wrap: wrap;
  }

  input, button {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #4cc9f0;
    background: #1a232e;
    color: #e4e8ee;
  }

  button {
    background: #4895ef;
    color: white;
    cursor: pointer;
    transition: 0.2s;
  }

  button:hover {
    background: #4cc9f0;
  }

  table {
    width: 90%;
    margin: 2rem auto;
    border-collapse: collapse;
    background: #1a232e;
    border-radius: 8px;
  }

  th, td {
    border: 1px solid #2c394b;
    padding: 10px;
    text-align: center;
  }

  th {
    background: #4895ef;
    color: white;
  }

  tr:nth-child(even) {
    background: #0e141b;
  }

  tr:hover {
    background: #1f2b3a;
  }

  td button {
    margin: 0 3px;
    padding: 5px 10px;
    font-size: 0.9rem;
  }
</style>
