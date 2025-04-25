<template>
  <div class="container fade-in">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <h1 class="display-4">Контакты</h1>
        <p class="lead">
          Свяжитесь с нами для заказа автомобиля или получения консультации. Мы всегда рады помочь!
        </p>
      </div>
    </div>

    <!-- Gallery Section: First Row of Cards -->
    <section class="gallery-section bg-light py-5">
      <div class="container">
        <div class="row justify-content-center gy-4">
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/7.png" class="card-img-top img-fluid rounded" alt="Автосалон" />
              <div class="card-body text-center">
                <h5 class="card-title">Наш автосалон</h5>
                <p class="card-text">Современный автосалон с широким выбором автомобилей.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/8.png" class="card-img-top img-fluid rounded" alt="Экспозиция" />
              <div class="card-body text-center">
                <h5 class="card-title">Экспозиция</h5>
                <p class="card-text">Посетите нашу экспозицию и убедитесь в качестве автомобилей лично.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/9.png" class="card-img-top img-fluid rounded" alt="Тест-драйв" />
              <div class="card-body text-center">
                <h5 class="card-title">Тест-драйв</h5>
                <p class="card-text">Запишитесь на тест-драйв и ощутите комфорт наших автомобилей.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section: Second Row of Cards -->
    <section class="gallery-section bg-light py-5">
      <div class="container">
        <div class="row justify-content-center gy-4">
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/10.png" class="card-img-top img-fluid rounded" alt="Финансирование" />
              <div class="card-body text-center">
                <h5 class="card-title">Финансирование</h5>
                <p class="card-text">Гибкие условия кредитования и лизинга для всех клиентов.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/11.png" class="card-img-top img-fluid rounded" alt="Обратная связь" />
              <div class="card-body text-center">
                <h5 class="card-title">Обратная связь</h5>
                <p class="card-text">Мы всегда на связи: звоните, пишите или приезжайте к нам.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/12.png" class="card-img-top img-fluid rounded" alt="Социальные сети" />
              <div class="card-body text-center">
                <h5 class="card-title">Социальные сети</h5>
                <p class="card-text">Следите за нашими новостями и акциями в соцсетях.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Information Section -->
    <section class="contact-info-section py-5">
      <div class="container text-center">
        <h2 class="section-title">Контактная информация</h2>
        <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
        <p>
          <strong>Email:</strong>
          <a href="mailto:info@autolux.ru" class="text-primary">info@autolux.ru</a>
        </p>
        <p>
          <strong>Социальные сети:</strong>
          <a href="#" target="_blank" class="ms-2 text-primary">Instagram</a>
          <a href="#" target="_blank" class="ms-2 text-primary">Facebook</a>
          <a href="#" target="_blank" class="ms-2 text-primary">VK</a>
        </p>
        <p><strong>Адрес:</strong> г. Москва, ул. Автомобильная, д. 10</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
};
</script>