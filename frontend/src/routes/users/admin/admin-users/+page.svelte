<style>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    background-color: #1e1e2f;
    min-height: 100vh;
  }

  .card {
    width: 100%;
    max-width: 1000px;
    background: #2a2a40;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
    color: #cfcfe6;

    display: flex;
    flex-direction: column;
    overflow: hidden; /* 👈 Evita que algo salga */
  }

  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.6rem;
    color: #00d1b2;
  }

  .user-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    table-layout: auto; /* 👈 Deja que la tabla distribuya bien */
  }

  .user-table th,
  .user-table td {
    padding: 12px;
    text-align: left;
    white-space: normal; /* 👈 Permite varias líneas */
    word-wrap: break-word; /* 👈 Evita romper el layout */
    max-width: 200px; /* 👈 Limita cada columna */
  }

  thead {
    background-color: #00d1b2;
    color: white;
  }

  th, td {
    padding: 14px 18px;
    text-align: left;
  }

  tbody tr {
    background-color: #2f2f4f;
    transition: background 0.3s ease;
  }

  tbody tr:nth-child(even) {
    background-color: #35355a;
  }

  tbody tr:hover {
    background-color: #3f3f6b;
  }

/* Contenedor de botones */
.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* Espacio entre botones */
}

/* Botones */
.edit-btn,
.delete-btn {
  border: none;
  border-radius: 6px;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

/* Colores y efectos */
.edit-btn {
  background-color: #3498db;
}
.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
}
.delete-btn:hover {
  background-color: #c0392b;
}

/* Íconos Font Awesome */
.fa-pen-to-square,
.fa-trash {
  font-size: 14px;
}

  .modal-backdrop {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(15, 15, 30, 0.85);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }

  .modal {
    background: #2a2a40;
    padding: 25px;
    border-radius: 10px;
    width: 400px;
    color: #cfcfe6;
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }

  .modal h3 {
    color: #00d1b2;
    text-align: center;
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-top: 10px;
    color: #b0b0d0;
    font-size: 0.9rem;
  }

  input, select {
    width: 100%;
    padding: 10px 0px;
    border-radius: 6px;
    border: none;
    margin-top: 5px;
    background-color: #35355a;
    color: white;
  }

  .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .save-btn {
    background-color: #00d1b2;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
  }

  .save-btn:hover {
    background-color: #00b89c;
  }

  .cancel-btn {
    background-color: #ff5c5c;
    border: none;
    color: white;
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
  }

  .cancel-btn:hover {
    background-color: #e64b4b;
  }

  .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.create-btn {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s ease;
}

.create-btn:hover {
  background-color: #059669;
}

</style>

<div class="page-container">
  <div class="card">
    <div class="header">
      <h2>Lista de Usuarios</h2>
      <button class="create-btn" on:click={openCreateModal}>
        <i class="fa-solid fa-user-plus"></i> Nuevo Usuario
      </button>
    </div>

    {#if error}
      <p class="error">{error}</p>
    {:else if users.length > 0}
      <table class="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Documento</th>
            <th>Edad</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each users as user}
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.document_number}</td>
              <td>{user.age}</td>
              <td>
                {#if roles.length > 0}
                  {#each roles as role}
                    {#if role.id === user.role_id}
                      {role.name}
                    {/if}
                  {/each}
                {:else}
                  Cargando...
                {/if}
              </td>
              <td class="action-buttons">
                <button class="edit-btn" on:click={() => openEditModal(user)}>
                  <i class="fa-solid fa-pen-to-square"></i> Editar
                </button>
                <button class="delete-btn" on:click={() => handleDeleteUser(user.id)}>
                  <i class="fa-solid fa-trash"></i> Eliminar
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="loading">Cargando usuarios...</p>
    {/if}
  </div>
</div>

{#if showModal}
  <div class="modal-backdrop">
    <div class="modal">
      <h3>{isCreating ? 'Crear Usuario' : 'Editar Usuario'}</h3>

      <label>Nombre <span style=" color: red; font-weight: bold; margin-left: 4px;">*</span></label>
      <input bind:value={selectedUser.name} type="text" required/>

      <label>Apellido</label>
      <input bind:value={selectedUser.last_name} type="text" required />

      <label>Email <span style=" color: red; font-weight: bold; margin-left: 4px;">*</span></label>
      <input bind:value={selectedUser.email} type="email" required />

      <label>Documento <span style=" color: red; font-weight: bold; margin-left: 4px;">*</span> </label>
      <input bind:value={selectedUser.document_number} type="text" required/>

      <label>Edad <span style=" color: red; font-weight: bold; margin-left: 4px;">*</span> </label>
      <input bind:value={selectedUser.age} type="text" required/>

      <label>Rol <span style=" color: red; font-weight: bold; margin-left: 4px;">*</span> </label>
      <select bind:value={selectedUser.role_id} required>
        {#each roles as role}
          <option value={role.id}>{role.name}</option>
        {/each}
      </select>
      
       {#if isCreating}
        <label>Contraseña <span style=" color: red; font-weight: bold; margin-left: 4px;">*</span></label>
        <input bind:value={selectedUser.password} type="password" placeholder="Contraseña" />
      {/if}

      <div class="modal-actions">
        <button class="save-btn" on:click={saveChanges}>
          <i class="fa-solid fa-floppy-disk"></i> Guardar
        </button>
        <button class="cancel-btn" on:click={closeModal}> Cancelar</button>
      </div>
    </div>
  </div>
{/if}

<script>
  import Swal from "sweetalert2";
  import { onMount } from 'svelte';
  import { getUsers, updateUser, deleteUser, createUser } from "./admin.js";
  import { getRoles } from "../../../roles/roles.js";

  let users = [];
  let roles = [];
  let error = '';
  let showModal = false;
  let selectedUser = null;
  let isCreating = false;

  onMount(async () => {
    try {
      users = await getUsers();
      roles = await getRoles();
    } catch (err) {
      error = err.message;
    }
  });

  function openEditModal(user) {
    selectedUser = { ...user };
    isCreating = false;
    showModal = true;
  }

  function openCreateModal() {
    selectedUser = { name: "", last_name: "", email: "", document_number: "", age: "", role_id: roles[0]?.id || 1,  password: ""  };
    isCreating = true;
    showModal = true;
  }

  function closeModal() {
    showModal = false;
    selectedUser = null;
    isCreating = false;
  }

  async function saveChanges() {

    const requiredFields = {
      name: "Nombre",
      last_name: "Apellido",
      email: "Correo",
      document_number: "Documento",
      age: "Edad",
      role_id: "Rol",
    };


    if (isCreating) {
      requiredFields.password = "Contraseña";
    }


    const emptyFields = Object.entries(requiredFields)
      .filter(([key]) => !selectedUser[key] || selectedUser[key].toString().trim() === "")
      .map(([_, label]) => label);

    if (emptyFields.length > 0) {
      Swal.fire({
        title: "Campos obligatorios incompletos",
        html: `
          Debes completar los siguientes campos:<br><br>
          <b>${emptyFields.join(", ")}</b>
        `,
        icon: "warning",
      });
      return;
    }
    
    const confirm = await Swal.fire({
      title: isCreating ? "¿Crear usuario?" : "¿Guardar cambios?",
      text: isCreating ? "Se creará un nuevo usuario." : "¿Deseas actualizar este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      if (isCreating) {
        await createUser(selectedUser);
      } else {
        await updateUser(selectedUser.id, selectedUser);
      }
      closeModal();
      users = await getUsers();
    } catch (err) {
      console.error("Error:", err);
    }
  }

  async function handleDeleteUser(userId) {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será marcado como eliminado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      await deleteUser(userId);
      users = await getUsers();
    }
  }
</script>
