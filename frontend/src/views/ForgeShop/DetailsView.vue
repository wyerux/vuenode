<template>
  <div class="container">
    <h1>Детали товара</h1>
    <div class="item-details">
      <!-- Изображение товара -->
      <div class="item-image-container">
        <img
          :src="getItemImage(item.image)"
          alt="Изображение товара"
          class="item-image"
        />
      </div>

      <!-- Данные товара -->
      <p><strong>Название:</strong> {{ item.name || 'Не указано' }}</p>
      <p><strong>Описание:</strong> {{ item.description || 'Не указано' }}</p>
      <p><strong>Вес (кг):</strong> {{ item.weight || 'Не указано' }}</p>
      <p><strong>Длина (см):</strong> {{ item.length || 'Не указано' }}</p>
      <p><strong>Ширина (см):</strong> {{ item.width || 'Не указано' }}</p>
      <p><strong>Высота (см):</strong> {{ item.height || 'Не указано' }}</p>
      <p><strong>Температура (°C):</strong> {{ item.temperature || 'Не указано' }}</p>
      <p><strong>Завершен:</strong> {{ item.is_completed ? 'Да' : 'Нет' }}</p> <!-- Исправлено: is_completed -->
    </div>

    <!-- Кнопка "Назад" -->
    <router-link to="/forgeshop" class="btn-back">Назад</router-link>
  </div>
</template>

<script>
export default {
  name: 'ForgeShopDetailsView',
  data() {
    return {
      item: {}, // Данные товара
    };
  },
  async created() {
    await this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        console.log(`Загружаем данные товара с ID: ${this.$route.params.id}`); // Отладочный вывод
        const response = await fetch(`/api/forgeshop/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные товара');
        this.item = await response.json();
        console.log('Полученные данные:', this.item); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке данных товара:', error.message);
      }
    },
    getItemImage(imageName) {
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