import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Filler,
  LineElement,
} from "chart.js";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

import enUS from "@/locales/en-US.yaml";
import jaJP from "@/locales/ja-JP.yaml";

if (typeof window !== "undefined") import("./pwa");

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  RadialLinearScale,
  LineElement,
  ArcElement,
  Filler,
  Title,
  Tooltip,
  Legend,
);

const i18n = createI18n({
  allowComposition: true,
  availableLocales: ["en", "ja"],
  fallbackLocale: "en",
  fallbackRoot: true,
  legacy: false,
  locale: "en",
  messages: {
    en: enUS,
    ja: jaJP,
  },
});

loadFonts();

createApp(App).use(router).use(vuetify).use(i18n).mount("#app");
