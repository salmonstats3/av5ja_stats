<script setup lang="ts">
import schedules from '@/resources/schedules.json'
import { CoopStageURL } from '@/constants/stage'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';
import LineChart from '@/components/LineChart.vue';
import { onMounted, watch } from 'vue';

const router = useRouter()
const baseURL: string = import.meta.env.VITE_APP_BASE_API_URL

onMounted(() => {
  const scheduleId: string = router.currentRoute.value.params.scheduleId
  const targetURL: string = `${baseURL}/v3/schedules/${scheduleId}/analytics`
  console.log(targetURL)
})
function next(scheduleId: string): void {
  router.push(`/schedules/${scheduleId}`)
}
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="4" xl="4" v-for="schedule in [0, 1, 2]" :key="schedule">
      <v-card>
        <LineChart />
      </v-card>
    </v-col>
  </v-row>
</template>
