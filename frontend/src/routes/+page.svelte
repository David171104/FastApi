<section class="hero">
  <div class="overlay">
    <h1>Climatización Total</h1>
    <p>
      Innovación, eficiencia y tecnología en sistemas de aire acondicionado.  
      Mantenemos tu ambiente perfecto los 365 días del año.
    </p>
  </div>
</section>

<section class="about">
  <h2>¿Quiénes Somos?</h2>
  <p>
    Somos especialistas en soluciones integrales de climatización.  
    Ofrecemos instalación, mantenimiento y reparación de aires acondicionados con altos estándares
    de calidad y tecnología de punta.
  </p>
</section>

<section class="stats">
  <div class="stat">
    <h3>+10</h3>
    <p>Años de experiencia</p>
  </div>
  <div class="stat">
    <h3>+500</h3>
    <p>Clientes satisfechos</p>
  </div>
  <div class="stat">
    <h3>+1000</h3>
    <p>Equipos instalados</p>
  </div>
</section>

<section class="tech">
  <h2>Tecnología y Rendimiento</h2>
  <p>
    Implementamos soluciones que reducen el consumo energético hasta un 30% gracias a la eficiencia
    de nuestros sistemas y procesos de mantenimiento optimizados.
  </p>

  <div class="cards">
    <div class="card">
      <h3>Control Inteligente</h3>
      <p>Monitoreo y ajustes automáticos para mantener temperaturas ideales todo el tiempo.</p>
    </div>
    <div class="card">
      <h3>Eficiencia Energética</h3>
      <p>Equipos diseñados para ofrecer el máximo rendimiento con el menor consumo posible.</p>
    </div>
    <div class="card">
      <h3>Diagnóstico Avanzado</h3>
      <p>Evaluaciones precisas mediante sistemas digitales de verificación térmica y flujo de aire.</p>
    </div>
  </div>
</section>

<section class="team">
  <h2>Nuestro Equipo</h2>
  <div class="members">
    <div class="member">
      <div class="avatar"></div>
      <h3>David Altamar</h3>
      <p>Técnico en Refrigeración</p>
    </div>
    <div class="member">
      <div class="avatar"></div>
      <h3>Jhon Cantillo</h3>
      <p>Ingeniera en Climatización</p>
    </div>
    <div class="member">
      <div class="avatar"></div>
      <h3>Jonathan Soto</h3>
      <p>Supervisor de Mantenimiento</p>
    </div>
  </div>
</section>

<section class="reviews">
  <h2>Lo Que Dicen Nuestros Clientes</h2>
  <div class="review-cards">
    <div class="review">
      <p>"Excelente servicio, mi aire quedó como nuevo y en muy poco tiempo."</p>
      <h4>- Andrés Martínez</h4>
    </div>
    <div class="review">
      <p>"Muy profesionales, confiables y siempre atentos a cada detalle."</p>
      <h4>- Laura Ríos</h4>
    </div>
    <div class="review">
      <p>"Sin duda los mejores en mantenimiento de sistemas industriales."</p>
      <h4>- Ricardo Torres</h4>
    </div>
  </div>
</section>




<style>
  /* General */
  section {
    padding: 5rem 2rem;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  p {
    line-height: 1.6;
  }

  /* Hero */
  .hero {
    height: 90vh;
    background: url('https://images.unsplash.com/photo-1615874959474-d60991e03f7e?auto=format&fit=crop&w=1400&q=80')
      center/cover no-repeat;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .overlay {
    background: rgba(28, 27, 41, 0.8);
    text-align: center;
    padding: 3rem;
    border-radius: 15px;
  }

  .overlay h1 {
    font-size: 3.5rem;
    color: #00d4b3;
    margin-bottom: 1rem;
  }

  .overlay p {
    max-width: 700px;
    margin: auto;
    color: #ccc;
  }

  /* About */
  .about {
    background-color: #1c1b29;
    color: #ddd;
    text-align: center;
  }

  .about h2 {
    color: #00d4b3;
    margin-bottom: 1rem;
  }

  /* Stats */
  .stats {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    background-color: #24233a;
    color: white;
    text-align: center;
  }

  .stat {
    margin: 2rem;
  }

  .stat h3 {
    color: #00d4b3;
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  /* Tech */
  .tech {
    background-color: #1c1b29;
    text-align: center;
    color: #ddd;
  }

  .tech h2 {
    color: #00d4b3;
    margin-bottom: 1rem;
  }

  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }

  .card {
    background-color: #24233a;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  .card h3 {
    color: #00d4b3;
    margin-bottom: 1rem;
  }

  .card p {
    color: #ccc;
  }

  /* Team */
  .team {
    background-color: #24233a;
    text-align: center;
  }

  .team h2 {
    color: #00d4b3;
    margin-bottom: 2rem;
  }

  .members {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .member {
    background-color: #1c1b29;
    padding: 2rem;
    border-radius: 12px;
    width: 250px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  .avatar {
    background: linear-gradient(135deg, #00d4b3, #007b7b);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: auto auto 1rem;
  }

  /* Reviews */
  .reviews {
    background-color: #1c1b29;
    color: #ddd;
    text-align: center;
  }

  .reviews h2 {
    color: #00d4b3;
    margin-bottom: 2rem;
  }

  .review-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
  }

  .review {
    background-color: #24233a;
    border-radius: 12px;
    padding: 2rem;
    width: 300px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  .review h4 {
    color: #00d4b3;
    margin-top: 1rem;
  }

  /* Gallery */
  .gallery {
    background-color: #24233a;
    text-align: center;
  }

  .gallery h2 {
    color: #00d4b3;
    margin-bottom: 2rem;
  }

  .images {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: auto;
  }

  .img {
    background: url('https://images.unsplash.com/photo-1604328698692-3a3a5b2e8b26?auto=format&fit=crop&w=800&q=80')
      center/cover no-repeat;
    border-radius: 12px;
    height: 200px;
    transition: transform 0.3s ease;
  }

  .img:hover {
    transform: scale(1.03);
  }

  /* Footer banner */
  .footer-banner {
    background: linear-gradient(135deg, #00d4b3, #007b7b);
    text-align: center;
    color: #fff;
    padding: 4rem 2rem;
  }

  .footer-banner h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
</style>
