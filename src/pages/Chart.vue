<script setup lang="ts">
import { useRouter } from 'vue-router';
import LineChart from '@/components/LineChart.vue';
import { Ref, onMounted, ref } from 'vue';
import { ScheduleStatusDto } from '@/types/schedule.d';
import { Status } from '@/types/status.d';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import BarChart from '@/components/BarChart.vue';
import { baseURL } from '@/constants/common';
import GradePoint from '@/components/GradePoint.vue';

const router = useRouter()
const scheduleId: string = router.currentRoute.value.params.scheduleId as string
const data: Ref<ScheduleStatusDto | undefined> = ref()
onMounted(async () => {
  const status: Status[] = (await import(`@/resources/schedules/${scheduleId}.json`)).default.map((status: any) => plainToInstance(Status, status));
  console.log(status)
  data.value = new ScheduleStatusDto(status)
})
</script>

<template>
  <v-row>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <GradePoint v-if="data !== undefined" :data="data" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <LineChart v-if="data !== undefined" :data="data" />
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" lg="6" xl="6">
      <v-card>
        <BarChart v-if="data !== undefined" :data="data" />
      </v-card>
    </v-col>
  </v-row>
</template>
