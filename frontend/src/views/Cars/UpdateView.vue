<template>
  <div class="container">
    <h1>Редактировать автомобиль</h1>
    <form @submit.prevent="updateCar">
      <!-- Марка -->
      <div class="form-group">
        <label for="brand">Марка:</label>
        <input type="text" id="brand" v-model="car.brand" required />
      </div>

      <!-- Модель -->
      <div class="form-group">
        <label for="model">Модель:</label>
        <input type="text" id="model" v-model="car.model" required />
      </div>

      <!-- Фото (имя файла) -->
      <div class="form-group">
        <label for="photo_path">Фото (имя файла):</label>
        <input type="text" id="photo_path" v-model="car.photo_path" placeholder="car.jpg" />
      </div>

      <!-- Год выпуска -->
      <div class="form-group">
        <label for="year">Год выпуска:</label>
        <input type="number" id="year" v-model="car.year" min="1900" max="2099" required />
      </div>

      <!-- Цена -->
      <div class="form-group">
        <label for="price">Цена (₽):</label>
        <input type="number" id="price" v-model="car.price" required />
      </div>

      <!-- Пробег -->
      <div class="form-group">
        <label for="mileage">Пробег (км):</label>
        <input type="number" id="mileage" v-model="car.mileage" min="0" required />
      </div>

      <!-- Тип двигателя -->
      <div class="form-group">
        <label for="engine_type">Тип двигателя:</label>
        <input type="text" id="engine_type" v-model="car.engine_type" placeholder="Бензин" required />
      </div>

      <!-- Коробка передач -->
      <div class="form-group">
        <label for="transmission">Коробка передач:</label>
        <input type="text" id="transmission" v-model="car.transmission" placeholder="Автоматическая" required />
      </div>

      <!-- Описание -->
      <div class="form-group">
        <label for="description">Описание:</label>
        <textarea id="description" v-model="car.description" rows="4"></textarea>
      </div>

      <!-- Кнопка "Обновить" -->
      <button type="submit" class="btn-update">Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CarUpdateView',
  data() {
    return {
      car: {
        brand: '', // Марка
        model: '', // Модель
        year: null, // Год выпуска
        price: null, // Цена
        mileage: null, // Пробег
        engine_type: '', // Тип двигателя
        transmission: '', // Коробка передач
        description: '', // Описание
        photo_path: '', // Имя файла изображения
      },
    };
  },
  async created() {
    await this.fetchCar();
  },
  methods: {
    async fetchCar() {
      try {
        console.log(`Загружаем данные автомобиля с ID: ${this.$route.params.id}`); // Отладочный вывод
        const response = await fetch(`/api/cars/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные автомобиля');
        this.car = await response.json();
        console.log('Полученные данные:', this.car); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке данных автомобиля:', error.message);
      }
    },
    async updateCar() {
      try {
        console.log('Отправляем данные для обновления:', this.car); // Отладочный вывод
        const response = await fetch(`/api/cars/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.car),
        });
        if (!response.ok) throw new Error('Не удалось обновить автомобиль');
        this.$router.push('/cars'); // Перенаправление на список автомобилей
      } catch (error) {
        console.error('Ошибка при обновлении автомобиля:', error.message);
      }
    },
  },
};
</script>