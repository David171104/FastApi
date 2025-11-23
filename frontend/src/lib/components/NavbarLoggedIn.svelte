<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isAuthenticated } from '$lib/stores/auth.js';
  import { hasPermissionView, clearPermissionsCache } from '$lib/helpers/permissions.js';

  let user = null;
  let servicesLink = null;
  let reportsLink = null;

  onMount(async () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      user = JSON.parse(userData);
      isAuthenticated.set(true);

      const services = await hasPermissionView(user, 'Servicios');
      servicesLink = services.permiso ? services.route : null;

      const reports = await hasPermissionView(user, 'Reportes');
      reportsLink = reports.permiso ? reports.route : null;

    } else {
      isAuthenticated.set(false);
    }
  });

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearPermissionsCache();
    isAuthenticated.set(false);
    goto("/");
  }
</script>

<nav class="navbar">
  <div class="left">
    {#if user}
      {#if user.role_id === 1}
        <a href="/users/admin">Inicio</a>
      {/if}
      {#if  user.role_id === 2}
        <a href="/users/technician">Inicio</a>
      {/if}
      {#if user.role_id === 3}
        <a href="/users/client">Inicio</a>
      {/if}

      
      <!-- {#if user.role_id === 1}
        <a href="/users/admin/admin-dashboard">Dashboard</a>
      {/if} -->

      {#if user.role_id === 1}
        <a href="/users/admin/admin-users">Usuarios</a>
      {/if}

      {#if servicesLink}
        <a href={servicesLink}>Servicios</a>
      {/if}

      {#if reportsLink}
        <a href={reportsLink}>Reportes</a>
      {/if}

      {#if user.role_id === 1}
        <a href="/roles">Roles</a>
      {/if}
    {/if}
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
