<template>
  <div class="container">
    <h1>Детали клиента</h1>
    <div class="customer-details">
      <!-- Изображение клиента -->
      <div class="customer-image-container">
        <img
          :src="getClientImage(client.photo_path)"
          alt="Фото клиента"
          class="customer-image"
        />
      </div>

      <!-- Данные клиента -->
      <p><strong>Имя:</strong> {{ client.first_name || 'Не указано' }}</p>
      <p><strong>Фамилия:</strong> {{ client.last_name || 'Не указано' }}</p>
      <p><strong>Email:</strong> {{ client.email || 'Не указано' }}</p>
      <p><strong>Телефон:</strong> {{ client.phone_number || 'Не указано' }}</p>
      <p><strong>Адрес:</strong> {{ client.address || 'Не указано' }}</p>
      <p><strong>Возраст:</strong> {{ client.age || 'Не указано' }}</p>
      <p><strong>Профессия:</strong> {{ client.profession || 'Не указано' }}</p>
      <p><strong>Описание:</strong> {{ client.description || 'Нет описания' }}</p>
    </div>
    <!-- Кнопка "Назад" -->
    <router-link to="/clients" class="btn-back">Назад</router-link>
  </div>
</template>

<script>
export default {
  name: 'DetailsView',
  data() {
    return {
      client: {}, // Данные клиента
    };
  },
  async created() {
    await this.fetchClient();
  },
  methods: {
    async fetchClient() {
      try {
        const response = await fetch(`/api/clients/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные клиента');
        this.client = await response.json();
        console.log('Данные клиента:', this.client); // Отладочный вывод
      } catch (error) {
        console.error(error.message);
      }
    },
    getClientImage(imageName) {
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
