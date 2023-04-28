import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    component: async () => {
      const top = await import("@/pages/Home.vue");
      return top;
    },
    name: "Home",
    path: "/",
  },
  {
    component: async () => {
      const login = await import("@/pages/Schedules.vue");
      return login;
    },
    name: "schedules",
    path: "/schedules",
  },
  {
    component: async () => {
      const login = await import("@/pages/Analytics.vue");
      return login;
    },
    name: "analytics",
    path: "/schedules/:scheduleId",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
