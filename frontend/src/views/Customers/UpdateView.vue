<template>
  <div class="container">
    <h1>Редактировать клиента</h1>
    <form @submit.prevent="updateCustomer">
      <div class="form-group">
        <label for="full_name">ФИО:</label>
        <input type="text" id="full_name" v-model="customer.full_name" required />
      </div>
      <div class="form-group">
        <label for="image">Фото (имя файла):</label>
        <input type="text" id="image" v-model="customer.image" placeholder="image.jpg" required />
      </div>
      <div class="form-group">
        <label for="phone">Телефон:</label>
        <input type="text" id="phone" v-model="customer.phone" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="customer.email" required />
      </div>
      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" id="address" v-model="customer.address" required />
      </div>
      <div class="form-group">
        <label for="company">Компания:</label>
        <input type="text" id="company" v-model="customer.company" required />
      </div>
      <div class="form-group">
        <label for="position">Должность:</label>
        <input type="text" id="position" v-model="customer.position" required />
      </div>
      <div class="form-group">
        <label for="birthdate">Дата рождения:</label>
        <input type="date" id="birthdate" v-model="customer.birthdate" />
      </div>
      <div class="form-group">
        <label for="is_regular">Постоянный клиент:</label>
        <input type="checkbox" id="is_regular" v-model="customer.is_regular" />
      </div>
      <div class="form-group">
        <label for="notes">Заметки:</label>
        <textarea id="notes" v-model="customer.notes" rows="4"></textarea>
      </div>
      <button type="submit" class="btn-update">Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UpdateView',
  data() {
    return {
      customer: {
        full_name: '',
        image: '', // Только имя файла, например, "image.jpg"
        phone: '',
        email: '',
        address: '',
        company: '',
        position: '',
        birthdate: null,
        is_regular: false,
        notes: '',
      },
    };
  },
  async created() {
    await this.fetchCustomer();
  },
  methods: {
    async fetchCustomer() {
      try {
        const response = await fetch(`/api/customers/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Failed to fetch customer');
        this.customer = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    async updateCustomer() {
      try {
        const response = await fetch(`/api/customers/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.customer),
        });
        if (!response.ok) throw new Error('Failed to update customer');
        this.$router.push('/customers');
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>