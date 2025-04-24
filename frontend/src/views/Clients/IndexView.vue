<template>
  <div class="container">
    <h1>Клиенты</h1>

    <!-- Кнопка "Создать нового клиента" (доступна только администраторам) -->
    <div v-if="isAdmin">
      <router-link to="/clients/create" class="btn-create">Создать нового клиента</router-link>
    </div>

    <!-- Таблица с данными -->
    <table class="table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Телефон</th>
          <th>Email</th>
          <th>Адрес</th>
          <th>Возраст</th>
          <th>Описание</th>
          <th>Фото</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in paginatedClients" :key="client.id">
          <td>{{ client.first_name }}</td>
          <td>{{ client.last_name }}</td>
          <td>{{ client.phone_number }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.address || 'Нет данных' }}</td>
          <td>{{ client.age }}</td>
          <td>{{ client.description || 'Нет данных' }}</td>
          <td>
            <img
              v-if="client.photo_path"
              :src="getClientImage(client.photo_path)"
              alt="Фото клиента"
              class="client-image"
            />
            <span v-else>Нет фото</span>
          </td>
          <td>
            <router-link :to="`/clients/${client.id}`">Подробности</router-link>
            |
            <router-link v-if="isAdmin" :to="`/clients/${client.id}/edit`">Редактировать</router-link>
            |
            <button v-if="isAdmin" @click="deleteClient(client.id)" class="btn-delete">Удалить</button>
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
      clients: [], // Все клиенты
      paginatedClients: [], // Клиенты для текущей страницы
      currentPage: 1, // Текущая страница
      pageSize: 10, // Количество записей на странице
      userRole: null, // Роль текущего пользователя
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.clients.length / this.pageSize);
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
    await this.fetchClients();
    this.updatePaginatedClients();
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
    async fetchClients() {
      try {
        const response = await fetch('/api/clients');
        if (!response.ok) throw new Error('Не удалось загрузить клиентов');
        this.clients = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    updatePaginatedClients() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedClients = this.clients.slice(start, end);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedClients();
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedClients();
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedClients();
      }
    },
    getClientImage(imageName) {
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
    async deleteClient(id) {
      try {
        const response = await fetch(`/api/clients/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Не удалось удалить клиента');
        this.clients = this.clients.filter((c) => c.id !== id);
        this.updatePaginatedClients();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

