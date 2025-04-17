<template>
    <div class="container">
      <h1>Вход</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" placeholder="Введите имя пользователя" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" placeholder="Введите пароль" required />
        </div>
        <button type="submit" class="btn-login">Войти</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginView',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async login() {
        this.errorMessage = ''; // Очищаем сообщение об ошибке
  
        try {
          console.log('Sending login request:', { username: this.username, password: this.password });
  
          const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.username, password: this.password }),
          });
  
          console.log('Response status:', response.status); // Логируем статус ответа
  
          if (!response.ok) {
            const errorData = await response.json();
            this.errorMessage = errorData.message || 'Ошибка входа';
            console.error('Login failed:', errorData);
            return;
          }
  
          const data = await response.json();
          console.log('Login successful:', data);
  
          // Сохраняем токен, роль и имя пользователя в localStorage
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          localStorage.setItem('username', this.username); // Сохраняем имя пользователя
  
          alert(`Добро пожаловать, ${data.role}!`);
          this.$router.push('/'); // Перенаправляем на главную страницу
        } catch (error) {
          console.error('Error during login:', error);
          this.errorMessage = 'Произошла ошибка при входе';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #ff7200;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ff7200;
    border-radius: 5px;
    background-color: #333333;
    color: #ffffff;
  }
  
  .btn-login {
    background-color: #ff7200;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-login:hover {
    background-color: #e66600;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>