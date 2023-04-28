import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createI18n } from 'vue-i18n';
import enUS from '@/locales/en-US.yaml';
import jaJP from '@/locales/ja-JP.yaml';

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
} from 'chart.js';

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
  Legend
);

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  allowComposition: true,
  messages: {
    ja: jaJP,
    en: enUS,
  },
  fallbackLocale: 'en',
  fallbackRoot: true,
  availableLocales: ['en', 'ja'],
});

loadFonts();

createApp(App).use(router).use(vuetify).use(i18n).mount('#app');
