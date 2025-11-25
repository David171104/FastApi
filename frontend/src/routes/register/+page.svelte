<style>
  /* Fondo general */
.page-wrapper {
  min-height: 100vh;
  background-color: #161625;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Contenedor del formulario */
.form-container {
  background-color: #1e1e2f;
  color: #e4e4e7;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

/* Título */
.form-container h2 {
  color: #00ffc6;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* Grupo de campos */
.form-group {
  margin-bottom: 1.2rem;
}

/* Etiquetas */
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #b5b5c3;
}

/* Asterisco obligatorio */
.required {
  color: #ff6b6b;
  font-weight: bold;
}

/* Inputs */
input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px 0px;
  border-radius: 8px;
  border: 1px solid #2d2d45;
  background-color: #292942;
  color: #e4e4e7;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #00ffc6;
  box-shadow: 0 0 0 2px rgba(0, 255, 198, 0.2);
}

/* Botón principal */
button[type="submit"] {
  background-color: #00ffc6;
  color: #0a0a0f;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button[type="submit"]:hover {
  background-color: #00d1b2;
  transform: scale(1.02);
}

/* Botón secundario */
button[type="button"] {
  background-color: transparent;
  color: #00ffc6;
  border: 1px solid #00ffc6;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button[type="button"]:hover {
  background-color: #00ffc6;
  color: #0a0a0f;
  transform: scale(1.02);
}

/* Responsive */
@media (max-width: 600px) {
  .form-container {
    padding: 1.5rem;
  }

  .form-container h2 {
    font-size: 1.5rem;
  }

  button {
    font-size: 0.95rem;
  }
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
      <button type="button" on:click={goToLogin}>Iniciar sesión</button>
    </div>
  </div>
</div>

<script>
  import Swal from "sweetalert2";
  import { register_user } from "./register.js";
  import { goto } from "$app/navigation";

  function handleSubmit(event) {
    event.preventDefault();
    register_user();
  }

  function goToLogin() {
    goto("/login");
  }
</script>