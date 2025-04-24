<template>
  <div class="container">
    <h1>Детали квартиры</h1>
    <div class="apartment-details">
      <!-- Изображение квартиры -->
      <div class="apartment-image-container">
        <img
          :src="getApartmentImage(apartment.photo_path)"
          alt="Фото квартиры"
          class="apartment-image"
        />
      </div>

      <!-- Данные квартиры -->
      <p><strong>Адрес:</strong> {{ apartment.address || 'Не указано' }}</p>
      <p><strong>Количество комнат:</strong> {{ apartment.rooms || 'Не указано' }}</p>
      <p><strong>Общая площадь (м²):</strong> {{ apartment.total_area || 'Не указано' }}</p>
      <p><strong>Этаж:</strong> {{ apartment.floor || 'Не указано' }}</p>
      <p><strong>Этажность дома:</strong> {{ apartment.floors_in_building || 'Не указано' }}</p>
      <p><strong>Цена (₽):</strong> {{ apartment.price || 'Не указано' }}</p>
      <p><strong>Тип ремонта:</strong> {{ apartment.renovation_type || 'Не указано' }}</p>
      <p><strong>Описание:</strong> {{ apartment.description || 'Нет описания' }}</p>
    </div>

    <!-- Кнопка "Назад" -->
    <router-link to="/apartments" class="btn-back">Назад</router-link>
  </div>
</template>

<script>
export default {
  name: 'ApartmentDetailsView',
  data() {
    return {
      apartment: {}, // Данные квартиры
    };
  },
  async created() {
    await this.fetchApartment();
  },
  methods: {
    async fetchApartment() {
      try {
        console.log(`Загружаем данные квартиры с ID: ${this.$route.params.id}`); // Отладочный вывод
        const response = await fetch(`/api/apartments/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные квартиры');
        this.apartment = await response.json();
        console.log('Полученные данные:', this.apartment); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке данных квартиры:', error.message);
      }
    },
    getApartmentImage(imageName) {
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
