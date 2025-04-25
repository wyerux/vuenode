<template>
  <div class="container">
    <h1>Детали автомобиля</h1>
    <div class="car-details">
      <!-- Изображение автомобиля -->
      <div class="car-image-container">
        <img
          :src="getCarImage(car.photo_path)"
          alt="Фото автомобиля"
          class="car-image"
        />
      </div>

      <!-- Данные автомобиля -->
      <p><strong>Марка:</strong> {{ car.brand || 'Не указано' }}</p>
      <p><strong>Модель:</strong> {{ car.model || 'Не указано' }}</p>
      <p><strong>Год выпуска:</strong> {{ car.year || 'Не указано' }}</p>
      <p><strong>Цена (₽):</strong> {{ car.price || 'Не указано' }}</p>
      <p><strong>Пробег (км):</strong> {{ car.mileage || 'Не указано' }}</p>
      <p><strong>Тип двигателя:</strong> {{ car.engine_type || 'Не указано' }}</p>
      <p><strong>Коробка передач:</strong> {{ car.transmission || 'Не указано' }}</p>
      <p><strong>Описание:</strong> {{ car.description || 'Нет описания' }}</p>
    </div>

    <!-- Кнопка "Назад" -->
    <router-link to="/cars" class="btn-back">Назад</router-link>
  </div>
</template>

<script>
export default {
  name: 'CarDetailsView',
  data() {
    return {
      car: {}, // Данные автомобиля
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
    getCarImage(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение

      const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      const fileExtension = imageName.split('.').pop().toLowerCase();

      if (supportedExtensions.includes(fileExtension)) {
        // Если изображения хранятся в папке public/images
        return `/images/${imageName}`;
      } else {
        console.warn(`Неподдерживаемый формат изображения: ${fileExtension}`);
        return '/images/placeholder.jpg'; // Запасное изображение
      }
    },
  },
};
</script>