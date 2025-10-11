<style>
   .page-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1e1e2f;
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
</style>


<div class="page-wrapper">
  <div class="form-container">
    <h2>Iniciar Sesión</h2>
        <form id="login-form" on:submit|preventDefault={login_user}>
            <div class="form-group">
                <label for="login_email">Correo Electrónico <span class="required">*</span></label>
                <input type="email" id="login_email" name="login_email" required />
            </div>

            <div class="form-group">
                <label for="login_password">Contraseña <span class="required">*</span></label>
                <input type="password" id="login_password" name="login_password" required />
            </div>

            <div class="form-group">
                <button type="submit">Ingresar</button>
            </div>
        </form>
  </div>
</div>

<script>
  import Swal from "sweetalert2";
  import { login_user } from "./login.js";

  function handleSubmit(event) {
    event.preventDefault();
    login_user();
  }
</script>