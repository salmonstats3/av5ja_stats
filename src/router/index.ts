import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    component: async () => {
      return import("@/pages/schedules/Regular.vue");
    },
    name: "REGULAR",
    path: "/",
  },
  {
    component: async () => {
      return import("@/pages/Scenarios.vue");
    },
    name: "SCENARIO",
    path: "/scenario",
    props: true,
  },
  {
    component: async () => {
      return import("@/pages/schedules/BigRun.vue");
    },
    name: "BIG_RUN",
    path: "/big_run",
  },
  {
    component: async () => {
      return import("@/pages/schedules/TeamContest.vue");
    },
    name: "TEAM_CONTEST",
    path: "/team_contest",
  },
  {
    component: async () => {
      return import("@/pages/Chart.vue");
    },
    name: "CHART",
    path: "/schedules/:scheduleId",
  },
  {
    component: async () => {
      return import("@/pages/ScenarioDetail.vue");
    },
    name: "SCENARIO_DETAIL",
    path: "/scenario/:scenarioCode",
  },
  {
    component: async () => {
      return import("@/pages/Donate.vue");
    },
    name: "DONATE",
    path: "/donate",
  },
  {
    component: async () => {
      return import("@/pages/About.vue");
    },
    name: "ABOUT",
    path: "/about",
  },
  {
    component: async () => {
      return import("@/pages/Me.vue");
    },
    name: "ME",
    path: "/me",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
