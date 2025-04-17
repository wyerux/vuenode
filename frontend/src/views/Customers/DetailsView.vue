<template>
  <div class="container">
    <h1>Детали клиента</h1>
    <div class="customer-details">
      <!-- Изображение клиента -->
      <div class="customer-image-container">
        <img
          :src="getCustomerImage(customer.image)"
          alt="Фото клиента"
          class="customer-image"
        />
      </div>

      <!-- Данные клиента -->
      <p><strong>ФИО:</strong> {{ customer.full_name || 'Не указано' }}</p>
      <p><strong>Email:</strong> {{ customer.email || 'Не указано' }}</p>
      <p><strong>Телефон:</strong> {{ customer.phone || 'Не указано' }}</p>
      <p><strong>Адрес:</strong> {{ customer.address || 'Не указано' }}</p>
      <p><strong>Компания:</strong> {{ customer.company || 'Не указано' }}</p>
      <p><strong>Должность:</strong> {{ customer.position || 'Не указано' }}</p>
      <p><strong>Дата рождения:</strong> {{ formatDate(customer.birthdate) }}</p>
      <p><strong>Постоянный клиент:</strong> {{ customer.is_regular ? 'Да' : 'Нет' }}</p>
      <p><strong>Заметки:</strong> {{ customer.notes || 'Нет заметок' }}</p>
    </div>
    <!-- Кнопка "Назад" -->
    <router-link to="/customers" class="btn-back">Назад</router-link>
  </div>
</template>

<script>
export default {
  name: 'DetailsView',
  data() {
    return {
      customer: {}, // Данные клиента
    };
  },
  async created() {
    await this.fetchCustomer();
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await fetch(`http://localhost:5000/api/customers/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные клиента');
        this.customer = await response.json();
        console.log('Данные клиента:', this.customer); // Отладочный вывод
      } catch (error) {
        console.error(error.message);
      }
    },
    formatDate(date) {
      if (!date) return 'Не указано';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    },
    getCustomerImage(imageName) {
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
