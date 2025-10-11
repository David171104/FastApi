<nav class="navbar">
  <div class="nav-left">
    <a href="/" class="nav-link">Inicio</a>
    <a href="/public-services" class="nav-link">Servicios</a>
    <a href="/public-contact" class="nav-link">Contacto</a>
  </div>

  <div class="nav-right">
    <a href="/register" class="btn btn-outline">Registro</a>
    <a href="/login" class="btn btn-primary">Ingresar</a>
  </div>
</nav>

<style>
    :global(body){
       background-color: #1e1e2f;
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        color: #cfcfe6;
    }
   .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 40px;
    background-color: #1e1e2f;
    color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .nav-left {
    display: flex;
    gap: 20px;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: #00d1b2;
  }

  .nav-right {
    display: flex;
    gap: 12px;
  }

  .btn {
    padding: 8px 18px;
    border-radius: 6px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .btn-outline {
    border: 2px solid #00d1b2;
    color: #00d1b2;
  }

  .btn-outline:hover {
    background-color: #00d1b2;
    color: white;
  }

  .btn-primary {
    background-color: #00d1b2;
    color: white;
  }

  .btn-primary:hover {
    background-color: #00a896;
  }
</style>
