<template>
  <div class="container">
    <h1>Контакты</h1>
    <p>Свяжитесь с нами для заказа или вопросов. Мы всегда рады помочь!</p>

    <div class="row">
      <div class="col-md-4">
        <img src="../assets/images/map.jpg" class="img-responsive" alt="Карта" />
        <p>Наш цех — это место, где рождаются идеи и оживает металл.</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/workshop1.jpg" class="img-responsive" alt="Цех" />
        <p>Наш цех: современное оборудование и традиционные методы.</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/workshop2.jpg" class="img-responsive" alt="Цех" />
        <p>Экскурсии: узнайте, как создаются наши изделия.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <img src="../assets/images/workshop3.jpg" class="img-responsive" alt="Цех" />
        <p>Сотрудничество: мы открыты для новых проектов.</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/workshop4.jpg" class="img-responsive" alt="Цех" />
        <p>Обратная связь: пишите или звоните, мы всегда на связи.</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/workshop5.jpg" class="img-responsive" alt="Цех" />
        <p>Социальные сети: следите за нашими новостями.</p>
      </div>
    </div>

    <!-- Блок "Контактная информация" -->
    <div class="contact-info">
      <h2>Контактная информация</h2>
      <p><strong>Телефон:</strong> +7 (999) 123-45-67</p>
      <p><strong>Email:</strong> <a href="mailto:info@forgeworkshop.ru">info@forgeworkshop.ru</a></p>
      <p>
        <strong>Социальные сети:</strong>
        <a href="#" target="_blank">Instagram</a>,
        <a href="#" target="_blank">Facebook</a>,
        <a href="#" target="_blank">VK</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
};
</script>