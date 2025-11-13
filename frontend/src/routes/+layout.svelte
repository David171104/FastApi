<script>
  import { goto } from "$app/navigation";
</script>

<header>
  <h1>Sistema de Mantenimiento de Aires Acondicionados</h1>

  <nav>
    <button on:click={() => goto("/")}>Inicio</button>
    <button on:click={() => goto("/usuarios")}>Usuarios</button>
    <button on:click={() => goto("/servicios")}>Servicios</button>
    <button on:click={() => goto("/asignaciones")}>Asignaciones</button>
  </nav>
</header>

<main>
  <slot />
</main>

<footer>
  <p>© 2025 - Sistema de Mantenimiento</p>
</footer>

<style>
  :global(body) {
    background-color: #0e141b;
    color: #e4e8ee;
    font-family: "Segoe UI", Roboto, sans-serif;
    margin: 0;
  }

  header {
    background: #1a232e;
    color: #4cc9f0;
    padding: 1rem;
    text-align: center;
    border-bottom: 2px solid #2c394b;
  }

  nav {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }

  button {
    background: transparent;
    color: #4cc9f0;
    border: 1px solid #4cc9f0;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
  }

  button:hover {
    background: #4895ef;
    color: #fff;
  }

  main {
    padding: 20px;
    min-height: 80vh;
  }

  footer {
    background: #1a232e;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    color: #4cc9f0;
    border-top: 1px solid #2c394b;
  }
</style>
