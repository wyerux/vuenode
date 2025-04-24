<template>
  <div class="container">
    <h1>Квартиры</h1>

    <!-- Кнопка "Создать новую квартиру" (доступна только администраторам) -->
    <div v-if="isAdmin">
      <router-link to="/apartments/create" class="btn-create">Добавить новую квартиру</router-link>
    </div>

    <!-- Таблица с данными -->
    <table class="table">
      <thead>
        <tr>
          <th>Адрес</th>
          <th>Фото</th>
          <th>Количество комнат</th>
          <th>Общая площадь (м²)</th>
          <th>Этаж</th>
          <th>Этажность дома</th>
          <th>Цена (₽)</th>
          <th>Тип ремонта</th>
          <th>Описание</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="apartment in paginatedApartments" :key="apartment.id">
          <td>{{ apartment.address }}</td>
          <td>
            <img
              v-if="apartment.photo_path"
              :src="getApartmentImage(apartment.photo_path)"
              alt="Фото квартиры"
              class="apartment-image"
            />
            <span v-else>Нет фото</span>
          </td>
          <td>{{ apartment.rooms }}</td>
          <td>{{ apartment.total_area }}</td>
          <td>{{ apartment.floor }}</td>
          <td>{{ apartment.floors_in_building }}</td>
          <td>{{ apartment.price }}</td>
          <td>{{ apartment.renovation_type }}</td>
          <td>{{ apartment.description || 'Нет данных' }}</td>
          <td>
            <router-link :to="`/apartments/${apartment.id}`">Подробности</router-link>
            |
            <router-link v-if="isAdmin" :to="`/apartments/${apartment.id}/edit`">Редактировать</router-link>
            |
            <button v-if="isAdmin" @click="deleteApartment(apartment.id)" class="btn-delete">Удалить</button>
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
  name: 'ApartmentsIndexView',
  data() {
    return {
      apartments: [], // Все квартиры
      paginatedApartments: [], // Квартиры для текущей страницы
      currentPage: 1, // Текущая страница
      pageSize: 10, // Количество записей на странице
      userRole: null, // Роль текущего пользователя
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.apartments.length / this.pageSize);
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
    await this.fetchApartments();
    this.updatePaginatedApartments();
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
    async fetchApartments() {
      try {
        console.log('Загружаем квартиры...'); // Отладочный вывод
        const response = await fetch('/api/apartments');
        if (!response.ok) throw new Error('Не удалось загрузить квартиры');
        this.apartments = await response.json();
        console.log('Полученные данные:', this.apartments); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке квартир:', error.message);
      }
    },
    updatePaginatedApartments() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedApartments = this.apartments.slice(start, end);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedApartments();
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedApartments();
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedApartments();
      }
    },
    getApartmentImage(imageName) {
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
    async deleteApartment(id) {
      try {
        const response = await fetch(`/api/apartments/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Не удалось удалить квартиру');
        this.apartments = this.apartments.filter((apartment) => apartment.id !== id);
        this.updatePaginatedApartments();
      } catch (error) {
        console.error('Ошибка при удалении квартиры:', error.message);
      }
    },
  },
};
</script>
