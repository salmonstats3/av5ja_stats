<script setup lang="ts">
import { Ref, ref } from "vue"
const isPresented: Ref<boolean> = ref(false)
const items = [
  {
    title: "Schedules"
  },
  {
    title: "Scenarios"
  }
]
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
          <v-list-item v-for="item in items" :key="item.title">
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

