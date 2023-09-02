<script setup lang="ts">
// @ts-nocheck
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, ChartData } from "chart.js";
import Big from "big.js";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  x: {
    type: Boolean,
    default: true,
  },
  y: {
    type: Boolean,
    default: true,
  },
  format: {
    type: String as PropType<"default" | "percent">,
    default: "default",
  },
  legend: {
    type: Boolean,
    default: true,
    required: false,
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
      display: props.x,
    },
    y: {
      display: props.y,
      beginAtZero: false,
    },
  },
  plugins: {
    tooltip:
      props.format === "percent"
        ? {
            enabled: true,
            callbacks: {
              label: (item: any) => {
                return Number(Big(item.raw).mul(100).round(3).toString()) + "%";
              },
              title: (item: string) => {
                const raw_value: number = parseInt(item[0].label, 10);
                return `${raw_value} ~ ${raw_value + 5}`;
              },
            },
          }
        : {},
    legend: {
      display: props.legend,
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <Bar v-if="data.datasets[0].data.length !== 0" :data="data" :options="options" />
  </v-card>
</template>
