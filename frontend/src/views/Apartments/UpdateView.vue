<template>
  <div class="container">
    <h1>Редактировать квартиру</h1>
    <form @submit.prevent="updateApartment">
      <!-- Адрес -->
      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" id="address" v-model="apartment.address" required />
      </div>

      <!-- Фото (имя файла) -->
      <div class="form-group">
        <label for="photo_path">Фото (имя файла):</label>
        <input type="text" id="photo_path" v-model="apartment.photo_path" placeholder="apartment.jpg" />
      </div>

      <!-- Количество комнат -->
      <div class="form-group">
        <label for="rooms">Количество комнат:</label>
        <input type="number" id="rooms" v-model="apartment.rooms" min="1" required />
      </div>

      <!-- Общая площадь -->
      <div class="form-group">
        <label for="total_area">Общая площадь (м²):</label>
        <input type="number" step="0.01" id="total_area" v-model="apartment.total_area" required />
      </div>

      <!-- Этаж -->
      <div class="form-group">
        <label for="floor">Этаж:</label>
        <input type="number" id="floor" v-model="apartment.floor" min="1" required />
      </div>

      <!-- Этажность дома -->
      <div class="form-group">
        <label for="floors_in_building">Этажность дома:</label>
        <input type="number" id="floors_in_building" v-model="apartment.floors_in_building" min="1" required />
      </div>

      <!-- Цена -->
      <div class="form-group">
        <label for="price">Цена (₽):</label>
        <input type="number" id="price" v-model="apartment.price" required />
      </div>

      <!-- Тип ремонта -->
      <div class="form-group">
        <label for="renovation_type">Тип ремонта:</label>
        <input type="text" id="renovation_type" v-model="apartment.renovation_type" placeholder="Косметический" />
      </div>

      <!-- Описание -->
      <div class="form-group">
        <label for="description">Описание:</label>
        <textarea id="description" v-model="apartment.description" rows="4"></textarea>
      </div>

      <!-- Кнопка "Обновить" -->
      <button type="submit" class="btn-update">Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ApartmentUpdateView',
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
  async created() {
    await this.fetchApartment();
  },
  methods: {
    async fetchApartment() {
      try {
        console.log(`Загружаем данные квартиры с ID: ${this.$route.params.id}`); // Отладочный вывод
        const response = await fetch(`/api/apartments/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные квартиры');
        this.apartment = await response.json();
        console.log('Полученные данные:', this.apartment); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке данных квартиры:', error.message);
      }
    },
    async updateApartment() {
      try {
        console.log('Отправляем данные для обновления:', this.apartment); // Отладочный вывод
        const response = await fetch(`/api/apartments/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.apartment),
        });
        if (!response.ok) throw new Error('Не удалось обновить квартиру');
        this.$router.push('/apartments'); // Перенаправление на список квартир
      } catch (error) {
        console.error('Ошибка при обновлении квартиры:', error.message);
      }
    },
  },
};
</script>
