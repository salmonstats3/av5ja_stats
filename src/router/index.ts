import { createRouter, createWebHistory } from "vue-router";
import Schedules from "@/components/Schedule.vue";
import Analytics from "@/pages/Analytics.vue";

const routes = [
  {
    component: Schedules,
    name: "Home",
    path: "/",
  },
  {
    component: Analytics,
    name: "analytics",
    path: "/schedules/:scheduleId",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
