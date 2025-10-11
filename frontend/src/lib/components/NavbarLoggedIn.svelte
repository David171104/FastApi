<script>
  import { goto } from '$app/navigation';
  import { isAuthenticated } from '$lib/stores/auth.js';
  
  function logout() {
    // 🔹 Eliminar los datos del usuario
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // 🔹 Actualizar el estado global
    isAuthenticated.set(false);

    // 🔹 Redirigir al inicio
    goto("/");
  }
</script>

<nav class="navbar">
  <div class="left">
    <a href="/users/admin">Inicio</a>
    <a href="/users-services">Servicios</a>
    <a href="/reports">Reportes</a>
  </div>

  <div class="right">
    <button on:click={logout}>Cerrar Sesión</button>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1e1e2f;
    color: white;
  }

  a {
    color: white;
    margin-right: 15px;
    text-decoration: none;
    font-weight: bold;
  }

  .right button {
    background-color: #e74a3b;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 15px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .right button:hover {
    background-color: #c0392b;
  }
</style>
