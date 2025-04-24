<template>
  <div class="container">
    <h1>О нас</h1>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <h1>Мы создаем пространство для вашей мечты</h1>
        <p>Профессиональный подход к каждому клиенту. Ваш идеальный дом начинается здесь.</p>
        <a href="/apartments" class="btn btn-primary">Посмотреть квартиры</a>
      </div>
      <div class="hero-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about-section bg-light py-5">
      <div class="container">
        <div class="row align-items-center gy-4">
          <div class="col-md-6">
            <img src="../assets/images/11.png" alt="О нас" class="img-fluid rounded-3 shadow-lg img-responsive" />
          </div>
          <div class="col-md-6">
            <h2 class="section-title">Кто мы?</h2>
            <p class="lead">
              Мы — команда профессионалов с более чем 10-летним опытом в сфере недвижимости. Наша цель — помочь вам найти дом, который станет вашим уютным уголком.
            </p>
            <ul class="list-unstyled">
              <li><i class="fas fa-check-circle text-success me-2"></i> Более 5000 успешных сделок</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Индивидуальный подход</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Полное юридическое сопровождение</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery-section py-5">
      <div class="container">
        <h2 class="section-title text-center mb-5">Наши объекты</h2>
        <p class="text-center lead mb-5">Вот несколько примеров квартир, которые мы предлагаем:</p>
        <div class="row g-4">
          <div class="col-md-3">
            <div class="gallery-item position-relative overflow-hidden rounded-3">
              <img src="../assets/images/13.png" alt="Квартира 1" class="img-fluid img-responsive" />
              <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-4">
                <h3 class="text-white">Уютная квартира</h3>
                <p class="text-white">1-комнатная квартира в центре города</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="gallery-item position-relative overflow-hidden rounded-3">
              <img src="../assets/images/14.png" alt="Квартира 2" class="img-fluid img-responsive" />
              <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-4">
                <h3 class="text-white">Просторная квартира</h3>
                <p class="text-white">2-комнатная квартира с видом на парк</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="gallery-item position-relative overflow-hidden rounded-3">
              <img src="../assets/images/15.png" alt="Квартира 3" class="img-fluid img-responsive" />
              <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-4">
                <h3 class="text-white">Современная студия</h3>
                <p class="text-white">Студия с дизайнерским ремонтом</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="gallery-item position-relative overflow-hidden rounded-3">
              <img src="../assets/images/16.png" alt="Квартира 4" class="img-fluid img-responsive" />
              <div class="gallery-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center p-4">
                <h3 class="text-white">Элитная квартира</h3>
                <p class="text-white">3-комнатная квартира в престижном районе</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section py-5">
      <div class="container">
        <div class="row align-items-center gy-4">
          <div class="col-md-6 order-md-2">
            <img src="../assets/images/17.png" alt="Наша миссия" class="img-fluid rounded-3 shadow-lg img-responsive" />
          </div>
          <div class="col-md-6 order-md-1">
            <h2 class="section-title">Наша миссия</h2>
            <p class="lead">
              Мы стремимся сделать процесс покупки или аренды квартиры максимально комфортным и прозрачным. Для нас важно не просто продать квартиру, а создать долгосрочные отношения с нашими клиентами.
            </p>
            <p>Ваш комфорт — наш приоритет. Мы создаем пространство для вашей мечты.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>
