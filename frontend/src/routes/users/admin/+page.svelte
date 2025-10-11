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

  .edit-btn {
    background-color: #00d1b2;
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.3s ease;
  }

  .edit-btn:hover {
    background-color: #00b89c;
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
    padding: 10px;
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
</style>

<div class="page-container">
  <div class="card">
    <h2> Lista de Usuarios</h2>

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
                {#if user.role_id === 1}Administrador
                {:else if user.role_id === 2}Técnico
                {:else if user.role_id === 3}Cliente
                {:else}Desconocido{/if}
              </td>
              <td>
                <button class="edit-btn" on:click={() => openEditModal(user)}> Editar</button>
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
      <h3>Editar Usuario</h3>

      <label>Nombre</label>
      <input bind:value={selectedUser.name} type="text" />

      <label>Apellido</label>
      <input bind:value={selectedUser.last_name} type="text" />

      <label>Email</label>
      <input bind:value={selectedUser.email} type="email" />

      <label>Edad</label>
      <input bind:value={selectedUser.age} type="text" />

      <label>Rol</label>
        <select bind:value={selectedUser.role_id}>
            <option value={1}>Administrador</option>
            <option value={2}>Técnico</option>
            <option value={3}>Cliente</option>
        </select>


      <div class="modal-actions">
        <button class="save-btn" on:click={saveChanges}> Guardar</button>
        <button class="cancel-btn" on:click={closeModal}>❌ Cancelar</button>
      </div>
    </div>
  </div>
{/if}



<script>
    import Swal from "sweetalert2";
    import { onMount } from 'svelte';
    import { getUsers, updateUser } from "./admin.js";

    let users = [];
    let error = '';
    let showModal = false;
    let selectedUser = null;

    onMount(async () => {
        try {
        users = await getUsers();
        console.log("Usuarios:", users);
        } catch (err) {
        error = err.message;
        }
    });


    function openEditModal(user) {
        selectedUser = { ...user };
        showModal = true;
    }


    function closeModal() {
        showModal = false;
        selectedUser = null;
    }


    
  async function saveChanges() {
    const confirm = await Swal.fire({
      title: "¿Guardar cambios?",
      text: "¿Deseas actualizar los datos de este usuario?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateUser(selectedUser.id, selectedUser);
      closeModal();
      users = await getUsers(); 
    } catch (err) {
      console.error("Error:", err);
    }
  }
</script>