<script setup lang="ts">
import { Ref, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
const isPresented: Ref<boolean> = ref(false)
const router = useRouter()
const { t } = useI18n()
const items = [
  {
    title: t("VITE_APP.SCHEDULE"),
    link: "/"
  },
  {
    title: t("VITE_APP.SCENARIO_CODE"),
    link: "/scenarios"
  },
  {
    title: t("VITE_APP.DONATE"),
    link: "/donate"
  },
  {
    title: t("VITE_APP.INFORMATION"),
    link: "/about"
  },
]

function next(link: string): void {
  router.push(link)
}
</script>

<template>
  <v-app>
    <v-main>
      <v-app-bar>
        <v-app-bar-nav-icon variant="text" @click.stop="isPresented = !isPresented"></v-app-bar-nav-icon>
        <v-toolbar-title>Salmon Stats+</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="isPresented" location="left">
        <v-list>
          <v-list-item class="navigation-link" v-for="item in items" :key="item.title" @click="next(item.link)">
            <v-label>{{ item.title }}</v-label>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
.navigation-link {
  &:hover {
    background-color: rgb(70, 70, 70);
    font-weight: 600;
  }
}
</style>
