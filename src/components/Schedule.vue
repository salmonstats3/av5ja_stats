<script setup lang="ts">
import { CoopStageURL, CoopStageLazyURL } from '@/constants/stage'
import { useRouter } from 'vue-router';
import { ScheduleDto } from '@/types/schedule.d';
import { PropType } from 'vue';
const router = useRouter()

const props = defineProps({
  schedule: {
    type: ScheduleDto as PropType<ScheduleDto>,
    required: true
  }
})

function next(scheduleId: string): void {
  router.push(`/schedules/${scheduleId}`)
}
</script>

<template>
  <v-card @click="next(props.schedule.scheduleId)">
    <v-img :lazy-src="CoopStageLazyURL(props.schedule.stageId)" :src="CoopStageURL(props.schedule.stageId)"
      :aspect-ratio="24 / 9" :cover="true"></v-img>
  </v-card>
</template>

<style lang="scss" scoped>
.v-card {}
</style>
