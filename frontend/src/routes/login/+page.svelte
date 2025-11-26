<style>
  :root {
    --bg-main: #0f172a;
    --bg-card: #111827;
    --accent: #00ffc6;
    --accent-soft: rgba(0, 255, 198, 0.14);
    --text-main: #e5e7eb;
    --text-muted: #9ca3af;
  }

  .login-wrapper {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, #1e293b 0, transparent 55%),
      radial-gradient(circle at bottom right, #00ffc61a 0, transparent 55%),
      var(--bg-main);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3rem 1.5rem;
  }

  .login-layout {
    width: 100%;
    max-width: 1120px;
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 3rem;
    align-items: center;
  }

  /* --- HERO IZQUIERDA --- */
  .hero {
    color: var(--text-main);
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid var(--accent-soft);
    font-size: 0.8rem;
    color: var(--accent);
    margin-bottom: 0.9rem;
  }

  .hero-title {
    font-size: clamp(1.9rem, 2.3vw + 1rem, 2.6rem);
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .hero-text {
    font-size: 0.95rem;
    color: var(--text-muted);
    margin-bottom: 1.4rem;
    max-width: 480px;
  }

  .hero-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.8rem 0;
    color: var(--text-main);
    font-size: 0.9rem;
  }

  .hero-list li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.45rem;
  }

  .hero-list li span.icon {
    width: 18px;
    height: 18px;
    border-radius: 999px;
    border: 1px solid var(--accent);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: var(--accent);
  }

  .hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .hero-stat-card {
    flex: 1;
    min-width: 150px;
    padding: 0.8rem 1rem;
    border-radius: 0.9rem;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid var(--accent-soft);
  }

  .hero-stat-number {
    display: block;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--accent);
  }

  .hero-stat-label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 0.2rem;
  }

  /* --- TARJETA LOGIN DERECHA --- */
  .login-card {
    background: #23233a;
    color: #e4e4e7;
    padding: 2.2rem 2.4rem;
    border-radius: 1.2rem;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 400px;
    text-align: center;
    animation: fadeIn 0.6s ease-in;
    border: 1px solid rgba(148, 163, 184, 0.2);
  }

  .login-card h2 {
    color: #00ffc6;
    font-weight: 700;
    margin-bottom: 0.4rem;
  }

  .login-subtitle {
    font-size: 0.85rem;
    color: #a1a1b5;
    margin-bottom: 1.6rem;
  }

  .form-group {
    margin-bottom: 1.1rem;
    text-align: left;
  }

  label {
    font-weight: 600;
    color: #c7c7d3;
    font-size: 0.9rem;
    display: block;
    margin-bottom: 0.3rem;
  }

  label span {
    color: #00ffc6;
  }

  input {
    width: 100%;
    padding: 0.7rem 0.8rem;
    background: #2b2b45;
    border: 1px solid #3a3a58;
    border-radius: 0.6rem;
    color: #e4e4e7;
    font-size: 0.95rem;
    transition: all 0.25s ease;
  }

  input::placeholder {
    color: #6b7280;
  }

  input:focus {
    outline: none;
    border-color: #00ffc6;
    box-shadow: 0 0 0 1px rgba(0, 255, 198, 0.35);
    background: #1f1f35;
  }

  .btn-login {
    width: 100%;
    background: #00ffc6;
    color: #1b1b2f;
    font-weight: 700;
    border: none;
    border-radius: 999px;
    padding: 0.85rem;
    cursor: pointer;
    font-size: 0.95rem;
    margin-top: 0.4rem;
    transition: background 0.25s ease, transform 0.08s ease-in,
      box-shadow 0.25s ease;
    box-shadow: 0 12px 25px rgba(0, 255, 198, 0.25);
  }

  .btn-login:hover {
    background: #00e6b2;
    box-shadow: 0 16px 30px rgba(0, 255, 198, 0.32);
  }

  .btn-login:active {
    transform: scale(0.97);
    box-shadow: 0 8px 18px rgba(0, 255, 198, 0.2);
  }

  .login-meta {
    margin-top: 0.9rem;
    font-size: 0.8rem;
    color: #a1a1b5;
  }

  .login-meta a {
    color: #00ffc6;
    text-decoration: none;
  }

  .login-meta a:hover {
    text-decoration: underline;
  }

  /* --- RESPONSIVE --- */
  @media (max-width: 900px) {
    .login-layout {
      grid-template-columns: minmax(0, 1fr);
      max-width: 480px;
      text-align: left;
    }

    .hero {
      order: 2;
    }

    .login-card {
      order: 1;
      margin-bottom: 2rem;
    }

    .hero-text {
      max-width: none;
    }
  }

  @media (max-width: 480px) {
    .login-wrapper {
      padding: 2.2rem 1.2rem;
    }

    .login-card {
      padding: 1.8rem 1.6rem;
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
  <div class="login-layout">
    <!-- IZQUIERDA: DESCRIPCIÓN DE LA PLATAFORMA -->
    <section class="hero">
      <div class="hero-badge">
        <span>●</span>
        <span>Climatización Total · Plataforma IoT</span>
      </div>

      <h1 class="hero-title">
        Monitorea tus aires acondicionados en tiempo real.
      </h1>

      <p class="hero-text">
        Controla temperatura, humedad y consumo eléctrico de tus equipos,
        recibe alertas tempranas y toma decisiones de mantenimiento basadas en datos.
      </p>

      <ul class="hero-list">
        <li>
          <span class="icon">✓</span>
          <span>Dashboard en tiempo real para todos tus equipos.</span>
        </li>
        <li>
          <span class="icon">✓</span>
          <span>Alertas cuando un equipo se sale del rango ideal.</span>
        </li>
        <li>
          <span class="icon">✓</span>
          <span>Historial y reportes para optimizar el consumo de energía.</span>
        </li>
      </ul>

      <div class="hero-stats">
        <div class="hero-stat-card">
          <span class="hero-stat-number">+50</span>
          <span class="hero-stat-label">Equipos monitoreados</span>
        </div>
        <div class="hero-stat-card">
          <span class="hero-stat-number">18%</span>
          <span class="hero-stat-label">Ahorro energético promedio</span>
        </div>
        <div class="hero-stat-card">
          <span class="hero-stat-number">24/7</span>
          <span class="hero-stat-label">Monitoreo y alertas</span>
        </div>
      </div>
    </section>

    <!-- DERECHA: LOGIN -->
    <section class="login-card">
      <h2>Iniciar Sesión</h2>
      <p class="login-subtitle">
        Ingresa con tu cuenta para ver el estado de tus equipos.
      </p>

      <!-- Svelte: evita recargar con |preventDefault -->
      <form id="login-form" on:submit|preventDefault={login_user}>
        <div class="form-group">
          <label for="login_email">
            Correo Electrónico <span>*</span>
          </label>
          <input
            type="email"
            id="login_email"
            placeholder="ejemplo@empresa.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="login_password">
            Contraseña <span>*</span>
          </label>
          <input type="password" id="login_password" required />
        </div>

        <button type="submit" class="btn-login">Ingresar</button>
      </form>

      <div class="login-meta">
        <span>¿Olvidaste tu contraseña? </span>
        <a href="#">Recupérala aquí</a><br />
        <span>¿Aún no tienes cuenta? </span>
        <a href="/registro">Crear cuenta</a>
      </div>
    </section>
  </div>
</div>

<script>
  import Swal from "sweetalert2";
  import { login_user } from "./login.js";
</script>
