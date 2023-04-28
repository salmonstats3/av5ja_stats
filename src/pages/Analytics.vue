<script setup lang="ts">
import { useRouter } from 'vue-router';
import LineChart from '@/components/LineChart.vue';
import { Ref, onMounted, ref } from 'vue';
import { ScheduleStatusDto } from '@/types/schedule.d';
import { Status } from '@/types/status.d';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs'

const baseURL: string = import.meta.env.VITE_APP_BASE_API_URL
const data: Ref<ScheduleStatusDto> = ref(undefined)

onMounted(async () => {
  const router = useRouter()
  const scheduleId: string = router.currentRoute.value.params.scheduleId as string
  const targetURL: string = `${baseURL}/v3/schedules/${scheduleId}/analytics`
  const response: Status[] = (await (await fetch(targetURL)).json()).map((status: Status) => plainToInstance(Status, status)).sort((a: Status, b: Status) => dayjs(a.play_time).unix() - dayjs(b.play_time).unix())
  console.log(response)
  data.value = new ScheduleStatusDto(response)
  // console.log(data.value)
})
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" md="6" lg="4" xl="4" v-for="schedule in [0, 1, 2]" :key="schedule">
      <v-card>
        <LineChart v-if="data !== undefined" :data="data" />
      </v-card>
    </v-col>
  </v-row>
</template>
