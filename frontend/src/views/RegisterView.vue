<template>
    <div class="container">
      <h1>Регистрация</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" placeholder="Введите имя пользователя" required />
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" placeholder="Введите пароль" required />
        </div>
        <button type="submit" class="btn-register">Зарегистрироваться</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RegisterView',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
      };
    },
    methods: {
      async register() {
        this.errorMessage = ''; // Очищаем сообщение об ошибке
  
        try {
          console.log('Sending registration request:', { username: this.username, password: this.password });
  
          const response = await fetch('http://localhost:5000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: this.username, password: this.password }),
});
  
          if (!response.ok) {
            const errorData = await response.json();
            this.errorMessage = errorData.message || 'Ошибка регистрации';
            console.error('Registration failed:', errorData);
            return;
          }
  
          const data = await response.json();
          console.log('Registration successful:', data);
  
          alert(`Вы успешно зарегистрировались как ${data.role}`);
          this.$router.push('/login'); // Перенаправляем на страницу входа
        } catch (error) {
          console.error('Error during registration:', error);
          this.errorMessage = 'Произошла ошибка при регистрации';
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
  
  .btn-register {
    background-color: #ff7200;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-register:hover {
    background-color: #e66600;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>