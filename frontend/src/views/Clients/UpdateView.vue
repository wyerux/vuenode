<template>
  <div class="container">
    <h1>Редактировать клиента</h1>
    <form @submit.prevent="updateClient">
      <!-- Имя -->
      <div class="form-group">
        <label for="first_name">Имя:</label>
        <input type="text" id="first_name" v-model="client.first_name" required />
      </div>

      <!-- Фамилия -->
      <div class="form-group">
        <label for="last_name">Фамилия:</label>
        <input type="text" id="last_name" v-model="client.last_name" required />
      </div>

      <!-- Телефон -->
      <div class="form-group">
        <label for="phone_number">Телефон:</label>
        <input type="text" id="phone_number" v-model="client.phone_number" required />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="client.email" required />
      </div>

      <!-- Адрес -->
      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" id="address" v-model="client.address" />
      </div>

      <!-- Возраст -->
      <div class="form-group">
        <label for="age">Возраст:</label>
        <input type="number" id="age" v-model="client.age" min="1" required />
      </div>

      <!-- Профессия -->
      <div class="form-group">
        <label for="profession">Профессия:</label>
        <input type="text" id="profession" v-model="client.profession" />
      </div>

      <!-- Описание -->
      <div class="form-group">
        <label for="description">Описание:</label>
        <textarea id="description" v-model="client.description" rows="4"></textarea>
      </div>

      <!-- Фото (имя файла) -->
      <div class="form-group">
        <label for="photo_path">Фото (имя файла):</label>
        <input type="text" id="photo_path" v-model="client.photo_path" placeholder="image.jpg" />
      </div>

      <!-- Кнопка "Обновить" -->
      <button type="submit" class="btn-update">Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateView',
  data() {
    return {
      client: {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        address: '',
        age: null,
        profession: '',
        description: '',
        photo_path: '', // Только имя файла, например, "image.jpg"
      },
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
      } catch (error) {
        console.error(error.message);
      }
    },
    async updateClient() {
      try {
        const response = await fetch(`/api/clients/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.client),
        });
        if (!response.ok) throw new Error('Не удалось обновить клиента');
        this.$router.push('/clients'); // Перенаправление на список клиентов
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
