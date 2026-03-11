<template>
  <div>
    <!-- Network Status Indicator -->
    <div v-if="!isOnline" class="mb-4 bg-yellow-600/20 text-yellow-500 p-2 rounded-xl text-xs text-center flex items-center justify-center gap-2">
      <WifiOffIcon class="w-4 h-4" />
      Modo sin conexión. Los datos se guardarán localmente.
    </div>
    
    <MoodSelector @save="onSaveMood" :isSaving="isSaving" />
    <MoodHistory :moods="recentMoods" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { WifiOff as WifiOffIcon } from 'lucide-vue-next'
import MoodSelector from '../components/MoodSelector.vue'
import MoodHistory from '../components/MoodHistory.vue'
import { useMoods } from '../composables/useMoods'
import type { MoodEntry } from '../utils/db'

const { saveMood, getRecentMoods } = useMoods()

const isSaving = ref(false)
const recentMoods = ref<MoodEntry[]>([])
const isOnline = ref(true)

const loadMoods = async () => {
  recentMoods.value = await getRecentMoods(10)
}

const onSaveMood = async (data: { level: number, note: string }) => {
  try {
    isSaving.value = true
    await saveMood(data.level, data.note)
    await loadMoods()
  } catch (error) {
    console.error('Error saving mood:', error)
    alert('No se pudo guardar el registro.')
  } finally {
    isSaving.value = false
  }
}

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  updateOnlineStatus()
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  loadMoods()
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>
