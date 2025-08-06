import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import AddSite from '../components/AddSite.vue';
import RedirectPage from '../components/RedirectPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add-site',
    name: 'AddSite',
    component: AddSite
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: RedirectPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;