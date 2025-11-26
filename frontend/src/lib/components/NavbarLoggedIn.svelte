<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isAuthenticated } from '$lib/stores/auth.js';
  import { hasPermissionView, clearPermissionsCache } from '$lib/helpers/permissions.js';

  let user = null;
  let servicesLink = null;
  let reportsLink = null;
  let dropdownOpen = false;

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

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function closeDropdown() {
    dropdownOpen = false;
  }

  function editProfile() {
    closeDropdown();
    goto('/users');
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    clearPermissionsCache();
    isAuthenticated.set(false);
    goto("/");
  }
</script>

<svelte:window on:click={(e) => {
  if (!e.target.closest('.user-menu')) {
    closeDropdown();
  }
}} />

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
    <div class="user-menu">
      <button class="user-button" on:click={toggleDropdown}>
        <span class="user-icon">   <i class="fa-solid fa-user"></i></span>
        <span class="user-name">{user?.name  || 'Usuario'} {user?.last_name  || ''}</span>
        <span class="arrow" class:open={dropdownOpen}>▼</span>
      </button>
      
      {#if dropdownOpen}
        <div class="dropdown">
          <button class="dropdown-item" on:click={editProfile}>
            <i class="fa-solid fa-pen-to-square"></i>
            Editar Información
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item logout" on:click={logout}>
             <i class="fa-solid fa-right-from-bracket"></i>
            Cerrar Sesión
          </button>
        </div>
      {/if}
    </div>
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
    transition: color 0.3s ease;
  }

  a:hover {
    color: #00d9ff;
  }

  .right {
    position: relative;
  }

  .user-menu {
    position: relative;
  }

  .user-button {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 8px 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .user-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: #00d9ff;
  }

  .user-icon {
    font-size: 18px;
  }

  .user-name {
    font-size: 14px;
  }

  .arrow {
    font-size: 10px;
    transition: transform 0.3s ease;
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: #2a2a3e;
    border: 1px solid rgba(0, 217, 255, 0.3);
    border-radius: 8px;
    min-width: 220px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    overflow: hidden;
    animation: slideDown 0.2s ease;
    z-index: 1000;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 16px;
    background-color: transparent;
    color: white;
    border: none;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    font-weight: 500;
  }

  .dropdown-item:hover {
    background-color: rgba(0, 217, 255, 0.1);
    color: #00d9ff;
  }

  .dropdown-item.logout {
    color: #ff6b6b;
  }

  .dropdown-item.logout:hover {
    background-color: rgba(231, 74, 59, 0.1);
    color: #e74a3b;
  }

  .item-icon {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }

  .dropdown-divider {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 4px 0;
  }
</style>