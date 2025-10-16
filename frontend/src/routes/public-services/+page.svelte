<section class="servicios">
  <h1>Nuestros Servicios</h1>

  <div class="lista">
    <div class="item">
      <h3>Instalación de Equipos</h3>
      <p>Montaje profesional y preciso de sistemas de aire acondicionado residenciales, comerciales e industriales.</p>
    </div>
    <div class="item">
      <h3>Mantenimiento Preventivo</h3>
      <p>Garantiza el máximo rendimiento y evita averías mediante revisiones periódicas.</p>
    </div>
    <div class="item">
      <h3>Reparación Especializada</h3>
      <p>Servicio técnico avanzado para resolver cualquier tipo de falla o error en el sistema.</p>
    </div>
    <div class="item">
      <h3>Recarga de Gas</h3>
      <p>Refrigerantes de alta calidad que prolongan la vida útil de tus equipos.</p>
    </div>
  </div>
</section>

<style>
  .servicios {
    background-color: #1c1b29;
    color: #fff;
    padding: 4rem 2rem;
    text-align: center;
    min-height: 80vh;
  }

  .servicios h1 {
    color: #00d4b3;
    margin-bottom: 2rem;
  }

  .lista {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    max-width: 1100px;
    margin: auto;
  }

  .item {
    background-color: #24233a;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    transition: transform 0.3s ease;
  }

  .item:hover {
    transform: translateY(-5px);
  }

  .item h3 {
    color: #00d4b3;
    margin-bottom: 1rem;
  }

  .item p {
    color: #ccc;
  }
</style>
