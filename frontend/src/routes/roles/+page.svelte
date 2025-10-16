<script>
  import { onMount } from "svelte";
  import { getPermissions, updatePermissions } from "./permissions.js";
  import Swal from "sweetalert2";

  let roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Técnico" },
    { id: 3, name: "Cliente" }
  ];

  let selectedRole = null;
  let permissions = [];

  async function loadPermissions(roleId) {
    selectedRole = roleId;
    permissions = await getPermissions(roleId);
  }

    async function savePermissions() {
		
		await updatePermissions(selectedRole, permissions);
	}
</script>

<!-- CONTENEDOR GENERAL -->
<div class="roles-container">
	<!-- PANEL IZQUIERDO: ROLES -->
	<div class="card roles">
		<div class="header">
			<h2>Roles</h2>
			<button class="add-btn">
				<i class="fa fa-plus"></i> Agregar Rol
			</button>
		</div>

		<table class="roles-table">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Estado</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{#each roles as role}
					<tr>
						<td>{role.name}</td>
						<td><span class="badge active">Activo</span></td>
						<td class="actions">
							<button class="btn-action edit"><i class="fa fa-pen"></i></button>
							<button class="btn-action delete"><i class="fa fa-trash"></i></button>
							<button class="btn-action config" on:click={() => loadPermissions(role.id)}>
								<i class="fa fa-cog"></i>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- PANEL DERECHO: MÓDULOS -->
	<div class="card modules">
		<div class="header">
			<h2>Módulos</h2>
			<button class="save-btn" on:click={savePermissions}>
				<i class="fa fa-save"></i> Guardar Permisos
			</button>
		</div>

		{#if permissions.length > 0}
			<div class="modules-list">
				{#each permissions as p}
					<div class="module-item">
						<span class="module-name">{p.module_name}</span>
						<div class="checkboxes">
							<label><input type="checkbox" bind:checked={p.can_view}/> Ver</label>
							<label><input type="checkbox" bind:checked={p.can_create}/> Crear</label>
							<label><input type="checkbox" bind:checked={p.can_edit}/> Editar</label>
							<label><input type="checkbox" bind:checked={p.can_delete}/> Eliminar</label>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p class="no-data">Selecciona un rol para ver sus permisos</p>
		{/if}
	</div>
</div>

<style>


	.roles-container {
		display: flex;
		justify-content: space-between;
		gap: 2rem;
		padding: 1rem;
		flex-wrap: wrap;
	}

	.card {
		background: #1e293b;
		color: #fff;
		padding: 1.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		flex: 1;
		min-width: 45%;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.3rem;
		font-weight: 600;
		color: #f1f5f9;
	}

	.add-btn,
	.save-btn {
		background: #2563eb;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 500;
		transition: background 0.2s ease;
	}

	.add-btn:hover,
	.save-btn:hover {
		background: #1e40af;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th, td {
		text-align: left;
		padding: 0.6rem;
		border-bottom: 1px solid #334155;
	}

	th {
		text-transform: uppercase;
		font-size: 0.85rem;
		color: #94a3b8;
	}

	.badge.active {
		background: #22c55e;
		color: white;
		padding: 0.2rem 0.6rem;
		border-radius: 0.3rem;
		font-size: 0.8rem;
	}

	.actions {
		display: flex;
		gap: 0.4rem;
	}

	.btn-action {
		border: none;
		background: #334155;
		color: white;
		padding: 0.4rem 0.5rem;
		border-radius: 0.4rem;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.9rem;
	}

	.btn-action:hover {
		background: #475569;
	}

	.btn-action i {
		pointer-events: none;
	}

	.module-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #0f172a;
		padding: 0.8rem 1rem;
		border-radius: 0.6rem;
		margin-bottom: 0.6rem;
		box-shadow: 0 2px 4px rgba(0,0,0,0.3);
	}

	.module-name {
		font-weight: 600;
	}

	.checkboxes {
		display: flex;
		gap: 1rem;
		font-size: 0.9rem;
	}

	.checkboxes label {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.no-data {
		color: #94a3b8;
		font-style: italic;
		text-align: center;
		margin-top: 1rem;
	}

	@media (max-width: 1024px) {
		.roles-container {
			flex-direction: column;
		}
	}
</style>
