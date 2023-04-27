<script setup lang="ts">
import { CoopStageURL } from '@/constants/stage'
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

function next(): void {
  router.push(`/schedules/${props.schedule.scheduleId}`)
}
</script>

<template>
  <v-card @click="next">
    <v-img :src="CoopStageURL(props.schedule.stageId)"></v-img>
  </v-card>
</template>
