<script setup lang="ts">
import Schedule from '@/components/Schedule.vue';
import json from '@/resources/schedules.json'
import { plainToInstance } from 'class-transformer';
import { ScheduleDto } from '@/types/schedule.d';
import { Ref, ref, watch, onMounted } from "vue"
import dayjs from 'dayjs'
import router from '@/router';

const page: Ref<number> = ref(1)
const data: ScheduleDto[] = json.map((schedule: ScheduleDto) => plainToInstance(ScheduleDto, schedule)).sort((a: ScheduleDto, b: ScheduleDto) => dayjs(b.startTime).unix() - dayjs(a.startTime).unix())
const schedules: Ref<ScheduleDto[]> = ref([])
const length: number = Math.ceil(data.length / 24)
schedules.value = data.slice(0, 24)

onMounted(() => {
  const p: number = parseInt(router.currentRoute.value.query.p as string, 10)
  if (!isNaN(p)) {
    schedules.value = data.slice((p - 1) * 24, p * 24)
    page.value = p
  } else {
    schedules.value = data.slice(0, 24)
    page.value = 1
  }
})

watch(page, (newValue) => {
  schedules.value = data.slice((newValue - 1) * 24, newValue * 24)
  router.push({ query: { p: newValue } })
})
</script>

<template>
  <v-pagination :length="length" v-model="page"></v-pagination>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="4" xl="4" v-for="schedule in schedules" :key="schedule.scheduleId">
      <Schedule :schedule="plainToInstance(ScheduleDto, schedule)" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
</style>
