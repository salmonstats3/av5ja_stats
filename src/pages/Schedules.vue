<script setup lang="ts">
import Schedule from '@/components/Schedule.vue';
import schedules from '@/resources/schedules.json'
import { plainToInstance } from 'class-transformer';
import { ScheduleDto } from '@/types/schedule.d';
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3" xl="3" v-for="schedule in schedules" :key="schedule.scheduleId">
      <Schedule :schedule="plainToInstance(ScheduleDto, schedule)" />
    </v-col>
  </v-row>
</template>
