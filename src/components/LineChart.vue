<script setup lang="ts">
// @ts-nocheck
import { ScheduleStatusDto } from "@/types/schedule.d";
import { Chart as ChartJS } from "chart.js";
import { PropType } from "vue";
import { Line } from "vue-chartjs";

defineProps({
  data: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
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
      ticks: {
        format: {
          style: "percent" as const,
        },
      },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <Line v-if="data.datasets[0].data.length !== 0" :data="data" :options="options" />
  </v-card>
</template>
