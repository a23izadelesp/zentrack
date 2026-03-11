<template>
  <div class="bg-zen-surface p-6 rounded-2xl shadow-sm border-2 border-transparent transition-colors mb-6">
    <h2 class="text-xl font-semibold mb-4 text-center">¿Cómo te sientes hoy?</h2>
    
    <div class="flex justify-between items-center mb-6">
      <button 
        v-for="lvl in 5" 
        :key="lvl"
        @click="selectedLevel = lvl"
        :aria-label="`Nivel de ánimo ${lvl}`"
        class="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all"
        :class="selectedLevel === lvl ? 'bg-zen-green text-white scale-110 shadow-md ring-2 ring-zen-green ring-offset-2 ring-offset-zen-surface' : 'bg-zen-bg hover:bg-opacity-80 text-gray-400'"
      >
        <span aria-hidden="true">{{ getEmoji(lvl) }}</span>
      </button>
    </div>
    
    <div class="mb-4">
      <label for="mood-note" class="sr-only">Añade una nota breve</label>
      <textarea 
        id="mood-note"
        v-model="note" 
        class="w-full bg-zen-bg text-zen-text placeholder-zen-textMuted rounded-xl p-3 border border-transparent focus:border-zen-green outline-none transition-colors"
        rows="3"
        placeholder="Añade una nota breve (opcional)..."
      ></textarea>
    </div>
    
    <button 
      @click="handleSave"
      :disabled="!selectedLevel || isSaving"
      class="w-full bg-zen-green hover:bg-emerald-400 text-white font-medium py-3 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {{ isSaving ? 'Guardando...' : 'Guardar' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isSaving?: boolean
}>()

const emit = defineEmits<{
  (e: 'save', data: { level: number, note: string }): void
}>()

const selectedLevel = ref<number>(0)
const note = ref('')

const getEmoji = (level: number) => {
  const emojis = ['😢', '🙁', '😐', '🙂', '😄']
  return emojis[level - 1] || '😐'
}

const handleSave = () => {
  if (selectedLevel.value) {
    emit('save', { level: selectedLevel.value, note: note.value })
    selectedLevel.value = 0
    note.value = ''
  }
}
</script>
