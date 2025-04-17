<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <ul class="nav-links">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/contact">Контакты</router-link></li>

          <!-- Ссылки для неавторизованных пользователей -->
          <li v-if="!isAuthenticated">
            <router-link to="/login">Вход</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/register">Регистрация</router-link>
          </li>

          <!-- Для авторизованных пользователей -->
          <li v-if="isAuthenticated">
            <router-link to="/customers">Клиенты</router-link>
          </li>
          <li v-if="isAuthenticated">
            <router-link to="/forgeshop">Товары</router-link> <!-- Добавлена ссылка на ForgeShop -->
          </li>
          <li v-if="isAuthenticated">
            <span class="user-info">{{ username }}</span>
          </li>
          <li v-if="isAuthenticated">
            <button @click="logout" class="btn-logout">Выйти</button>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false,
      userRole: null,
      username: '', // Имя пользователя
    };
  },
  created() {
    // Проверяем токен при загрузке приложения
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      const username = localStorage.getItem('username'); // Получаем имя пользователя из localStorage

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
      // Удаляем токен, роль и имя пользователя из localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      this.isAuthenticated = false;
      this.userRole = null;
      this.username = ''; // Очищаем имя пользователя
      this.$router.push('/login'); // Перенаправляем на страницу входа
    },
  },
};
</script>
