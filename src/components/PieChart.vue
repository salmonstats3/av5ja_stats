<script setup lang="ts">
import Big from "big.js";
import { Pie } from "vue-chartjs";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
});

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  cutout: "50%" as const,
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: (item: any) => {
          return Number(Big(item.raw).mul(100).round(3).toString()) + "%";
        },
      },
    },
    legend: {
      display: true,
      position: "left" as const,
    },
  },
};
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <Pie :data="data" :options="options" />
  </v-card>
</template>
