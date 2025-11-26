<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  // local image from conversation (profile/avatar placeholder)
  const avatarUrl = '/mnt/data/1c6e9797-7f2d-43aa-8a2e-085a9412b79e.png';

  let selectedSection = 'personal';
  let user = {
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    phone: '+57 300 000 0000',
    joined: '2024-08-31'
  };

  // sample data for security and payments
  let devices = [
    { id: 1, name: 'Laptop - Chrome', lastSeen: '2025-07-10' },
    { id: 2, name: 'Android - Pixel', lastSeen: '2025-06-22' }
  ];

  let payments = [
    { id: 1, method: 'Visa •••• 4242', active: true },
    { id: 2, method: 'PayPal: user@pay', active: false }
  ];

  // state for inline edits / forms
  let editing = false;
  let editData = { ...user };

  function openEdit() {
    editing = true;
    editData = { ...user };
  }

  function cancelEdit() {
    editing = false;
  }

  function saveEdit() {
    user = { ...editData };
    editing = false;
    // here you would call API to persist changes
  }

  function signOut() {
    // demo sign-out
    localStorage.removeItem('user');
    goto('/login');
  }

  function select(section) {
    selectedSection = section;
  }

  onMount(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { user = JSON.parse(stored); editData = { ...user }; } catch(e) {}
    }
  });
</script>

<style>
  /* Reset small */
  :global(body) { margin: 0; font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }

  .account-page {
    display: flex;
    min-height: 100vh;
    background-color: #0f1020;
  }

  /* SIDEBAR */
  .sidebar {
    width: 260px;
    background: linear-gradient(180deg,#1b1b2f,#24243a);
    padding: 28px 16px;
    box-shadow: 6px 0 30px rgba(0,0,0,0.45);
    flex-shrink: 0;
  }

  .profile {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 8px 12px;
    margin-bottom: 18px;
  }

  .avatar {
    width: 56px; height: 56px; border-radius: 999px; object-fit: cover; border: 2px solid rgba(255,255,255,0.06);
  }

  .profile h4 { margin: 0; font-size: 1rem; color: #bfeee0; }
  .profile p { margin: 0; font-size: 0.85rem; color: #aeb0c9; }

  .nav { margin-top: 8px; }
  .nav button {
    width: 100%; text-align: left; background: transparent; border: none; color: #cfd6df; padding: 12px 14px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 10px;
  }
  .nav button:hover { background: rgba(255,255,255,0.02); }
  .nav button.active { background: linear-gradient(90deg,#0d2218, #0f2e26); color: #00ffc6; box-shadow: inset 0 0 0 1px rgba(0,255,198,0.04); }

  .signout { margin-top: 18px; width: 100%; padding: 10px 14px; background: transparent; border: 1px solid rgba(255,255,255,0.04); color: #ffcfcf; border-radius: 8px; cursor: pointer; }

  /* MAIN PANEL */
  .main-panel { flex: 1; padding: 34px; }
  .top-row { display:flex; justify-content: space-between; align-items:center; gap: 16px; margin-bottom: 18px; }

  .section-card { background: linear-gradient(180deg,#222237,#2a2a40); padding: 22px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.45); margin-bottom: 18px; }
  .section-card h2 { color: #9fffd0; margin: 0 0 8px 0; font-size: 1.15rem; }
  .section-card p { color: #cad0df; margin: 0 0 16px 0; }

  .info-grid { display: grid; grid-template-columns: 1fr 320px; gap: 18px; align-items: start; }

  .field { margin-bottom: 10px; }
  label { display:block; font-size:0.85rem; color:#9ea1b6; margin-bottom:6px; }
  .value { font-size: 0.98rem; color:#e6e6ee; }

  .small-card { background: linear-gradient(180deg,#27273e,#2d2d46); padding:14px; border-radius:10px; }
  .small-card p { margin: 0; }

  .btn { background:#00d1b2; border:none; color:#06101a; padding:10px 12px; border-radius:8px; cursor:pointer; font-weight:600; }
  .btn.ghost { background: transparent; border: 1px solid rgba(255,255,255,0.06); color:#cfeceb; }

  /* responsive */
  @media (max-width: 880px) {
    .sidebar { display:none; }
    .info-grid { grid-template-columns: 1fr; }
    .main-panel { padding: 20px; }
  }

</style>

<div class="account-page">
  <aside class="sidebar" aria-label="Navegación de la cuenta">
    <div class="profile">
      <img class="avatar" src="{avatarUrl}" alt="avatar" />
      <div>
        <h4>{user.name} {user.last_name}</h4>
        <p>{user.email}</p>
      </div>
    </div>

    <nav class="nav" aria-label="Secciones">
      <button on:click={() => select('personal')} class:selected={selectedSection === 'personal'} class:active={selectedSection === 'personal'}>Información personal</button>
      <button on:click={() => select('security')} class:selected={selectedSection === 'security'} class:active={selectedSection === 'security'}>Seguridad</button>
    </nav>

    <button class="signout" on:click={signOut}>Cerrar sesión</button>
  </aside>

  <main class="main-panel">

    <!-- top row with quick info -->
    <div class="top-row">
      <h1 style="margin:0; font-size:1.3rem; color: #dfffe9">Administrar cuenta</h1>
      <div style="display:flex; gap:8px; align-items:center;">
      </div>
    </div>

    {#if selectedSection === 'personal'}
      <section class="section-card">
        <h2>Información personal</h2>
        <div class="info-grid">
          <div>
            {#if !editing}
              <div class="field">
                <label>Nombre Completo</label>
                <div class="value">{user.name} {user.last_name}</div>
              </div>

              <div class="field">
                <label>Correo</label>
                <div class="value">{user.email}</div>
              </div>

              <div class="field">
                <label>Numero de documento</label>
                <div class="value">{user.document_number}</div>
              </div>

              <div style="margin-top:12px;">
                <button class="btn" on:click={openEdit}>Editar</button>
              </div>

            {:else}
              <div class="field">
                <label>Nombre</label>
                <input bind:value={editData.name} />
              </div>

              <div class="field">
                <label>Correo</label>
                <input bind:value={editData.email} />
              </div>

              <div class="field">
                <label>Teléfono</label>
                <input bind:value={editData.phone} />
              </div>

              <div style="margin-top:12px; display:flex; gap:8px;">
                <button class="btn" on:click={saveEdit}>Guardar</button>
                <button class="btn ghost" on:click={cancelEdit}>Cancelar</button>
              </div>
            {/if}
          </div>

          <aside class="small-card">
            <p><strong>Cuenta creada:</strong></p>
            <p>{user.joined}</p>
            <p style="margin-top:12px; font-size:0.9rem; color:#cbd5d9">Mantén tu información actualizada para recuperar el acceso fácilmente.</p>
          </aside>
        </div>
      </section>
    {/if}

    {#if selectedSection === 'security'}
      <section class="section-card">
        <h2>Seguridad</h2>
        <p>Dispositivos recientes y actividad de inicio de sesión.</p>

        <div style="display:grid; gap:12px; margin-top:12px;">
          {#each devices as d}
            <div class="small-card" style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div style="font-weight:600">{d.name}</div>
                <div style="font-size:0.9rem; color:#bfc6d6">Última actividad: {d.lastSeen}</div>
              </div>
              <div>
                <button class="btn ghost" on:click={() => {/* sign out device */}}>Cerrar sesión</button>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if selectedSection === 'payments'}
      <section class="section-card">
        <h2>Métodos de pago</h2>
        <p>Administra tus tarjetas y métodos de pago.</p>

        <div style="display:grid; gap:12px; margin-top:12px;">
          {#each payments as p}
            <div class="small-card" style="display:flex; justify-content:space-between; align-items:center;">
              <div>{p.method}</div>
              <div>
                {#if p.active}
                  <button class="btn ghost">Activo</button>
                {:else}
                  <button class="btn">Activar</button>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if selectedSection === 'privacy'}
      <section class="section-card">
        <h2>Privacidad</h2>
        <p>Controla tus permisos y la actividad que compartes.</p>
      </section>
    {/if}

    {#if selectedSection === 'preferences'}
      <section class="section-card">
        <h2>Preferencias</h2>
        <p>Idioma, región y preferencias de notificación.</p>
      </section>
    {/if}

  </main>
</div>
