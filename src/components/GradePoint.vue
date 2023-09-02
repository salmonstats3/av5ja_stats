<script setup lang="ts">
import { ScheduleStatusDto } from "@/types/schedule.d";
import { Chart as ChartJS } from "chart.js";
import { PropType } from "vue";
import { Line } from "vue-chartjs";

defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: true,
    },
  },
  plugins: {
    legend: {
      display: false,
      position: "bottom" as const,
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title>Grade Point</v-card-title>
    <Line :data="data" :options="options" />
  </v-card>
</template>
