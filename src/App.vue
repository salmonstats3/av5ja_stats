<script setup lang="ts">
import { Ref, ref } from "vue"
import { useRouter } from "vue-router"
const isPresented: Ref<boolean> = ref(false)
const router = useRouter()
const items = [
  {
    title: "スケジュール",
    link: "/"
  },
  {
    title: "シナリオコード",
    link: "/scenarios"
  },
  {
    title: "Salmon Stats+について",
    link: "/about"
  },
  {
    title: "支援",
    link: "/donate"
  },
  {
    title: "開発者について",
    link: "/me"
  }
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
          <v-list-item class="navigation-link" v-for="item in items" :key="item.title">
            <v-label @click="next(item.link)">{{ item.title }}</v-label>
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
