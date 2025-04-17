import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

// Импортируем компоненты для работы с таблицей Customers
import CustomersIndexView from '../views/Customers/IndexView.vue';
import CustomersCreateView from '../views/Customers/CreateView.vue';
import CustomersDetailsView from '../views/Customers/DetailsView.vue';
import CustomersUpdateView from '../views/Customers/UpdateView.vue';

// Импортируем компоненты для работы с таблицей ForgeShop
import ForgeShopIndexView from '../views/ForgeShop/IndexView.vue';
import ForgeShopCreateView from '../views/ForgeShop/CreateView.vue';
import ForgeShopDetailsView from '../views/ForgeShop/DetailsView.vue';
import ForgeShopUpdateView from '../views/ForgeShop/UpdateView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/contact', component: ContactView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },

  // Маршруты для таблицы Customers
  { path: '/customers', component: CustomersIndexView }, // Список клиентов
  { path: '/customers/create', component: CustomersCreateView }, // Создание клиента
  { path: '/customers/:id', component: CustomersDetailsView }, // Детали клиента
  { path: '/customers/:id/edit', component: CustomersUpdateView }, // Редактирование клиента

  // Маршруты для таблицы ForgeShop
  { path: '/forgeshop', component: ForgeShopIndexView }, // Список товаров
  { path: '/forgeshop/create', component: ForgeShopCreateView }, // Создание товара
  { path: '/forgeshop/:id', component: ForgeShopDetailsView }, // Детали товара
  { path: '/forgeshop/:id/edit', component: ForgeShopUpdateView }, // Редактирование товара
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;