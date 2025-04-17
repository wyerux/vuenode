<template>
  <div class="container">
    <h1>Кузнечные изделия</h1>

    <!-- Кнопка "Создать новый товар" -->
    <div v-if="isAdmin">
      <router-link to="/forgeshop/create" class="btn-create">Добавить новый товар</router-link>
    </div>

    <!-- Таблица с данными -->
    <table class="table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Изображение</th>
          <th>Описание</th>
          <th>Вес (кг)</th>
          <th>Длина (см)</th>
          <th>Ширина (см)</th>
          <th>Высота (см)</th>
          <th>Температура (°C)</th>
          <th>Завершен</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td>{{ item.name }}</td> <!-- Исправлено: name вместо Name -->
          <td>
            <img
              v-if="item.image"
              :src="getItemImage(item.image)"
              alt="Изображение товара"
              class="item-image"
            />
            <span v-else>Нет изображения</span>
          </td>
          <td>{{ item.description || 'Нет данных' }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.length }}</td>
          <td>{{ item.width }}</td>
          <td>{{ item.height }}</td>
          <td>{{ item.temperature }}</td>
          <td>{{ item.is_completed ? 'Да' : 'Нет' }}</td> <!-- Исправлено: is_completed -->
          <td>
            <router-link :to="`/forgeshop/${item.id}`">Подробности</router-link>
            <span v-if="isAdmin">
              |
              <router-link :to="`/forgeshop/${item.id}/edit`">Редактировать</router-link>
              |
              <button @click="deleteItem(item.id)" class="btn-delete">Удалить</button>
            </span>
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
  name: 'ForgeShopIndexView',
  data() {
    return {
      items: [], // Все товары
      paginatedItems: [], // Товары для текущей страницы
      currentPage: 1, // Текущая страница
      pageSize: 10, // Количество записей на странице
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.pageSize);
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
      // Проверяем, является ли роль пользователя "admin"
      const userRole = localStorage.getItem('role'); // Получаем роль из localStorage
      return userRole === 'admin';
    },
  },
  async created() {
    await this.fetchItems();
    this.updatePaginatedItems();
  },
  methods: {
    async fetchItems() {
      try {
        console.log('Загружаем товары...'); // Отладочный вывод
        const response = await fetch('http://localhost:5000/api/forgeshop', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить товары');
        this.items = await response.json();
        console.log('Полученные данные:', this.items); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке товаров:', error.message);
      }
    },
    updatePaginatedItems() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedItems = this.items.slice(start, end);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedItems();
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedItems();
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedItems();
      }
    },
    async deleteItem(id) {
      try {
        console.log(`Удаляем товар с ID: ${id}`); // Отладочный вывод
        const response = await fetch(`http://localhost:5000/api/forgeshop/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось удалить товар');
        this.items = this.items.filter((item) => item.id !== id);
        this.updatePaginatedItems();
      } catch (error) {
        console.error('Ошибка при удалении товара:', error.message);
      }
    },
    getItemImage(imageName) {
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
  },
};
</script>