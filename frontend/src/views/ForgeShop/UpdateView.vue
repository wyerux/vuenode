<template>
  <div class="container">
    <h1>Редактировать товар</h1>
    <form @submit.prevent="updateItem">
      <div class="form-group">
        <label for="name">Название:</label>
        <input type="text" id="name" v-model="item.name" required />
      </div>
      <div class="form-group">
        <label for="image">Изображение (имя файла):</label>
        <input type="text" id="image" v-model="item.image" placeholder="item.jpg" required />
      </div>
      <div class="form-group">
        <label for="description">Описание:</label>
        <textarea id="description" v-model="item.description" rows="4" required></textarea>
      </div>
      <div class="form-group">
        <label for="weight">Вес (кг):</label>
        <input type="number" step="0.01" id="weight" v-model="item.weight" required />
      </div>
      <div class="form-group">
        <label for="length">Длина (см):</label>
        <input type="number" step="0.01" id="length" v-model="item.length" required />
      </div>
      <div class="form-group">
        <label for="width">Ширина (см):</label>
        <input type="number" step="0.01" id="width" v-model="item.width" required />
      </div>
      <div class="form-group">
        <label for="height">Высота (см):</label>
        <input type="number" step="0.01" id="height" v-model="item.height" required />
      </div>
      <div class="form-group">
        <label for="temperature">Температура (°C):</label>
        <input type="number" id="temperature" v-model="item.temperature" required />
      </div>
      <div class="form-group">
        <label for="is_completed">Завершен:</label>
        <input type="checkbox" id="is_completed" v-model="item.is_completed" /> <!-- Исправлено: is_completed -->
      </div>
      <button type="submit" class="btn-update">Обновить</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ForgeShopUpdateView',
  data() {
    return {
      item: {
        name: '',
        image: '', // Только имя файла, например, "item.jpg"
        description: '',
        weight: null,
        length: null,
        width: null,
        height: null,
        temperature: null,
        is_completed: false, // Исправлено: is_completed
      },
    };
  },
  async created() {
    await this.fetchItem();
  },
  methods: {
    async fetchItem() {
      try {
        console.log(`Загружаем данные товара с ID: ${this.$route.params.id}`); // Отладочный вывод
        const response = await fetch(`/api/forgeshop/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!response.ok) throw new Error('Не удалось загрузить данные товара');
        this.item = await response.json();
        console.log('Полученные данные:', this.item); // Отладочный вывод
      } catch (error) {
        console.error('Ошибка при загрузке данных товара:', error.message);
      }
    },
    async updateItem() {
      try {
        console.log('Отправляем данные для обновления:', this.item); // Отладочный вывод
        const response = await fetch(`/api/forgeshop/${this.$route.params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(this.item),
        });
        if (!response.ok) throw new Error('Не удалось обновить товар');
        this.$router.push('/forgeshop');
      } catch (error) {
        console.error('Ошибка при обновлении товара:', error.message);
      }
    },
  },
};
</script>