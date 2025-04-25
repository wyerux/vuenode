<template>
  <div class="container fade-in">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <h1 class="display-4">Добро пожаловать в AutoLux</h1>
        <p class="lead">
          Мы предлагаем широкий выбор автомобилей премиум-класса с гарантией качества. Найдите свой идеальный автомобиль уже сегодня!
        </p>
        <div class="text-center mb-5">
          <a href="/about" class="btn btn-primary btn-lg me-3">О нас</a>
          <a href="/contact" class="btn btn-secondary btn-lg">Контакты</a>
        </div>
      </div>
    </div>

    <!-- Why Choose Us Section -->
    <section class="features-section bg-light py-5">
      <div class="container">
        <div class="row align-items-center gy-4">
          <!-- Left Column: Description -->
          <div class="col-md-6">
            <h2 class="section-title">Почему выбирают нас?</h2>
            <p class="fs-5">
              В нашем автосалоне вы найдете автомобили от ведущих мировых производителей. Мы гордимся тем, что предлагаем не только широкий ассортимент, но и индивидуальный подход к каждому клиенту.
            </p>
            <ul class="list-unstyled fs-5">
              <li><i class="fas fa-check-circle text-success me-2"></i> Профессиональные консультанты помогут подобрать автомобиль мечты.</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Гарантия на все автомобили и техническое обслуживание.</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Гибкие условия кредитования и лизинга.</li>
              <li><i class="fas fa-check-circle text-success me-2"></i> Бесплатная доставка автомобиля в любой регион.</li>
            </ul>
            <p class="fs-5">
              Мы стремимся сделать процесс покупки автомобиля максимально комфортным и приятным для вас. Посетите наш автосалон или свяжитесь с нами для получения дополнительной информации.
            </p>
          </div>

          <!-- Right Column: Image -->
          <div class="col-md-6 text-center">
            <img src="../assets/images/1.png" alt="Автосалон" class="img-fluid rounded shadow-lg img-responsive" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>