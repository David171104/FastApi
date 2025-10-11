<style>
  .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ocupa toda la altura de la pantalla */
    background-color: #1e1e2f; /* color de fondo oscuro del navbar */
  }

  .form-container {
    background-color: #fff;
    padding: 40px 30px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 420px;
    text-align: center;
  }

  h2 {
    margin-bottom: 25px;
    color: #1e1e2f;
    font-size: 1.6rem;
  }

  .form-group {
    margin-bottom: 16px;
    text-align: left;
  }

  label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
    color: #444;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }

  button {
    width: 100%;
    background-color: #4e73df;
    color: white;
    font-weight: bold;
    border: none;
    padding: 12px;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #2e59d9;
  }

  .required {
    color: red;
  }

  .form-container > div button {
    background-color: #00d1b2;
  }

  .form-container > div button:hover {
    background-color: #00a896;
  }
</style>

<div class="page-wrapper">
  <div class="form-container">
    <h2>Registro de Usuario</h2>

    <form id="register-form" on:submit|preventDefault={register_user}>
      <div class="form-group">
        <label for="name">Nombres <span class="required">*</span></label>
        <input type="text" id="name" name="name" required />
      </div>

      <div class="form-group">
        <label for="last_name">Apellidos <span class="required">*</span></label>
        <input type="text" id="last_name" name="last_name" required />
      </div>

      <div class="form-group">
        <label for="document_number">Número de documento</label>
        <input type="text" id="document_number" name="document_number" />
      </div>

      <div class="form-group">
        <label for="age">Edad</label>
        <input type="text" id="age" name="age" />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico <span class="required">*</span></label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña <span class="required">*</span></label>
        <input type="password" id="password" name="password" required />
      </div>

      <input type="hidden" id="role_id" name="role_id" value="3" />

      <div class="form-group">
        <button type="submit">Registrar</button>
      </div>
    </form>

    <div style="margin-top: 20px;">
      <button type="button">Iniciar sesión</button>
    </div>
  </div>
</div>

<script>
  import Swal from "sweetalert2";
  import { register_user } from "./register.js";

  function handleSubmit(event) {
    event.preventDefault();
    register_user();
  }
</script>