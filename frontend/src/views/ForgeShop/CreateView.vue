<template>
  <div class="container">
    <h1>Создание товара</h1>

    <!-- Форма создания товара -->
    <form @submit.prevent="createItem" class="vertical-form">
      <!-- Предпросмотр изображения -->
      <div class="mb-3">
        <label for="image-preview" class="form-label">Предпросмотр изображения:</label><br />
        <img v-if="item.image" :src="getImagePath(item.image)" alt="Изображение товара" class="img-fluid img-thumbnail" style="max-width: 200px;" />
        <span v-else>Изображение не указано</span>
      </div>

      <!-- Поле для указания имени файла изображения -->
      <div class="mb-3">
        <label for="image" class="form-label">Имя файла изображения (в папке /images):</label>
        <input type="text" id="image" v-model="item.image" class="form-control" placeholder="item.png" required />
        <small class="form-text text-muted">Укажите имя файла из папки /public/images (например, item.png).</small>
      </div>

      <!-- Название -->
      <div class="mb-3">
        <label for="name" class="form-label">Название:</label>
        <input type="text" id="name" v-model="item.name" class="form-control" required />
      </div>

      <!-- Описание -->
      <div class="mb-3">
        <label for="description" class="form-label">Описание:</label>
        <textarea id="description" v-model="item.description" class="form-control" rows="3" required></textarea>
      </div>

      <!-- Вес -->
      <div class="mb-3">
        <label for="weight" class="form-label">Вес (кг):</label>
        <input type="number" step="0.01" id="weight" v-model="item.weight" class="form-control" required />
      </div>

      <!-- Длина -->
      <div class="mb-3">
        <label for="length" class="form-label">Длина (см):</label>
        <input type="number" step="0.01" id="length" v-model="item.length" class="form-control" required />
      </div>

      <!-- Ширина -->
      <div class="mb-3">
        <label for="width" class="form-label">Ширина (см):</label>
        <input type="number" step="0.01" id="width" v-model="item.width" class="form-control" required />
      </div>

      <!-- Высота -->
      <div class="mb-3">
        <label for="height" class="form-label">Высота (см):</label>
        <input type="number" step="0.01" id="height" v-model="item.height" class="form-control" required />
      </div>

      <!-- Температура -->
      <div class="mb-3">
        <label for="temperature" class="form-label">Температура (°C):</label>
        <input type="number" id="temperature" v-model="item.temperature" class="form-control" required />
      </div>

      <!-- Завершен -->
      <div class="mb-3">
        <label for="isCompleted" class="form-label">Завершен:</label>
        <input type="checkbox" id="isCompleted" v-model="item.is_completed" class="form-check-input" />
      </div>

      <!-- Кнопки (вертикальное расположение) -->
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary w-100">Создать</button>
        <router-link to="/forgeshop" class="btn btn-secondary w-100">Назад</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ForgeShopCreateView',
  data() {
    return {
      item: {
        name: '', // Название
        image: '', // Имя файла изображения
        description: '', // Описание
        weight: null, // Вес
        length: null, // Длина
        width: null, // Ширина
        height: null, // Высота
        temperature: null, // Температура
        is_completed: false, // Завершен (исправлено)
      },
    };
  },
  methods: {
    getImagePath(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение
      return `/images/${imageName}`;
    },
    async createItem() {
      try {
        console.log('Отправляем данные:', this.item); // Отладочный вывод

        const response = await fetch('/api/forgeshop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.item),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Получаем детали ошибки
          throw new Error(errorData.message || 'Не удалось создать товар');
        }

        this.$router.push('/forgeshop'); // Перенаправление на список товаров
      } catch (error) {
        console.error('Ошибка при создании товара:', error.message);
      }
    },
  },
};
</script>