<template>
  <div class="container">
    <h1>Главная - Продажа квартир</h1>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <img src="../assets/images/1.jpg" alt="Логотип компании" class="logo img-responsive" />
        <h1>Найдите свою идеальную квартиру</h1>
        <p>Мы предлагаем широкий выбор квартир в лучших районах города. Начните поиск прямо сейчас!</p>
        <a href="/apartments" class="btn btn-primary">Посмотреть квартиры</a>
      </div>
    </div>

    <!-- Features Section -->
    <section class="features-section">
      <h2 class="section-title">Почему выбирают нас?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-home"></i>
          </div>
          <h3>Широкий выбор</h3>
          <p>Большой ассортимент квартир в различных районах города.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-hand-holding-usd"></i>
          </div>
          <h3>Доступные цены</h3>
          <p>Мы предлагаем квартиры по конкурентным ценам.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>Надежность</h3>
          <p>Все сделки проводятся с соблюдением законодательства.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Готовы найти свой новый дом?</h2>
        <a href="/apartments" class="btn btn-accent">Начать поиск</a>
      </div>
    </section>

    <!-- Clients Section -->
    <section class="clients-section">
      <h2 class="section-title">Наши клиенты</h2>
      <a href="/clients" class="btn btn-secondary">Перейти к клиентам</a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

