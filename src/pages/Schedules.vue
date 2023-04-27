<script setup lang="ts">
import schedules from '@/resources/schedules.json'
import { CoopStageURL } from '@/constants/stage'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router';

const router = useRouter()

function next(scheduleId: string): void {
  router.push(`/schedules/${scheduleId}`)
}
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3" xl="3" v-for="schedule in schedules" :key="schedule.scheduleId">
      <v-card @click="next(schedule.scheduleId)">
        <v-img :src="CoopStageURL(schedule.stageId)"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
