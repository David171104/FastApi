<script>
  import { updateProfileRequest } from "./user.js";
  import { verifyPasswordRequest, changePasswordRequest } from "./user.js";
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import axios from "axios";
  import Swal from "sweetalert2";

    let oldPassword = "";
    let newPassword = "";
    let confirmPassword = "";
    let verified = false;


    async function saveEdit() {
      try {
        const res = await updateProfileRequest(user.id, {
          name: editData.name,
          last_name: editData.last_name,
          email: editData.email,
          document_number: editData.document_number
        });

        Swal.fire({
          icon: "success",
          title: "Datos actualizados",
          text: res.data.message,
          timer: 1500,
          showConfirmButton: false,
        });

        user = { ...editData };
        localStorage.setItem("user", JSON.stringify(user));
        editing = false;

      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.detail || "No se pudo actualizar",
        });
      }
    }

    async function verifyPassword(id) {
      console.log("id", id);
      console.log("old_password", oldPassword);
      try {
        await verifyPasswordRequest(id, oldPassword);
        verified = true;
      Swal.fire({
      icon: "success",
      title: "Contraseña verificada",
      timer: 1500,
      showConfirmButton: false,
    });
      } catch (err) {
      Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.detail || "Contraseña incorrecta",
    });
      }
    }

    async function changePassword(id) {
      if (newPassword !== confirmPassword) {
        return Swal.fire({
          icon: "warning",
          title: "Las contraseñas no coinciden",
        });
      }

      try {
        const res = await changePasswordRequest(id, newPassword);
            Swal.fire({
      icon: "success",
      title: "Contraseña cambiada",
      text: res.data.message,
      timer: 1500,
      showConfirmButton: false,
    });
        
        newPassword = "";
        confirmPassword = "";
      } catch (err) {    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.detail || "Error al cambiar contraseña",
    });
      }
    }

  // local image from conversation (profile/avatar placeholder)
  const avatarUrl = '/mnt/data/1c6e9797-7f2d-43aa-8a2e-085a9412b79e.png';

  let selectedSection = 'personal';
  let user = {
    name: 'Usuario Ejemplo',
    email: 'usuario@ejemplo.com',
    phone: '+57 300 000 0000',
    joined: '2024-08-31'
  };


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
    .input {
      width: 100%;
      max-width: 90%;
      padding: 12px 14px;
      margin: 8px 0;
      font-size: 15px;
      border-radius: 10px;

      /* Fondo glass */
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(6px);

      /* Borde suave */
      border: 1px solid rgba(255, 255, 255, 0.12);

      color: #e8fef8;
      transition: 0.25s ease;
    }

    /* Placeholder */
    .input::placeholder {
      color: #9ca3af;
    }

  /* Focus neón */
    .input:focus {
      outline: none;
      border-color: #00ffc6;
      box-shadow: 0 0 10px #00ffc666;
      background: rgba(255, 255, 255, 0.10);
    }

  button, .btn {
    padding: 12px 16px;
    border-radius: 10px;
    background: rgba(0, 255, 198, 0.10); /* mismo volumen glass */
    border: 1px solid rgba(0, 255, 198, 0.25);
    color: #adfff0;
    cursor: pointer;
    font-weight: 600;
    backdrop-filter: blur(6px);
    transition: 0.25s ease;
    
  }

  /* Hover tipo neón */
  button:hover, .btn:hover {
    background: rgba(0, 255, 198, 0.18);
    border-color: #00ffc6;
    box-shadow: 0 0 12px #00ffc666;
  }

  /* Focus igual que los inputs */
  button:focus, .btn:focus {
    outline: none;
    border-color: #00ffc6;
    box-shadow: 0 0 14px #00ffc688;
  }

  /* Ghost style coherente */
  .btn.ghost {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #cfeceb;
  }

  .btn.ghost:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: #00ffc6;
    color: #00ffd3;
    box-shadow: 0 0 12px #00ffc666;
  }
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

  .profile h4 { margin: 0; font-size: 1rem; color: #bfeee0; }
  .profile p { margin: 0; font-size: 0.85rem; color: #aeb0c9; }

  .nav { margin-top: 8px; }
  .nav button {
    width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: #cfd6df;
  padding: 12px 14px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px; /* 👈 separación entre botones */
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
          <!-- Vista normal -->
          <div class="field">
            <label>Nombre Completo</label>
            <div class="value">{user.name} {user.last_name}</div>
          </div>

          <div class="field">
            <label>Correo</label>
            <div class="value">{user.email}</div>
          </div>

          <div class="field">
            <label>Número de documento</label>
            <div class="value">{user.document_number}</div>
          </div>

          <div style="margin-top:12px;">
            <button class="btn" on:click={openEdit}>Editar</button>
          </div>

        {:else}
          <!-- Vista editable -->
        <div class="field">
          <label>Nombre</label>
          <input class="input" bind:value={editData.name} />
        </div>

        <div class="field">
          <label>Apellidos</label>
          <input class="input" bind:value={editData.last_name} />
        </div>

        <div class="field">
          <label>Correo</label>
          <input class="input" bind:value={editData.email} />
        </div>

        <div class="field">
          <label>Número de documento</label>
          <input class="input" bind:value={editData.document_number} />
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

        <p style="margin-top:12px; font-size:0.9rem; color:#cbd5d9">
          Mantén tu información actualizada para recuperar el acceso fácilmente.
        </p>
      </aside>
    </div>
  </section>
{/if}


  {#if selectedSection === 'security'}
  <section class="section-card">
  <div class="card">
    <h2>Cambiar contraseña</h2>

    <!-- Paso 1: Verificar contraseña -->
    <div>
      <label>Contraseña actual</label>
      <input class="input" type="password" bind:value={oldPassword} />
      <button on:click={verifyPassword(user.id)}>Verificar</button>
    </div>

    {#if verified}
      <hr />

      <label>Nueva contraseña</label>
      <input class="input" type="password" bind:value={newPassword} />

      <label>Confirmar nueva contraseña</label>
      <input class="input" type="password" bind:value={confirmPassword} />

      <button on:click={changePassword(user.id)}>Cambiar contraseña</button>
    {/if}
  </div>
  </section>
  {/if}
  </main>
</div>
