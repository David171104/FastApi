<script>
  import { onMount } from "svelte";
  import { getData, postData } from "$lib/api.js";

  let servicios = [];
  let descripcion = "";
  let fecha = "";
  let cliente_id = "";
  let editando = null;
  let estado = "pendiente";

  onMount(async () => {
    servicios = await getData("/servicios");
  });

  async function guardarServicio() {
    if (editando) {
      await fetch(`http://localhost:3000/servicios/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion, fecha, estado }),
      });
    } else {
      await postData("/servicios", { descripcion, fecha, cliente_id });
    }

    servicios = await getData("/servicios");
    descripcion = fecha = cliente_id = "";
    estado = "pendiente";
    editando = null;
  }

  function editarServicio(s) {
    descripcion = s.descripcion;
    fecha = s.fecha;
    estado = s.estado;
    editando = s.id;
  }

  async function eliminarServicio(id) {
    if (confirm("¿Seguro que deseas eliminar este servicio?")) {
      await fetch(`http://localhost:3000/servicios/${id}`, { method: "DELETE" });
      servicios = servicios.filter(s => s.id !== id);
    }
  }
</script>

<h2>Servicios</h2>

<form on:submit|preventDefault={guardarServicio}>
  <input placeholder="Descripción" bind:value={descripcion} required />
  <input type="date" bind:value={fecha} required />
  <input
    type="number"
    placeholder="ID Cliente"
    bind:value={cliente_id}
    required={!editando}
    disabled={!!editando}
  />
  <select bind:value={estado}>
    <option value="pendiente">Pendiente</option>
    <option value="en_proceso">En proceso</option>
    <option value="completado">Completado</option>
  </select>
  <button type="submit">{editando ? "Actualizar" : "Agregar"}</button>
  {#if editando}
    <button type="button" on:click={() => (editando = null)}>Cancelar</button>
  {/if}
</form>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Descripción</th>
      <th>Fecha</th>
      <th>Estado</th>
      <th>Cliente</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {#each servicios as s}
      <tr>
        <td>{s.id}</td>
        <td>{s.descripcion}</td>
        <td>{s.fecha}</td>
        <td>{s.estado}</td>
        <td>{s.cliente}</td>
        <td>
          <button on:click={() => editarServicio(s)}>Editar</button>
          <button on:click={() => eliminarServicio(s.id)}>Eliminar</button>
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

  input, button, select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #4cc9f0;
    background: #1a232e;
    color: #e4e8ee;
  }

  select {
    background: #1a232e;
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
