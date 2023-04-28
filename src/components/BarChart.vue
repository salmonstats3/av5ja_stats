<script setup lang="ts">
import { ScheduleStatusDto } from '@/types/schedule';
import { PropType } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, } from 'chart.js'

const props = defineProps({
  data: {
    type: ScheduleStatusDto as PropType<ScheduleStatusDto>,
    required: true
  },
})

const plugin = {
  id: 'background_color',
  beforeDraw: (chart: ChartJS) => {
    const ctx: CanvasRenderingContext2D | null = chart.canvas.getContext('2d');
    if (ctx !== null) {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = "#FFA50088";
      const width: number = chart.scales.x.width / 6;
      const colors: string[] = [
        "#E7F8F788",
        "#305EA988",
        "#C1464688",
        "#E7F8F788",
        "#305EA988",
        "#C1464688",
      ]
      colors.forEach((color: string, index: number) => {
        ctx.fillStyle = color;
        ctx.fillRect(chart.scales.x.left + width * index, chart.scales.y.top, width, chart.scales.y.bottom);
      })
      ctx.restore();
    }
  }
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      beginAtZero: false,
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-title>Results</v-card-title>
    <Bar :data="props.data.clear_ratio" :options="options" :plugins="[plugin]" />
    <Bar v-if="data !== undefined" :data="data.shifts_worked" :options="options" />
  </v-card>
</template>
