<script>
  // No hay lógica por ahora, es solo una página de demostración.
</script>

<div class="container">
  <header class="appbar">
    <div class="brand">
      <div class="logo">SD</div>
      <div>
        <div class="title">Formulario de Búsqueda — Demo</div>
        <div class="subtitle">Página estática de prueba (no funcional)</div>
      </div>
    </div>
  </header>

  <div class="card">
    <h3>Buscar registros</h3>
    <p class="desc">Completa los campos para realizar una búsqueda. Esta página no ejecuta ninguna acción.</p>

    <form class="search-form">
      <div class="row">
        <div class="field">
          <label>Nombre o código</label>
          <input type="text" placeholder="Ej: Juan Pérez, REQ-001" disabled />
        </div>

        <div class="field">
          <label>Estado</label>
          <select disabled>
            <option>Todos</option>
            <option>Activo</option>
            <option>En Proceso</option>
            <option>Completado</option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="field">
          <label>Rango de fechas</label>
          <div class="dates">
            <input type="date" disabled />
            <input type="date" disabled />
          </div>
        </div>

       
      </div>

      <div class="buttons">
        <!-- <button class="btn ghost" disabled>Reset</button> -->
        <button class="btn primary" disabled>Buscar</button>
        <!-- <button class="btn danger" disabled>Exportar</button> -->
      </div>
    </form>
  </div>

  <div class="card table-wrap">
    <h3>Resultados (Ejemplo)</h3>
    <table>
      <thead>
        <tr>
          <th>#</th>
         
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Estado</th>
          <th>Responsable</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
         
          <td>Clínica Santa María</td>
          <td>2025-10-01</td>
          <td>Correctivo</td>
          <td><span class="badge active">Activo</span></td>
          <td>María López</td>
        </tr>
        <tr>
          <td>2</td>
          
          <td>Empresa Alfa</td>
          <td>2025-09-29</td>
          <td>Correctivo</td>
          <td><span class="badge pending">Pendiente</span></td>
          <td>Juan Torres</td>
        </tr>
        <tr>
          <td>3</td>
          
          <td>Industrias Beta</td>
          <td>2025-09-25</td>
          <td>Preventivo</td>
          <td><span class="badge completed">Completado</span></td>
          <td>Laura Méndez</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  .container {
    max-width: 1100px;
    margin: 30px auto;
    padding: 20px;
    color: #f0f4f8;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .appbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    background: linear-gradient(135deg, #2563eb, #7c3aed);
    width: 48px;
    height: 48px;
    border-radius: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .subtitle {
    font-size: 13px;
    color: #a0aec0;
  }

  .card {
    background: #141b2d;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  h3 {
    margin-top: 0;
    color: #93c5fd;
  }

  .desc {
    color: #a0aec0;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .search-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .row {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  .field {
    flex: 1;
  }

  label {
    display: block;
    font-size: 14px;
    color: #cbd5e1;
    margin-bottom: 6px;
  }

  input[type='text'],
  input[type='date'],
  select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #334155;
    background: #1e293b;
    color: #e2e8f0;
  }

  .dates {
    display: flex;
    gap: 10px;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  button {
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: 600;
    cursor: not-allowed;
  }

  .btn.primary {
    background-color: #3b82f6;
    color: white;
  }

  .btn.danger {
    background-color: #ef4444;
    color: white;
  }

  .btn.ghost {
    background-color: transparent;
    color: #94a3b8;
    border: 1px solid #475569;
  }

  .table-wrap {
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #1e293b;
    border-radius: 10px;
  }

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #334155;
  }

  th {
    color: #94a3b8;
    text-transform: uppercase;
    font-size: 12px;
  }

  .badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 12px;
    color: #111827;
  }

  .badge.active {
    background-color: #34d399;
  }

  .badge.pending {
    background-color: #facc15;
  }

  .badge.completed {
    background-color: #60a5fa;
  }
</style>
