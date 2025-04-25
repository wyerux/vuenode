<template>
  <div class="container fade-in">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content text-center">
        <h1 class="display-4">О нашем автосалоне</h1>
        <p class="lead">
          Мы — команда профессионалов, которые помогают вам найти идеальный автомобиль для любого случая.
        </p>
      </div>
    </div>

    <!-- About Section: First Row of Cards -->
    <section class="about-section bg-light py-5">
      <div class="container">
        <div class="row justify-content-center gy-4">
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/2.png" class="card-img-top img-fluid rounded" alt="Наша команда" />
              <div class="card-body text-center">
                <h5 class="card-title">Наша команда</h5>
                <p class="card-text">
                  Опытные специалисты с многолетним опытом работы в автомобильной индустрии.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/4.png" class="card-img-top img-fluid rounded" alt="Процесс работы" />
              <div class="card-body text-center">
                <h5 class="card-title">Наши услуги</h5>
                <p class="card-text">
                  От подбора автомобиля до оформления всех документов — мы делаем всё для вас.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card shadow-lg">
              <img src="../assets/images/5.png" class="card-img-top img-fluid rounded" alt="История компании" />
              <div class="card-body text-center">
                <h5 class="card-title">Наша история</h5>
                <p class="card-text">
                  Более 10 лет успешной работы и тысячи довольных клиентов по всему миру.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section: Second Row of Cards -->
    <section class="about-section bg-light py-5">
      <div class="container">
        <div class="row justify-content-center gy-4">
          <div class="col-md-6">
            <div class="card shadow-lg">
              <img src="../assets/images/3.png" class="card-img-top img-fluid rounded" alt="Автомобили в интерьере" />
              <div class="card-body text-center">
                <h5 class="card-title">Наши автомобили</h5>
                <p class="card-text">
                  Широкий выбор премиальных автомобилей для любого стиля жизни.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card shadow-lg">
              <img src="../assets/images/6.png" class="card-img-top img-fluid rounded" alt="Наши награды" />
              <div class="card-body text-center">
                <h5 class="card-title">Наши достижения</h5>
                <p class="card-text">
                  Признание качества нашей работы на международном уровне.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section py-5">
      <div class="container">
        <h2 class="section-title text-center mb-4">Где мы находимся</h2>
        <div class="embed-responsive embed-responsive-16by9">
          <iframe
            class="embed-responsive-item rounded shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.840734058671!2d144.9614947151675!3d-37.81625187975247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b80a3e6c95%3A0x5045675218ce9e0!2sFerrari%20Melbourne!5e0!3m2!1sen!2sru!4v1698744928725!5m2!1sen!2sru"
            width="100%"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
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