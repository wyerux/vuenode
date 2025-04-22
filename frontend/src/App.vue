<template>
  <div id="app">
    <nav class="navbar">
      <div class="navbar-container">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <ul class="nav-links">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
          <li><router-link to="/contact">Контакты</router-link></li>
          <li><router-link to="/customers">Клиенты</router-link></li>
          <li><router-link to="/forgeshop">Товары</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
