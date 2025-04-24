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

// Компоненты для работы с таблицей Apartments (Квартиры)
import ApartmentsIndexView from '../views/Apartments/IndexView.vue';
import ApartmentsCreateView from '../views/Apartments/CreateView.vue';
import ApartmentsDetailsView from '../views/Apartments/DetailsView.vue';
import ApartmentsUpdateView from '../views/Apartments/UpdateView.vue';

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

  // Маршруты для квартир (Apartments)
  {
    path: '/apartments',
    name: 'ApartmentsIndex',
    component: ApartmentsIndexView,
  },
  {
    path: '/apartments/create',
    name: 'ApartmentsCreate',
    component: ApartmentsCreateView,
  },
  {
    path: '/apartments/:id',
    name: 'ApartmentsDetails',
    component: ApartmentsDetailsView,
  },
  {
    path: '/apartments/:id/edit',
    name: 'ApartmentsEdit',
    component: ApartmentsUpdateView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;