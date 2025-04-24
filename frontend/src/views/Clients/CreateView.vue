<template>
  <div class="container">
    <h1>Создание клиента</h1>

    <!-- Форма создания клиента -->
    <form @submit.prevent="createClient" class="vertical-form">
      <!-- Предпросмотр изображения -->
      <div class="mb-3">
        <label for="image-preview" class="form-label">Предпросмотр изображения:</label><br />
        <img v-if="client.photo_path" :src="getImagePath(client.photo_path)" alt="Фото клиента" class="img-fluid img-thumbnail" style="max-width: 200px;" />
        <span v-else>Изображение не указано</span>
      </div>

      <!-- Поле для указания имени файла изображения -->
      <div class="mb-3">
        <label for="photo_path" class="form-label">Имя файла изображения (в папке /images):</label>
        <input type="text" id="photo_path" v-model="client.photo_path" class="form-control" placeholder="client.png" />
        <small class="form-text text-muted">Укажите имя файла из папки /public/images (например, client.png).</small>
      </div>

      <!-- Имя -->
      <div class="mb-3">
        <label for="first_name" class="form-label">Имя:</label>
        <input type="text" id="first_name" v-model="client.first_name" class="form-control" required />
      </div>

      <!-- Фамилия -->
      <div class="mb-3">
        <label for="last_name" class="form-label">Фамилия:</label>
        <input type="text" id="last_name" v-model="client.last_name" class="form-control" required />
      </div>

      <!-- Телефон -->
      <div class="mb-3">
        <label for="phone_number" class="form-label">Телефон:</label>
        <input type="text" id="phone_number" v-model="client.phone_number" class="form-control" required />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="client.email" class="form-control" />
      </div>

      <!-- Адрес -->
      <div class="mb-3">
        <label for="address" class="form-label">Адрес:</label>
        <input type="text" id="address" v-model="client.address" class="form-control" />
      </div>

      <!-- Возраст -->
      <div class="mb-3">
        <label for="age" class="form-label">Возраст:</label>
        <input type="number" id="age" v-model="client.age" class="form-control" min="1" required />
      </div>

      <!-- Профессия -->
      <div class="mb-3">
        <label for="profession" class="form-label">Профессия:</label>
        <input type="text" id="profession" v-model="client.profession" class="form-control" />
      </div>

      <!-- Описание -->
      <div class="mb-3">
        <label for="description" class="form-label">Описание:</label>
        <textarea id="description" v-model="client.description" class="form-control"></textarea>
      </div>

      <!-- Кнопки (вертикальное расположение) -->
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary w-100">Создать</button>
        <router-link to="/clients" class="btn btn-secondary w-100">Назад</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateView',
  data() {
    return {
      client: {
        first_name: '', // Имя
        last_name: '', // Фамилия
        phone_number: '', // Телефон
        email: '', // Email
        address: '', // Адрес
        age: null, // Возраст
        profession: '', // Профессия
        description: '', // Описание
        photo_path: '', // Путь к фото
      },
    };
  },
  methods: {
    getImagePath(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение
      return `/images/${imageName}`;
    },
    async createClient() {
      try {
        const response = await fetch('/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.client),
        });

        if (!response.ok) throw new Error('Не удалось создать клиента');
        this.$router.push('/clients'); // Перенаправление на список клиентов
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
