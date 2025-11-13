<script>
  import { goto } from "$app/navigation";
</script>

<main>
  <div class="container">
    <h1>Sistema de Mantenimiento de Aires Acondicionados</h1>
    <p>Selecciona una sección para continuar</p>

    <nav>
      <button on:click={() => goto("/usuarios")}>Usuarios</button>
      <button on:click={() => goto("/servicios")}>Servicios</button>
      <button on:click={() => goto("/asignaciones")}>Asignaciones</button>
    </nav>
  </div>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }

  .container {
    text-align: center;
    background: #1a232e;
    padding: 3rem;
    border-radius: 12px;
    box-shadow: 0 0 10px rgba(72, 149, 239, 0.2);
    max-width: 600px;
  }

  h1 {
    color: #4cc9f0;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #b9c2cc;
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  button {
    background: transparent;
    color: #4cc9f0;
    border: 1px solid #4cc9f0;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: 0.2s ease;
    letter-spacing: 0.5px;
  }

  button:hover {
    background: #4895ef;
    color: #fff;
  }
</style>
