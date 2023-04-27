import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: async () => {
      const top = await import('@/pages/Home.vue');
      return top;
    },
  },
  {
    path: '/schedules',
    name: 'schedules',
    component: async () => {
      const login = await import('@/pages/Schedules.vue');
      return login;
    },
  },
  {
    path: '/schedules/:scheduleId',
    name: 'analytics',
    component: async () => {
      const login = await import('@/pages/Analytics.vue');
      return login;
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
