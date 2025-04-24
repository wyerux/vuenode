<template>
  <div class="container">
    <h1>Контакты</h1>

    <!-- Контактные данные -->
    <section class="section">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mb-4">
            <div class="contact-card text-center p-4">
              <i class="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
              <h5>Адрес</h5>
              <p>Москва, ул. Недвижимости 15</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="contact-card text-center p-4">
              <i class="fas fa-phone fa-3x text-primary mb-3"></i>
              <h5>Телефон</h5>
              <p>+7 (495) 123-45-67</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="contact-card text-center p-4">
              <i class="fas fa-envelope fa-3x text-primary mb-3"></i>
              <h5>Email</h5>
              <p>info@realestate.ru</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Форма обратной связи -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Напишите нам</h2>
        <div class="row">
          <div class="col-md-8 mx-auto">
            <form>
              <div class="row g-3">
                <div class="col-md-6">
                  <input type="text" class="form-control form-control-lg" placeholder="Ваше имя" required />
                </div>
                <div class="col-md-6">
                  <input type="email" class="form-control form-control-lg" placeholder="Email" required />
                </div>
                <div class="col-12">
                  <textarea class="form-control form-control-lg" rows="5" placeholder="Сообщение" required></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary btn-lg w-100">Отправить</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Карта -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Где мы находимся</h2>
        <div class="map-container" style="height: 500px;">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2246.069722683098!2d37.61749051552644!3d55.75582609863369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54afc73d4b0c9%3A0x3d44d6cc5757cf4c!2z0JzQvtGB0LrQstCwLCDQmtC40LXQudGB0LrQsNGPINC-0LHQuy4!5e0!3m2!1sru!2sru!4v1685290800000!5m2!1sru!2sru"
            style="border: 0; width: 100%; height: 100%;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Галерея офиса -->
    <section class="section bg-light">
      <div class="container">
        <h2 class="section-title">Галерея офиса</h2>
        <div class="row g-4">
          <div class="col-md-4">
            <img src="../assets/images/9.png" alt="Офис" class="img-fluid rounded-3 shadow img-responsive" />
          </div>
          <div class="col-md-4">
            <img src="../assets/images/12.png" alt="Офис" class="img-fluid rounded-3 shadow img-responsive" />
          </div>
          <div class="col-md-4">
            <img src="../assets/images/13.png" alt="Офис" class="img-fluid rounded-3 shadow img-responsive" />
          </div>
          <div class="col-md-4">
            <img src="../assets/images/10.png" alt="Офис" class="img-fluid rounded-3 shadow img-responsive" />
          </div>
          <div class="col-md-4">
            <img src="../assets/images/6.png" alt="Офис" class="img-fluid rounded-3 shadow img-responsive" />
          </div>
          <div class="col-md-4">
            <img src="../assets/images/15.png" alt="Офис" class="img-fluid rounded-3 shadow img-responsive" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
};
</script>
