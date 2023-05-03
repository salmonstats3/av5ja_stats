<script setup lang="ts">
// @ts-nocheck
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, ChartData } from 'chart.js'
import Big from 'big.js'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  x: {
    type: Boolean,
    default: true
  },
  y: {
    type: Boolean,
    default: true
  },
  style: {
    type: String as PropType<"default" | "percent">,
    default: "default"
  }
})

const options = {
  responsive: true,
  maintainAspectRatio: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      display: props.x,
    },
    y: {
      display: props.y,
      beginAtZero: false,
    }
  },
  plugins: {
    tooltip: props.style === "percent" ? {
      enabled: true,
      callbacks: {
        label: (item: any) => {
          return Number(Big(item.raw).mul(100).round(3).toString()) + "%"
        }
      }
    } : {},
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <Bar v-if="data.datasets[0].data.length !== 0" :data="data" :options="options" />
  </v-card>
</template>
