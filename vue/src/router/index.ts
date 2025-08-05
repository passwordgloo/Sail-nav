import { createRouter, createWebHistory } from 'vue-router';
import SiteLinks from '../components/SiteLinks.vue';
import JumpPage from '../components/JumpPage.vue';
import ImportLinks from '../components/ImportLinks.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: SiteLinks
  },
  {
    path: '/jump',
    name: 'jump',
    component: JumpPage
  },
  {
    path: '/import',
    name: 'import',
    component: ImportLinks
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;