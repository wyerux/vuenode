import { createRouter, createWebHistory } from 'vue-router';

// Основные страницы
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

// Компоненты для работы с таблицей Clients (Клиенты)
import ClientsIndexView from '../views/Clients/IndexView.vue';
import ClientsCreateView from '../views/Clients/CreateView.vue';
import ClientsDetailsView from '../views/Clients/DetailsView.vue';
import ClientsUpdateView from '../views/Clients/UpdateView.vue';

// Компоненты для работы с таблицей Cars (Автомобили)
import CarsIndexView from '../views/Cars/IndexView.vue';
import CarsCreateView from '../views/Cars/CreateView.vue';
import CarsDetailsView from '../views/Cars/DetailsView.vue';
import CarsUpdateView from '../views/Cars/UpdateView.vue';

const routes = [
  // Основные маршруты
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/contact', component: ContactView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },

  // Маршруты для клиентов (Clients)
  {
    path: '/clients',
    name: 'ClientsIndex',
    component: ClientsIndexView,
  },
  {
    path: '/clients/create',
    name: 'ClientsCreate',
    component: ClientsCreateView,
  },
  {
    path: '/clients/:id',
    name: 'ClientsDetails',
    component: ClientsDetailsView,
  },
  {
    path: '/clients/:id/edit',
    name: 'ClientsEdit',
    component: ClientsUpdateView,
  },

  // Маршруты для автомобилей (Cars)
  {
    path: '/cars',
    name: 'CarsIndexView',
    component: CarsIndexView,
  },
  {
    path: '/cars/create',
    name: 'CarCreateView',
    component: CarsCreateView,
  },
  {
    path: '/cars/:id',
    name: 'CarDetailsView',
    component: CarsDetailsView,
  },
  {
    path: '/cars/:id/edit',
    name: 'CarUpdateView',
    component: CarsUpdateView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;