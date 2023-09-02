<script setup lang="ts">
import Schedule from "@/components/Schedule.vue";
import { plainToInstance } from "class-transformer";
import { ScheduleDto } from "@/types/schedule.d";
import { Ref, ref, watch, onMounted } from "vue";
import router from "@/router";
import { PropType } from "vue";

const props = defineProps({
  schedules: {
    type: Array as PropType<ScheduleDto[]>,
    required: true,
  },
});

const page: Ref<number> = ref(1);
const schedules: Ref<ScheduleDto[]> = ref([]);
const length: number = Math.ceil(props.schedules.length / 24);
schedules.value = props.schedules.slice(0, 24);

onMounted(() => {
  const p: number = parseInt(router.currentRoute.value.query.p as string, 10);

  if (!isNaN(p)) {
    schedules.value = props.schedules.slice((p - 1) * 24, p * 24);
    page.value = p;
  } else {
    schedules.value = props.schedules.slice(0, 24);
    page.value = 1;
  }
});

watch(page, (newValue) => {
  schedules.value = props.schedules.slice((newValue - 1) * 24, newValue * 24);
  router.push({ query: { p: newValue } });
});
</script>

<template>
  <v-pagination :length="length" v-model="page"></v-pagination>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="4" xl="4" v-for="schedule in schedules" :key="schedule.scheduleId">
      <Schedule :schedule="plainToInstance(ScheduleDto, schedule)" />
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped></style>
