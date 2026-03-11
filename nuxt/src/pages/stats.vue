<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-xl font-bold text-zen-green">Tus Estadísticas</h2>
      
      <div class="bg-zen-surface rounded-lg p-1 flex">
        <button 
          @click="period = 7" 
          class="px-3 py-1 text-sm rounded-md transition-colors"
          :class="period === 7 ? 'bg-zen-bg text-zen-green shadow-sm' : 'text-zen-textMuted hover:text-zen-text'"
        >
          7D
        </button>
        <button 
          @click="period = 30" 
          class="px-3 py-1 text-sm rounded-md transition-colors"
          :class="period === 30 ? 'bg-zen-bg text-zen-green shadow-sm' : 'text-zen-textMuted hover:text-zen-text'"
        >
          30D
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-zen-surface p-4 rounded-2xl shadow-sm text-center">
        <p class="text-sm text-zen-textMuted mb-1">Promedio</p>
        <p class="text-3xl font-bold text-zen-text flex items-center justify-center gap-2">
          {{ avgMood }} <span>{{ getEmoji(avgMood) }}</span>
        </p>
      </div>
      <div class="bg-zen-surface p-4 rounded-2xl shadow-sm text-center">
        <p class="text-sm text-zen-textMuted mb-1">Registros</p>
        <p class="text-3xl font-bold text-zen-text">{{ totalEntries }}</p>
      </div>
    </div>
    
    <div>
      <h3 class="text-lg font-medium text-zen-textMuted mb-3">Evolución</h3>
      <MoodTrendChart :chartData="chartData" :isLoading="isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useAnalytics } from '../composables/useAnalytics'
import MoodTrendChart from '../components/MoodTrendChart.vue'

const { getMoodsForPeriod, getAverageMood, getChartData } = useAnalytics()

const period = ref(7) // 7 days or 30 days
const avgMood = ref(0)
const totalEntries = ref(0)
const isLoading = ref(true)
const chartData = ref<{ labels: string[], data: number[] }>({ labels: [], data: [] })

const getEmoji = (level: number) => {
  if (level === 0) return ''
  const idx = Math.min(Math.max(Math.round(level) - 1, 0), 4)
  const emojis = ['😢', '🙁', '😐', '🙂', '😄']
  return emojis[idx]
}

const loadData = async () => {
  isLoading.value = true
  const moods = await getMoodsForPeriod(period.value)
  totalEntries.value = moods.length
  avgMood.value = getAverageMood(moods)
  chartData.value = getChartData(moods, period.value)
  isLoading.value = false
}

watch(period, () => {
  loadData()
})

onMounted(() => {
  loadData()
})
</script>
