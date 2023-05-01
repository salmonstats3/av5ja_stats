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
  chartdata: {
    type: Object,
    required: true
  },
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
      display: true,
    },
    y: {
      display: false,
      beginAtZero: false,
    }
  },
  plugins: {
    tooltip: {
      enabled: true,
      callbacks: {
        label: (item: any) => {
          return Number(Big(item.raw).mul(100).round(3).toString()) + "%"
        }
      }
    },
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>
    <Bar :data="chartdata" :options="options" />
  </v-card>
</template>
