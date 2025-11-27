<section class="hero">
  <div class="hero-overlay">
    <div class="page-container hero-content">
      <div class="hero-text">
        <h1>Climatización Total</h1>
        <p>
          Innovación, eficiencia y tecnología en sistemas de aire acondicionado.
          Monitorea y optimiza tus equipos los 365 días del año.
        </p>

        <div class="hero-cta">
          <a href="#servicios" class="btn-primary">Ver servicios</a>
          <a href="/login" class="btn-outline">Ir al panel</a>
        </div>

        <div class="hero-meta">
          Monitoreo en tiempo real · Reportes de consumo
        </div>
      </div>
    </div>
  </div>
</section>

<section class="about section-dark" id="servicios">
  <div class="page-container">
    <h2 class="section-title">¿Quiénes Somos?</h2>
    <p class="section-text">
      Somos especialistas en soluciones integrales de climatización con enfoque en
      <strong>tecnología IoT y eficiencia energética</strong>. Ofrecemos instalación,
      mantenimiento y monitoreo digital de aires acondicionados, con estándares de
      calidad orientados a la industria moderna.
    </p>
  </div>
</section>

<section class="stats section-alt">
  <div class="page-container stats-grid">
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
  </div>
</section>

<section class="tech section-dark">
  <div class="page-container">
    <h2 class="section-title">Tecnología y Rendimiento</h2>
    <p class="section-text">
      Implementamos soluciones que reducen el consumo energético hasta un
      <strong>30%</strong> gracias a sensores inteligentes, análisis de datos y un
      mantenimiento predictivo basado en métricas reales de operación.
    </p>

    <div class="cards">
      <div class="card">
        <h3>Control Inteligente</h3>
        <p>
          Monitoreo, alertas y ajustes óptimos para mantener tus ambientes dentro
          del rango de confort definido.
        </p>
      </div>
      <div class="card">
        <h3>Eficiencia Energética</h3>
        <p>
          Estrategias y equipos diseñados para ofrecer el máximo rendimiento con el
          menor consumo posible.
        </p>
      </div>
      <div class="card">
        <h3>Diagnóstico Avanzado</h3>
        <p>
          Evaluaciones precisas mediante sistemas digitales para verificar
          temperatura, humedad, flujo de aire y consumo eléctrico.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="team section-alt">
  <div class="page-container">
    <h2 class="section-title">Nuestro Equipo</h2>
    <div class="members">
      <div class="member">
        <div class="avatar"></div>
        <h3>David Altamar</h3>
        <p>Técnico en Refrigeración y Climatización</p>
      </div>
      <div class="member">
        <div class="avatar"></div>
        <h3>Bryan Cantillo</h3>
        <p>Especialista IoT y Sensores</p>
      </div>
      <div class="member">
        <div class="avatar"></div>
        <h3>Jonathan Soto</h3>
        <p>Supervisor de Mantenimiento y Monitoreo</p>
      </div>
    </div>
  </div>
</section>

<section class="reviews section-dark">
  <div class="page-container">
    <h2 class="section-title">Lo Que Dicen Nuestros Clientes</h2>
    <div class="review-cards">
      <div class="review">
        <p>
          “Excelente servicio, mi aire quedó como nuevo y el monitoreo ayuda a
          saber cuándo darle mantenimiento.”
        </p>
        <h4>- Andrés Martínez</h4>
      </div>
      <div class="review">
        <p>
          “Muy profesionales y organizados. La plataforma nos permite ver el
          estado de todos los equipos en un solo lugar.”
        </p>
        <h4>- Laura Ríos</h4>
      </div>
      <div class="review">
        <p>
          “Ideal para sistemas industriales, ahora tenemos control real del
          consumo y de las fallas criticas.”
        </p>
        <h4>- Ricardo Torres</h4>
      </div>
    </div>
  </div>
</section>

<section class="gallery section-alt">
  <div class="page-container">
    <h2 class="section-title">Proyectos Recientes</h2>
    <div class="images">
      <div class="img" style="background-image: url('/1.jpg')"></div>
      <div class="img" style="background-image: url('/3.avif')"></div>
      <div class="img" style="background-image: url('/4.jpg')"></div>
    </div>
  </div>
</section>


<style>
  :root {
    --bg-main: #0f172a;
    --bg-dark: #1c1b29;
    --bg-alt: #24233a;
    --accent: #00d4b3;
    --text-main: #e5e7eb;
    --text-muted: #9ca3af;
    --radius-card: 14px;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    background-color: var(--bg-main);
    color: var(--text-main);
  }

  section {
    padding: 4.5rem 1.5rem;
  }

  .page-container {
    max-width: 1120px;
    margin: 0 auto;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  p {
    line-height: 1.6;
    margin: 0;
  }

  .section-title {
    text-align: center;
    font-size: 2rem;
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .section-text {
    max-width: 720px;
    margin: 0.5rem auto 0;
    text-align: center;
    color: var(--text-muted);
  }

  .section-dark {
    background-color: var(--bg-dark);
  }

  .section-alt {
    background-color: var(--bg-alt);
  }

  /* Hero */
  .hero {
    height: 85vh;
    min-height: 520px;
    background: url("https://images.unsplash.com/photo-1615874959474-d60991e03f7e?auto=format&fit=crop&w=1400&q=80")
      center/cover no-repeat;
    position: relative;
    color: white;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, #0b1220cc 0, #020617ee 50%);
    display: flex;
    align-items: center;
  }

  .hero-content {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .hero-text {
    max-width: 560px;
  }

  .hero-text h1 {
    font-size: clamp(2.4rem, 3vw + 1rem, 3.2rem);
    color: var(--accent);
    margin-bottom: 1rem;
  }

  .hero-text p {
    font-size: 1rem;
    color: #e5e7f7;
    margin-bottom: 1.8rem;
  }

  .hero-cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }

  .btn-primary,
  .btn-outline,
  .btn-footer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.4rem;
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .btn-primary {
    background: var(--accent);
    color: #020617;
    box-shadow: 0 12px 25px rgba(0, 212, 179, 0.3);
  }

  .btn-primary:hover {
    filter: brightness(1.05);
    box-shadow: 0 16px 30px rgba(0, 212, 179, 0.35);
  }

  .btn-outline {
    border: 1px solid rgba(148, 163, 184, 0.7);
    color: #e5e7eb;
    background: transparent;
  }

  .btn-outline:hover {
    background: rgba(15, 23, 42, 0.7);
  }

  .hero-meta {
    font-size: 0.85rem;
    color: #cbd5f5;
    margin-top: 0.3rem;
  }

  /* Stats */
  .stats-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.8rem;
    text-align: center;
  }

  .stat {
    background-color: #1b1b2f;
    border-radius: var(--radius-card);
    padding: 1.6rem 2rem;
    min-width: 180px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .stat h3 {
    color: var(--accent);
    font-size: 2.2rem;
    margin-bottom: 0.4rem;
  }

  .stat p {
    color: var(--text-muted);
    font-size: 0.95rem;
  }

  /* Tech cards */
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2.5rem;
  }

  .card {
    background-color: #1b1b2f;
    border-radius: var(--radius-card);
    padding: 2rem;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
    text-align: left;
  }

  .card h3 {
    color: var(--accent);
    margin-bottom: 0.8rem;
  }

  .card p {
    color: #d1d5db;
    font-size: 0.95rem;
  }

  /* Team */
  .team .members {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2rem;
  }

  .member {
    background-color: #1b1b2f;
    padding: 2rem;
    border-radius: var(--radius-card);
    width: 250px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  }

  .avatar {
    background: linear-gradient(135deg, var(--accent), #007b7b);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 1rem;
  }

  .member h3 {
    margin-bottom: 0.3rem;
  }

  .member p {
    font-size: 0.9rem;
    color: var(--text-muted);
  }

  /* Reviews */
  .review-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  .review {
    background-color: #1b1b2f;
    border-radius: var(--radius-card);
    padding: 2rem;
    width: 300px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  }

  .review p {
    color: #e5e7eb;
    font-size: 0.95rem;
  }

  .review h4 {
    color: var(--accent);
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  .gallery .images {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    margin-top: 30px;
  }

  .gallery .img {
    width: 100%;
    height: 220px;
    background-size: cover;       /* ← recorta pero se ve PRO */
    background-position: center;  /* ← centra */
    background-repeat: no-repeat;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .img {
    border-radius: var(--radius-card);
    height: 200px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
    transform: translateY(0);
    transition: transform 0.25s ease;
  }

  .img::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #020617aa, transparent 60%);
  }

  .img:hover {
    transform: translateY(-4px);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .hero {
      height: auto;
      min-height: 480px;
    }

    .hero-overlay {
      position: relative;
      padding: 4rem 1.5rem;
    }

    .hero-content {
      justify-content: center;
      text-align: center;
    }

    .hero-text {
      max-width: 100%;
    }

    .hero-cta {
      justify-content: center;
    }

    .footer-inner {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 600px) {
    section {
      padding: 3.2rem 1.4rem;
    }

    .stat {
      width: 100%;
    }

    .member,
    .review {
      width: 100%;
      max-width: 360px;
    }
  }
</style>
