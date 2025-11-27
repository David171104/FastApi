<script>
	import { onMount } from "svelte";
    import Swal from 'sweetalert2';
	import { getStats, getDailyServices, getMonthlyStats } from "./technician.js";
	import { getStatusLabel, formatDate, formatTime } from '$lib/helpers/constants.js';

	let stats = [];
	let services = [];
	let months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
	let dataGraphics = [];

	onMount(async () => {

		const user = JSON.parse(localStorage.getItem("user"));
		const data = await getStats(user.id);
		services = await getDailyServices(user.id);

		stats = [
			{ label: 'Servicios completados', value: data.completed, icon: 'fa-solid fa-wrench', color: '#06b6d4' },
			{ label: 'Pendientes', value: data.pending, icon: 'fa-solid fa-clock', color: '#facc15' },
			{ label: 'Clientes atendidos', value: data.clients, icon: 'fa-solid fa-users', color: '#3b82f6' },
			{ label: 'Calificación promedio', value: data.avg_rating, icon: 'fa-solid fa-star', color: '#fbbf24' },
		];

		dataGraphics = await getMonthlyStats(user.id);
		console.log('dataGraphics', dataGraphics);
	});

	
</script>



<div class="dashboard">
	<header>
		<div>
			<h1 class="text-3xl font-bold" style="color: #06b6d4;">Panel del Técnico</h1>
			<p class="text-gray-400 text-sm">Resumen de actividades y rendimiento general</p>
		</div>
		
	</header>

	<section class="stats">
		{#each stats as stat}
			<div class="card">
				<div class="flex justify-between items-center">
					<div>
						<p class="text-gray-400 text-sm">{stat.label}</p>
						<p class="text-3xl font-bold mt-2" style="color:{stat.color}">{stat.value}</p>
					</div>
					<i class={stat.icon} style="color:{stat.color}"></i>
				</div>
			</div>
		{/each}
	</section>

	<section class="graph">
		<h2 class="text-xl font-semibold mb-4" style="color: #06b6d4;">
			<i class="fa-solid fa-chart-column"></i> Rendimiento Mensual
		</h2>

		<div class="graph-bars">
			{#each dataGraphics as d}
				<div class="bar" style="height: {Math.max(10, d * 12)}px;">
					<div class="tooltip">{d}

					</div>
				</div>
			{/each}
		</div>

		<div class="months">
			{#each months as m}
				<span>{m}</span>
			{/each}
		</div>
	</section>

	<section class="bg-[#151625] rounded-2xl p-6">
		<h2 class="text-xl font-semibold mb-4" style="color:#06b6d4;">
			<i class="fa-solid fa-list-check"></i> Servicios del Día
		</h2>

		<div class="overflow-x-auto">
			<table>
				<thead>
					<tr>
						<th>Cliente</th>
						<th>Estado</th>
						<th>Hora</th>
					</tr>
				</thead>

				<tbody>
					{#each services as s}
						<tr>
							<td>{s.client_name} {s.client_last_name}</td>
							<td>
								{@html getStatusLabel(s.current_status)}
							</td>
							<td>{s.request_time}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</div>


<style>
	.dashboard {
		min-height: 100vh;
		background-color: #0d0e1a;
		color: #e5e7eb;
		font-family: 'Inter', sans-serif;
		padding: 2rem;
		padding-bottom: 100px;
	}

	header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	@media (min-width: 640px) {
		header {
			flex-direction: row;
			align-items: center;
		}
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.card {
		background: #151625;
		border-radius: 1rem;
		padding: 1.5rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.card:hover {
		transform: translateY(-3px);
		box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
	}

	.card i {
		font-size: 1.8rem;
	}

	.graph {
		background: #151625;
		padding: 1.5rem;
		border-radius: 1rem;
		margin-bottom: 2rem;
	}

	.graph-bars {
		display: flex;
		align-items: flex-end;
		height: 180px;
		gap: 0.5rem;
	}

	.bar {
		position: relative;

		flex: 1;
		background: linear-gradient(180deg, #06b6d4, #0891b2);
		border-radius: 0.3rem;
		transition: height 0.4s ease, opacity 0.4s;
		opacity: 0.85;
	}

	.bar:hover {
		opacity: 1;
	}

	.months {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		color: #9ca3af;
		font-size: 0.8rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
	}

	th {
		color: #06b6d4;
		text-align: left;
		padding: 0.8rem 0;
		border-bottom: 1px solid #1f2937;
	}

	td {
		padding: 0.8rem 0;
		border-bottom: 1px solid #1f2937;
	}

	tr:hover {
		background: #1b1d2e;
	}

	.estado {
		padding: 0.3rem 0.8rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.estado.completado {
		background: rgba(34, 197, 94, 0.2);
		color: #22c55e;
	}

	.estado.pendiente {
		background: rgba(234, 179, 8, 0.2);
		color: #facc15;
	}

	.estado.progreso {
		background: rgba(59, 130, 246, 0.2);
		color: #3b82f6;
	}

	.tooltip {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: #06b6d4;
    padding: 4px 8px;
    font-size: 0.75rem;
    color: #000;
    font-weight: 600;
    border-radius: 5px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    white-space: nowrap;
}

.bar:hover .tooltip {
    opacity: 1;
}
</style>