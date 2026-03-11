<template>
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-zen-textMuted mb-2">Historial</h3>
    
    <div v-if="moods.length === 0" class="text-center py-8 text-zen-textMuted bg-zen-surface rounded-2xl">
      Aún no hay registros. ¡Añade uno arriba!
    </div>
    
    <div 
      v-for="entry in moods" 
      :key="entry.id"
      class="bg-zen-surface p-4 rounded-2xl shadow-sm flex items-start gap-4"
    >
      <div class="flex-shrink-0 w-10 h-10 rounded-full bg-zen-bg flex items-center justify-center text-xl">
        <span aria-hidden="true">{{ getEmoji(entry.level) }}</span>
      </div>
      
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-1">
          <span class="font-medium">Nivel {{ entry.level }}</span>
          <span class="text-xs text-zen-textMuted">{{ formatDate(entry.timestamp) }}</span>
        </div>
        
        <p v-if="entry.note" class="text-sm text-zen-text break-words line-clamp-2">
          {{ entry.note }}
        </p>
      </div>
      
      <div class="flex-shrink-0 text-xs flex flex-col items-end gap-1">
        <CloudIcon v-if="entry.synced" class="w-4 h-4 text-zen-green" aria-label="Sincronizado" />
        <CloudOffIcon v-else class="w-4 h-4 text-zen-textMuted" aria-label="Pendiente de sincronizar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cloud as CloudIcon, CloudOff as CloudOffIcon } from 'lucide-vue-next'
import type { MoodEntry } from '../utils/db'

defineProps<{
  moods: MoodEntry[]
}>()

const getEmoji = (level: number) => {
  const emojis = ['😢', '🙁', '😐', '🙂', '😄']
  return emojis[level - 1] || '😐'
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    day: '2-digit',
    month: 'short'
  }).format(date)
}
</script>
