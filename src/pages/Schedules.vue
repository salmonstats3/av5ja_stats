<script setup lang="ts">
import Schedule from '@/components/Schedule.vue';
import json from '@/resources/schedules.json'
import { plainToInstance } from 'class-transformer';
import { ScheduleDto } from '@/types/schedule.d';
import dayjs from 'dayjs'

const schedules: ScheduleDto[] = json.map((schedule: ScheduleDto) => plainToInstance(ScheduleDto, schedule)).sort((a: ScheduleDto, b: ScheduleDto) => dayjs(b.startTime).unix() - dayjs(a.startTime).unix())
</script>

<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3" xl="3" v-for="schedule in schedules" :key="schedule.scheduleId">
      <Schedule :schedule="plainToInstance(ScheduleDto, schedule)" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
</style>
