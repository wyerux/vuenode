<template>
  <div class="container">
    <h1>Создание квартиры</h1>

    <!-- Форма создания квартиры -->
    <form @submit.prevent="createApartment" class="vertical-form">
      <!-- Предпросмотр изображения -->
      <div class="mb-3">
        <label for="image-preview" class="form-label">Предпросмотр изображения:</label><br />
        <img v-if="apartment.photo_path" :src="getImagePath(apartment.photo_path)" alt="Фото квартиры" class="img-fluid img-thumbnail" style="max-width: 200px;" />
        <span v-else>Изображение не указано</span>
      </div>

      <!-- Поле для указания имени файла изображения -->
      <div class="mb-3">
        <label for="photo_path" class="form-label">Имя файла изображения (в папке /images):</label>
        <input type="text" id="photo_path" v-model="apartment.photo_path" class="form-control" placeholder="apartment.png" />
        <small class="form-text text-muted">Укажите имя файла из папки /public/images (например, apartment.png).</small>
      </div>

      <!-- Адрес -->
      <div class="mb-3">
        <label for="address" class="form-label">Адрес:</label>
        <input type="text" id="address" v-model="apartment.address" class="form-control" required />
      </div>

      <!-- Количество комнат -->
      <div class="mb-3">
        <label for="rooms" class="form-label">Количество комнат:</label>
        <input type="number" id="rooms" v-model="apartment.rooms" class="form-control" min="1" required />
      </div>

      <!-- Общая площадь -->
      <div class="mb-3">
        <label for="total_area" class="form-label">Общая площадь (м²):</label>
        <input type="number" step="0.01" id="total_area" v-model="apartment.total_area" class="form-control" required />
      </div>

      <!-- Этаж -->
      <div class="mb-3">
        <label for="floor" class="form-label">Этаж:</label>
        <input type="number" id="floor" v-model="apartment.floor" class="form-control" min="1" required />
      </div>

      <!-- Этажность дома -->
      <div class="mb-3">
        <label for="floors_in_building" class="form-label">Этажность дома:</label>
        <input type="number" id="floors_in_building" v-model="apartment.floors_in_building" class="form-control" min="1" required />
      </div>

      <!-- Цена -->
      <div class="mb-3">
        <label for="price" class="form-label">Цена (₽):</label>
        <input type="number" id="price" v-model="apartment.price" class="form-control" required />
      </div>

      <!-- Тип ремонта -->
      <div class="mb-3">
        <label for="renovation_type" class="form-label">Тип ремонта:</label>
        <input type="text" id="renovation_type" v-model="apartment.renovation_type" class="form-control" placeholder="Косметический" required />
      </div>

      <!-- Описание -->
      <div class="mb-3">
        <label for="description" class="form-label">Описание:</label>
        <textarea id="description" v-model="apartment.description" class="form-control" rows="3"></textarea>
      </div>

      <!-- Кнопки (вертикальное расположение) -->
      <div class="d-flex flex-column gap-2">
        <button type="submit" class="btn btn-primary w-100">Создать</button>
        <router-link to="/apartments" class="btn btn-secondary w-100">Назад</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ApartmentCreateView',
  data() {
    return {
      apartment: {
        address: '', // Адрес
        photo_path: '', // Имя файла изображения
        rooms: null, // Количество комнат
        total_area: null, // Общая площадь
        floor: null, // Этаж
        floors_in_building: null, // Этажность дома
        price: null, // Цена
        renovation_type: '', // Тип ремонта
        description: '', // Описание
      },
    };
  },
  methods: {
    getImagePath(imageName) {
      if (!imageName) return '/images/placeholder.jpg'; // Запасное изображение
      return `/images/${imageName}`;
    },
    async createApartment() {
      try {
        console.log('Отправляем данные:', this.apartment); // Отладочный вывод

        const response = await fetch('/api/apartments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.apartment),
        });

        if (!response.ok) {
          const errorData = await response.json(); // Получаем детали ошибки
          throw new Error(errorData.message || 'Не удалось создать квартиру');
        }

        this.$router.push('/apartments'); // Перенаправление на список квартир
      } catch (error) {
        console.error('Ошибка при создании квартиры:', error.message);
      }
    },
  },
};
</script>

