<template>
  <div class="container">
    <h1>Создание клиента</h1>

    <!-- Форма создания клиента -->
    <form @submit.prevent="createCustomer" class="vertical-form">
      <!-- Предпросмотр изображения -->
      <div class="mb-3">
        <label for="image-preview" class="form-label">Предпросмотр изображения:</label><br />
        <img v-if="customer.image" :src="getImagePath(customer.image)" alt="Изображение клиента" class="img-fluid img-thumbnail" style="max-width: 200px;" />
        <span v-else>Изображение не указано</span>
      </div>

      <!-- Поле для указания имени файла изображения -->
      <div class="mb-3">
        <label for="image" class="form-label">Имя файла изображения (в папке /images):</label>
        <input type="text" id="image" v-model="customer.image" class="form-control" placeholder="cus.png" />
        <small class="form-text text-muted">Укажите имя файла из папки /public/images (например, cus.png).</small>
      </div>

      <!-- ФИО -->
      <div class="mb-3">
        <label for="fullname" class="form-label">ФИО:</label>
        <input type="text" id="fullname" v-model="customer.full_name" class="form-control" required />
      </div>

      <!-- Телефон -->
      <div class="mb-3">
        <label for="phone" class="form-label">Телефон:</label>
        <input type="text" id="phone" v-model="customer.phone" class="form-control" required />
      </div>

      <!-- Email -->
      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" id="email" v-model="customer.email" class="form-control" />
      </div>

      <!-- Адрес -->
      <div class="mb-3">
        <label for="address" class="form-label">Адрес:</label>
        <input type="text" id="address" v-model="customer.address" class="form-control" />
      </div>

      <!-- Компания -->
      <div class="mb-3">
        <label for="company" class="form-label">Компания:</label>
        <input type="text" id="company" v-model="customer.company" class="form-control" />
      </div>

      <!-- Должность -->
      <div class="mb-3">
        <label for="position" class="form-label">Должность:</label>
        <input type="text" id="position" v-model="customer.position" class="form-control" />
      </div>

      <!-- Дата рождения -->
      <div class="mb-3">
        <label for="birthdate" class="form-label">Дата рождения:</label>
        <input type="date" id="birthdate" v-model="customer.birthdate" class="form-control" />
      </div>

      <!-- Постоянный клиент -->
      <div class="mb-3">
        <label for="isregular" class="form-label">Постоянный клиент:</label>
        <input type="checkbox" id="isregular" v-model="customer.is_regular" class="form-check-input" />
      </div>

      <!-- Примечания -->
      <div class="mb-3">
        <label for="notes" class="form-label">Примечания:</label>
        <textarea id="notes" v-model="customer.notes" class="form-control"></textarea>
      </div>

      <!-- Кнопки (вертикальное расположение) -->
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary w-100">Создать</button>
        <router-link to="/customers" class="btn btn-secondary w-100">Назад</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateView',
  data() {
    return {
      customer: {
        full_name: '', // ФИО
        image: '', // Имя файла изображения
        phone: '', // Телефон
        email: '', // Email
        address: '', // Адрес
        company: '', // Компания
        position: '', // Должность
        birthdate: null, // Дата рождения
        is_regular: false, // Постоянный клиент
        notes: '', // Примечания
      },
    };
  },
  methods: {
    getImagePath(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение
      return `/images/${imageName}`;
    },
    async createCustomer() {
      try {
        const response = await fetch('/api/customers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.customer),
        });

        if (!response.ok) throw new Error('Не удалось создать клиента');
        this.$router.push('/customers'); // Перенаправление на список клиентов
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px; /* Ограничение ширины формы */
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #ff7200;
}

.form-label {
  font-weight: bold;
}

.btn-primary {
  background-color: #ff7200;
  border: none;
}

.btn-primary:hover {
  background-color: #e66600;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>