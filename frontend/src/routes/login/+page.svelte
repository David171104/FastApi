<style>
  .login-wrapper {
    min-height: 100vh;
    background-color: #1b1b2f;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
  }

  .login-card {
    background: #23233a;
    color: #e4e4e7;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 400px;
    text-align: center;
    animation: fadeIn 0.6s ease-in;
  }

  h2 {
    color: #00ffc6;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .form-group {
    margin-bottom: 1.3rem;
    text-align: left;
  }

  label {
    font-weight: 600;
    color: #c7c7d3;
    font-size: 0.95rem;
  }

  label span {
    color: #00ffc6;
  }

  input {
    width: 100%;
    padding: 0.65rem 0rem;
    background: #2b2b45;
    border: 1px solid #3a3a58;
    border-radius: 0.5rem;
    color: #e4e4e7;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  input:focus {
    outline: none;
    border-color: #00ffc6;
    box-shadow: 0 0 6px rgba(0, 255, 198, 0.4);
  }

  .btn-login {
    width: 100%;
    background: #00ffc6;
    color: #1b1b2f;
    font-weight: 700;
    border: none;
    border-radius: 0.5rem;
    padding: 0.9rem;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.1s ease-in;
  }

  .btn-login:hover {
    background: #00e6b2;
  }

  .btn-login:active {
    transform: scale(0.97);
  }

  /* Responsive */
  @media (max-width: 480px) {
    .login-card {
      padding: 1.5rem;
    }

    h2 {
      font-size: 1.4rem;
    }

    input, .btn-login {
      font-size: 0.95rem;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-15px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>


<div class="login-wrapper">
  <div class="login-card">
    <h2>Iniciar Sesión</h2>
    <form id="login-form" on:submit={login_user}>
      <div class="form-group">
        <label for="login_email">Correo Electrónico <span>*</span></label>
        <input type="email" id="login_email" required />
      </div>

      <div class="form-group">
        <label for="login_password">Contraseña <span>*</span></label>
        <input type="password" id="login_password" required />
      </div>

      <button type="submit" class="btn-login">Ingresar</button>
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