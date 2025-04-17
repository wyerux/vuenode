<template>
  <div class="container">
    <h1>Главная</h1>
    <p>Добро пожаловать в кузнечный цех "Стальная душа"!</p>
    <p>Мы создаем уникальные кованые изделия уже более 10 лет.</p>

    <div class="row">
      <div class="col-md-4">
        <img src="../assets/images/forge1.jpg" alt="Кузнец за работой" class="img-responsive" />
        <p>Кузнец за работой: каждая деталь создается с душой.</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/forge2.jpg" alt="Готовые изделия" class="img-responsive" />
        <p>Готовые изделия: сочетание красоты и прочности.</p>
      </div>
      <div class="col-md-4">
        <img src="../assets/images/forge3.jpg" alt="Интерьер цеха" class="img-responsive" />
        <p>Интерьер цеха: место, где рождаются шедевры.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.row {
  display: flex;
  gap: 20px;
}
.img-responsive {
  max-width: 100%;
  height: auto;
}
</style>