<script>
  import { onMount } from "svelte";
  import { getData } from "$lib/api.js";

  let usuarios = [];
  let filtro = "";
  let usuariosFiltrados = [];

 
  onMount(async () => {
    usuarios = await getData("/usuarios");
    usuariosFiltrados = usuarios;
  });

  // Filtrar por nombre, email o id
  function aplicarFiltro() {
    const texto = filtro.toLowerCase().trim();
    if (texto === "") {
      usuariosFiltrados = usuarios; 
      return;
    }

    usuariosFiltrados = usuarios.filter(
      (u) =>
        u.nombre.toLowerCase().includes(texto) ||
        u.email.toLowerCase().includes(texto) ||
        String(u.id).includes(texto)
    );
  }
</script>

<h2>Usuarios</h2>

<div class="filtro">
  <input
    type="text"
    placeholder="Buscar por nombre, email o ID..."
    bind:value={filtro}
    on:input={aplicarFiltro}
  />
  <button on:click={aplicarFiltro}>Buscar</button>
  {#if filtro}
    <button class="reset" on:click={() => { filtro = ''; usuariosFiltrados = usuarios; }}>
      Mostrar todos
    </button>
  {/if}
</div>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nombre</th>
      <th>Email</th>
      <th>Rol</th>
    </tr>
  </thead>
  <tbody>
    {#each usuariosFiltrados as u}
      <tr>
        <td>{u.id}</td>
        <td>{u.nombre}</td>
        <td>{u.email}</td>
        <td>{u.rol}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  h2 {
    text-align: center;
    color: #4cc9f0;
    margin-top: 1rem;
  }

  .filtro {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 1.5rem 0;
  }

  input {
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #4cc9f0;
    background: #1a232e;
    color: #e4e8ee;
  }

  input::placeholder {
    color: #8fa1b3;
  }

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: #4895ef;
    color: white;
    font-weight: bold;
    transition: 0.2s;
  }

  button:hover {
    background: #4cc9f0;
  }

  .reset {
    background: #2c394b;
  }

  .reset:hover {
    background: #3b4d61;
  }

  table {
    width: 80%;
    margin: 2rem auto;
    border-collapse: collapse;
    background: #1a232e;
    border-radius: 10px;
    overflow: hidden;
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
</style>
