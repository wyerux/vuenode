<template>
  <div class="container">
    <h1>Создание автомобиля</h1>

    <!-- Форма создания автомобиля -->
    <form @submit.prevent="createCar" class="vertical-form">
      <!-- Предпросмотр изображения -->
      <div class="mb-3">
        <label for="image-preview" class="form-label">Предпросмотр изображения:</label><br />
        <img v-if="car.photo_path" :src="getImagePath(car.photo_path)" alt="Фото автомобиля" class="img-fluid img-thumbnail" style="max-width: 200px;" />
        <span v-else>Изображение не указано</span>
      </div>

      <!-- Поле для указания имени файла изображения -->
      <div class="mb-3">
        <label for="photo_path" class="form-label">Имя файла изображения (в папке /images):</label>
        <input type="text" id="photo_path" v-model="car.photo_path" class="form-control" placeholder="car.png" />
        <small class="form-text text-muted">Укажите имя файла из папки /public/images (например, car.png).</small>
      </div>

      <!-- Марка -->
      <div class="mb-3">
        <label for="brand" class="form-label">Марка:</label>
        <input type="text" id="brand" v-model="car.brand" class="form-control" required />
      </div>

      <!-- Модель -->
      <div class="mb-3">
        <label for="model" class="form-label">Модель:</label>
        <input type="text" id="model" v-model="car.model" class="form-control" required />
      </div>

      <!-- Год выпуска -->
      <div class="mb-3">
        <label for="year" class="form-label">Год выпуска:</label>
        <input type="number" id="year" v-model="car.year" class="form-control" min="1900" max="2099" required />
      </div>

      <!-- Цена -->
      <div class="mb-3">
        <label for="price" class="form-label">Цена (₽):</label>
        <input type="number" id="price" v-model="car.price" class="form-control" required />
      </div>

      <!-- Пробег -->
      <div class="mb-3">
        <label for="mileage" class="form-label">Пробег (км):</label>
        <input type="number" id="mileage" v-model="car.mileage" class="form-control" min="0" required />
      </div>

      <!-- Тип двигателя -->
      <div class="mb-3">
        <label for="engine_type" class="form-label">Тип двигателя:</label>
        <input type="text" id="engine_type" v-model="car.engine_type" class="form-control" placeholder="Бензин" required />
      </div>

      <!-- Коробка передач -->
      <div class="mb-3">
        <label for="transmission" class="form-label">Коробка передач:</label>
        <input type="text" id="transmission" v-model="car.transmission" class="form-control" placeholder="Автоматическая" required />
      </div>

      <!-- Описание -->
      <div class="mb-3">
        <label for="description" class="form-label">Описание:</label>
        <textarea id="description" v-model="car.description" class="form-control" rows="3"></textarea>
      </div>

      <!-- Кнопки (вертикальное расположение) -->
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary w-100">Создать</button>
        <router-link to="/cars" class="btn btn-secondary w-100">Назад</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CarCreateView',
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
  methods: {
    getImagePath(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение
      return `/images/${imageName}`;
    },
    async createCar() {
      try {
        console.log('Отправляем данные:', this.car); // Отладочный вывод

        const response = await fetch('/api/cars', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.car),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Получаем детали ошибки
          throw new Error(errorData.message || 'Не удалось создать автомобиль');
        }

        this.$router.push('/cars'); // Перенаправление на список автомобилей
      } catch (error) {
        console.error('Ошибка при создании автомобиля:', error.message);
      }
    },
  },
};
</script>