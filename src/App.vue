<template>
  <v-app>
    <v-main class="ma-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    }
  },
})
</script>
