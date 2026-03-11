<template>
  <div class="bg-zen-surface p-4 rounded-2xl shadow-sm border border-transparent">
    <div v-if="isLoading" class="h-64 relative w-full flex items-end gap-2 p-4">
      <div class="w-1/6 bg-zen-bg animate-pulse rounded-t-sm h-1/4"></div>
      <div class="w-1/6 bg-zen-bg animate-pulse rounded-t-sm h-3/4"></div>
      <div class="w-1/6 bg-zen-bg animate-pulse rounded-t-sm h-1/2"></div>
      <div class="w-1/6 bg-zen-bg animate-pulse rounded-t-sm h-full"></div>
      <div class="w-1/6 bg-zen-bg animate-pulse rounded-t-sm h-2/3"></div>
      <div class="w-1/6 bg-zen-bg animate-pulse rounded-t-sm h-1/3"></div>
    </div>
    <div v-else class="h-64 relative w-full">
      <Line v-if="chartData.labels" :data="chartConfig" :options="chartOptions" />
      <div v-if="!hasData" class="absolute inset-0 flex items-center justify-center bg-zen-surface bg-opacity-80 rounded-2xl">
        <p class="text-zen-textMuted text-sm">No hay suficientes datos para este período.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps<{
  chartData: {
    labels: string[]
    data: number[]
  },
  isLoading?: boolean
}>()

const hasData = computed(() => {
  return props.chartData.data.some(val => val > 0)
})

const chartConfig = computed(() => {
  // map 0s to null so they break the line naturally or simply don't draw points there
  const processedData = props.chartData.data.map(d => d === 0 ? null : d)
  
  return {
    labels: props.chartData.labels,
    datasets: [
      {
        label: 'Ánimo Promedio',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: '#10b981',
        pointBackgroundColor: '#10b981',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#10b981',
        data: processedData,
        fill: true,
        tension: 0.4,
        spanGaps: true
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1e293b',
      titleColor: '#f8fafc',
      bodyColor: '#f8fafc',
      padding: 10,
      displayColors: false,
      callbacks: {
        label: function(context: any) {
          const val = context.parsed.y
          const emojis = ['😢', '🙁', '😐', '🙂', '😄']
          return `Nivel: ${val} ${emojis[Math.min(Math.floor(val) - 1, 4)] || ''}`
        }
      }
    }
  },
  scales: {
    y: {
      min: 1,
      max: 5,
      ticks: {
        stepSize: 1,
        color: '#94a3b8'
      },
      grid: {
        color: '#334155'
      }
    },
    x: {
      ticks: {
        color: '#94a3b8'
      },
      grid: {
        display: false
      }
    }
  }
}
</script>
