<template>
  <div class="container">
    <h1>Клиенты</h1>

    <!-- Кнопка "Создать нового клиента" (доступна только администраторам) -->
    <div v-if="isAdmin">
      <router-link to="/customers/create" class="btn-create">Создать нового клиента</router-link>
    </div>

    <!-- Таблица с данными -->
    <table class="table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Изображение</th>
          <th>Телефон</th>
          <th>Email</th>
          <th>Адрес</th>
          <th>Дата рождения</th>
          <th>Постоянный клиент</th>
          <th>Примечания</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in paginatedCustomers" :key="customer.id">
          <td>{{ customer.full_name }}</td>
          <td>
            <img
              v-if="customer.image"
              :src="getCustomerImage(customer.image)"
              alt="Изображение клиента"
              class="customer-image"
            />
            <span v-else>Нет изображения</span>
          </td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ formatDate(customer.birthdate) }}</td>
          <td>{{ customer.is_regular ? 'Да' : 'Нет' }}</td>
          <td>{{ customer.notes || 'Нет данных' }}</td>
          <td>
            <router-link :to="`/customers/${customer.id}`">Подробности</router-link>
            |
            <router-link v-if="isAdmin" :to="`/customers/${customer.id}/edit`">Редактировать</router-link>
            |
            <button v-if="isAdmin" @click="deleteCustomer(customer.id)" class="btn-delete">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Пагинация -->
    <div class="pagination-container">
      <ul class="pagination">
        <li v-if="currentPage > 1">
          <a href="#" @click.prevent="goToPreviousPage" class="page-link">
            <i class="fa-solid fa-arrow-left"></i> Назад
          </a>
        </li>

        <li v-for="page in visiblePages" :key="page">
          <a
            href="#"
            @click.prevent="goToPage(page)"
            :class="['page-link', { active: page === currentPage }]"
          >
            {{ page }}
          </a>
        </li>

        <li v-if="currentPage < totalPages">
          <a href="#" @click.prevent="goToNextPage" class="page-link">
            Вперед <i class="fa-solid fa-arrow-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexView',
  data() {
    return {
      customers: [], // Все клиенты
      paginatedCustomers: [], // Клиенты для текущей страницы
      currentPage: 1, // Текущая страница
      pageSize: 10, // Количество записей на странице
      userRole: null, // Роль текущего пользователя
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.customers.length / this.pageSize);
    },
    visiblePages() {
      const start = Math.max(1, this.currentPage - 5);
      const end = Math.min(this.totalPages, this.currentPage + 5);
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    isAdmin() {
      return this.userRole === 'admin'; // Проверяем, является ли пользователь администратором
    },
  },
  async created() {
    await this.checkAuth(); // Проверяем авторизацию
    await this.fetchCustomers();
    this.updatePaginatedCustomers();
  },
  methods: {
    checkAuth() {
      const role = localStorage.getItem('role'); // Получаем роль из localStorage
      if (role) {
        this.userRole = role; // Устанавливаем роль пользователя
      } else {
        this.userRole = null; // Если роль отсутствует, пользователь не авторизован
      }
    },
    async fetchCustomers() {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) throw new Error('Не удалось загрузить клиентов');
        this.customers = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    updatePaginatedCustomers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedCustomers = this.customers.slice(start, end);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedCustomers();
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedCustomers();
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedCustomers();
      }
    },
    getCustomerImage(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение
      const supportedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      const fileExtension = imageName.split('.').pop().toLowerCase();
      if (supportedExtensions.includes(fileExtension)) {
        return `/images/${imageName}`;
      } else {
        console.warn(`Unsupported image format: ${fileExtension}`);
        return '/images/placeholder.jpg';
      }
    },
    formatDate(date) {
      if (!date) return 'Нет данных';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('ru-RU', options);
    },
    async deleteCustomer(id) {
      try {
        const response = await fetch(`/api/customers/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Не удалось удалить клиента');
        this.customers = this.customers.filter((c) => c.id !== id);
        this.updatePaginatedCustomers();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>