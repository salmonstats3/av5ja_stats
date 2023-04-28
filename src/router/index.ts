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
      return import("@/pages/Chart.vue");
    },
    name: "Chart",
    path: "/schedules/:scheduleId",
  },
  {
    component: async () => {
      return import("@/pages/Scenarios.vue");
    },
    name: "Scenarios",
    path: "/scenarios",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
