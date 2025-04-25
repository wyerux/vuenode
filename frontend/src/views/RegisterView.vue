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
  
          const response = await fetch('/api/register', {
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
}

.register-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  padding: 40px;
  animation: fadeIn 0.6s ease-out;
}

.register-header {
  text-align: center;
  margin-bottom: 32px;
}

.register-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 8px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.register-header p {
  color: #718096;
  font-size: 14px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.form-input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  background-color: white;
}

.input-icon {
  position: absolute;
  left: 16px;
  bottom: 12px;
  color: #a0aec0;
}

.password-hints {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hint {
  font-size: 12px;
  color: #718096;
  margin: 0;
}

.register-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.2);
}

.register-btn:active {
  transform: translateY(0);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e53e3e;
  font-size: 14px;
  margin-top: 16px;
  padding: 10px;
  background-color: #fff5f5;
  border-radius: 6px;
  border-left: 3px solid #e53e3e;
}

.register-footer {
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: #718096;
}

.register-footer a {
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
}

.register-footer a:hover {
  color: #7c3aed;
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 30px 20px;
  }
  
  .register-header h1 {
    font-size: 24px;
  }
  
  .password-hints {
    flex-direction: column;
    gap: 4px;
  }
}
</style>