<template>
  <div class="container">
    <h1>Автомобили</h1>

    <!-- Кнопка "Создать новый автомобиль" (доступна только администраторам) -->
    <div v-if="isAdmin">
      <router-link to="/cars/create" class="btn-create">Добавить новый автомобиль</router-link>
    </div>

    <!-- Таблица с данными -->
    <table class="table">
      <thead>
        <tr>
          <th>Марка</th>
          <th>Модель</th>
          <th>Год выпуска</th>
          <th>Цена (₽)</th>
          <th>Пробег (км)</th>
          <th>Тип двигателя</th>
          <th>Коробка передач</th>
          <th>Описание</th>
          <th>Фото</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="car in paginatedCars" :key="car.id">
          <td>{{ car.brand }}</td>
          <td>{{ car.model }}</td>
          <td>{{ car.year }}</td>
          <td>{{ car.price }}</td>
          <td>{{ car.mileage }}</td>
          <td>{{ car.engine_type }}</td>
          <td>{{ car.transmission }}</td>
          <td>{{ car.description || 'Нет данных' }}</td>
          <td>
            <img
              v-if="car.photo_path"
              :src="getCarImage(car.photo_path)"
              alt="Фото автомобиля"
              class="car-image"
            />
            <span v-else>Нет фото</span>
          </td>
          <td>
            <router-link :to="`/cars/${car.id}`">Подробности</router-link>
            |
            <router-link v-if="isAdmin" :to="`/cars/${car.id}/edit`">Редактировать</router-link>
            |
            <button v-if="isAdmin" @click="deleteCar(car.id)" class="btn-delete">Удалить</button>
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
  name: 'CarsIndexView',
  data() {
    return {
      cars: [], // Все автомобили
      paginatedCars: [], // Автомобили для текущей страницы
      currentPage: 1, // Текущая страница
      pageSize: 10, // Количество записей на странице
      userRole: null, // Роль текущего пользователя
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.cars.length / this.pageSize);
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
    await this.fetchCars();
    this.updatePaginatedCars();
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
    async fetchCars() {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) throw new Error('Не удалось загрузить автомобили');
        this.cars = await response.json();
      } catch (error) {
        console.error(error.message);
      }
    },
    updatePaginatedCars() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedCars = this.cars.slice(start, end);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.updatePaginatedCars();
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedCars();
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePaginatedCars();
      }
    },
    getCarImage(imageName) {
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
    async deleteCar(id) {
      try {
        const response = await fetch(`/api/cars/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Не удалось удалить автомобиль');
        this.cars = this.cars.filter((car) => car.id !== id);
        this.updatePaginatedCars();
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>
