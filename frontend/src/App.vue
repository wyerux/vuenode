<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <!-- Логотип -->
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <!-- Навигационные ссылки -->
        <ul class="nav-links">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/contact">Контакты</router-link></li>
          <li><router-link to="/clients">Клиенты</router-link></li>
          <li><router-link to="/apartments">Квартиры</router-link></li> <!-- Изменено с "Товары" на "Квартиры" -->

          <!-- Ссылки для неавторизованных пользователей -->
          <li v-if="!isAuthenticated">
            <router-link to="/login">Вход</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/register">Регистрация</router-link>
          </li>

          <!-- Блок для авторизованных пользователей -->
          <li v-if="isAuthenticated">
            <span class="user-info">Привет, {{ username }}!</span>
            <button @click="logout" class="btn-logout">Выйти</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Основной контент -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false, // Флаг авторизации
      userRole: null, // Роль пользователя (например, admin или user)
      username: '', // Имя пользователя
    };
  },
  created() {
    // Проверяем авторизацию при загрузке приложения
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const username = localStorage.getItem('username');

      if (token && role && username) {
        this.isAuthenticated = true;
        this.userRole = role;
        this.username = username; // Устанавливаем имя пользователя
      } else {
        this.isAuthenticated = false;
        this.userRole = null;
        this.username = ''; // Очищаем имя пользователя
      }
    },
    logout() {
      // Удаляем данные из localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');

      // Сбрасываем состояние
      this.isAuthenticated = false;
      this.userRole = null;
      this.username = '';

      // Перенаправляем на страницу входа
      this.$router.push('/login').catch(() => {}); // Добавлен `.catch()` для игнорирования ошибок навигации
    },
  },
};
</script>
