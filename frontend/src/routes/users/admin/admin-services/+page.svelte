<div class="assign-container">
  <div class="assign-header">
    <h6>Asignar Servicios</h6>
    <p>Selecciona un técnico y asigna los servicios pendientes de mantenimiento.</p>
  </div>

  <div class="assign-card">
    <div class="form-group">
      <label for="technician">Técnico:</label>
      <select id="technician">
        <option value="">Seleccione un técnico...</option>
        <option value="1">Carlos Pérez</option>
        <option value="2">Ana Rodríguez</option>
        <option value="3">Luis Gómez</option>
      </select>
    </div>

    <div class="form-group">
      <label for="service">Servicio:</label>
      <select id="service">
        <option value="">Seleccione un servicio...</option>
        <option value="mantenimiento">Mantenimiento Preventivo</option>
        <option value="reparacion">Reparación Correctiva</option>
        <option value="instalacion">Instalación de nuevo equipo</option>
      </select>
    </div>

    <button class="assign-btn">
      <i class="fa fa-paper-plane"></i> Asignar Servicio
    </button>
  </div>

  <div class="assigned-list">
    <h4>Servicios Asignados</h4>
    <table>
      <thead>
        <tr>
          <th>Técnico</th>
          <th>Servicio</th>
          <th>Fecha</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Carlos Pérez</td>
          <td>Mantenimiento Preventivo</td>
          <td>2025-10-15</td>
          <td><span class="status pending">Pendiente</span></td>
        </tr>
        <tr>
          <td>Ana Rodríguez</td>
          <td>Instalación</td>
          <td>2025-10-14</td>
          <td><span class="status completed">Completado</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<style>
  body {
    background-color: #161625;
    font-family: "Poppins", sans-serif;
    color: #e4e4e7;
  }

  .assign-container {
    max-width: 900px;
    margin: 40px auto;
    background-color: #1f1f2f;
    padding: 2rem;
    border-radius: 14px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.4);
  }

  .assign-header h6 {
    font-size: 1.6rem;
    color: #00ffc6;
    margin-bottom: 5px;
  }

  .assign-header p {
    color: #b5b5c3;
    font-size: 0.95rem;
    margin-bottom: 20px;
  }

  .assign-card {
    background: #24243a;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    border-left: 4px solid #00ffc6;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    font-weight: 600;
    color: #e4e4e7;
    display: block;
    margin-bottom: 6px;
  }

  .form-group select {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #33334d;
    background-color: #1a1a2e;
    color: #f1f1f1;
    outline: none;
    transition: all 0.3s;
  }

  .form-group select:focus {
    border-color: #00ffc6;
    background-color: #1e1e35;
  }

  .assign-btn {
    background-color: #00ffc6;
    color: #0a0a0f;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .assign-btn:hover {
    background-color: #00d1b2;
    transform: scale(1.03);
  }

  .assign-btn i {
    margin-right: 8px;
  }

  .assigned-list h4 {
    color: #00ffc6;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #1e1e2f;
    border-radius: 10px;
    overflow: hidden;
  }

  th, td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #2d2d45;
  }

  th {
    background-color: #23233a;
    color: #00ffc6;
  }

  tr:hover {
    background-color: #292942;
  }

  .status {
    padding: 5px 10px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .status.pending {
    background-color: #4a3f1f;
    color: #ffda6b;
  }

  .status.completed {
    background-color: #1f4037;
    color: #00ffc6;
  }
</style>
