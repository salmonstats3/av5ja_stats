import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    component: async () => {
      return import("@/pages/Schedules.vue");
    },
    name: "Home",
    path: "/",
  },
  {
    component: async () => {
      return import("@/pages/Analytics.vue");
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
