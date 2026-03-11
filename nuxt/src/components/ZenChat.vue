<template>
  <div class="flex flex-col h-[600px] max-h-[70vh] bg-zen-surface rounded-2xl overflow-hidden shadow-sm">
    <div class="p-4 bg-zen-surface border-b border-zen-bg text-center">
      <h2 class="font-semibold text-lg">Asistente Zen</h2>
      <p v-if="!isOnline" class="text-xs text-yellow-500 mt-1 flex items-center justify-center gap-1">
        <WifiOffIcon class="w-3 h-3" /> Sin conexión
      </p>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="chatContainer">
      <div v-if="isInitialLoading" class="space-y-4">
        <div class="flex justify-start">
          <div class="w-2/3 h-12 bg-zen-surface border border-zen-surface animate-pulse rounded-2xl rounded-tl-none"></div>
        </div>
        <div class="flex justify-start">
          <div class="w-1/2 h-16 bg-zen-surface border border-zen-surface animate-pulse rounded-2xl rounded-tl-none delay-75"></div>
        </div>
      </div>
      
      <div v-else-if="messages.length === 0" class="text-center text-zen-textMuted py-8 text-sm">
        Hola, soy Zen. Pregúntame sobre tus tendencias de ánimo o pídeme un consejo.
      </div>
      
      <div 
        v-for="msg in messages" 
        :key="msg.id"
        class="flex"
        :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
      >
        <div 
          class="max-w-[80%] p-3 rounded-2xl text-sm"
          :class="msg.role === 'user' ? 'bg-zen-blue text-zen-text rounded-tr-none' : 'bg-zen-bg text-zen-text rounded-tl-none border border-zen-surface'"
        >
          {{ msg.content }}
        </div>
      </div>
      
      <div v-if="isLoading" class="flex justify-start">
        <div class="bg-zen-bg text-zen-textMuted p-3 rounded-2xl rounded-tl-none border border-zen-surface text-sm flex gap-1">
          <span class="animate-bounce">.</span><span class="animate-bounce" style="animation-delay: 0.2s">.</span><span class="animate-bounce" style="animation-delay: 0.4s">.</span>
        </div>
      </div>
    </div>
    
    <div class="p-3 bg-zen-surface border-t border-zen-bg">
      <div class="flex gap-2 relative">
        <input 
          v-model="inputMsg" 
          @keyup.enter="sendMessage"
          type="text" 
          class="flex-1 bg-zen-bg text-zen-text placeholder-zen-textMuted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-zen-green disabled:opacity-50"
          placeholder="Escribe un mensaje..."
          :disabled="!isOnline || isLoading"
        />
        <button 
          @click="sendMessage"
          :disabled="!isOnline || isLoading || !inputMsg.trim()"
          class="w-11 h-11 bg-zen-green hover:bg-emerald-400 text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors"
          aria-label="Enviar mensaje"
        >
          <SendIcon class="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Send as SendIcon, WifiOff as WifiOffIcon } from 'lucide-vue-next'
import { db, type ChatMessage } from '../utils/db'
import { useMoods } from '../composables/useMoods'
import { useAnalytics } from '../composables/useAnalytics'

const inputMsg = ref('')
const messages = ref<ChatMessage[]>([])
const isLoading = ref(false)
const isInitialLoading = ref(true)
const chatContainer = ref<HTMLElement | null>(null)
const isOnline = ref(true)

const { getRecentMoods } = useMoods()
const { getMoodsForPeriod, getAverageMood } = useAnalytics()

const loadHistory = async () => {
  messages.value = await db.chat_history.orderBy('timestamp').toArray()
  isInitialLoading.value = false
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputMsg.value.trim() || !isOnline.value || isLoading.value) return
  
  const userMsg: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    content: inputMsg.value.trim(),
    timestamp: Date.now()
  }
  
  messages.value.push(userMsg)
  await db.chat_history.add(userMsg)
  inputMsg.value = ''
  scrollToBottom()
  
  isLoading.value = true
  
  try {
    const recentMoods = await getRecentMoods(5)
    
    // Get analytics for context
    const weeklyMoods = await getMoodsForPeriod(7)
    const analyticsContext = {
      weeklyAvg: getAverageMood(weeklyMoods),
      entriesCount: weeklyMoods.length
    }
    
    // For MVP, just send limited history to server
    const apiMessages = messages.value.slice(-6).map(m => ({ role: m.role, content: m.content }))
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: apiMessages,
        context: {
          moods: recentMoods,
          analytics: analyticsContext
        }
      })
    })
    
    const data = await response.json()
    const content = data.response || 'Hubo un error al procesar tu mensaje.'
    
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content,
      timestamp: Date.now()
    }
    
    messages.value.push(assistantMsg)
    await db.chat_history.add(assistantMsg)
    scrollToBottom()
  } catch (error) {
    console.error('Chat error:', error)
    
    const errorMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Lo siento, mi conexión con la nube es débil ahora, pero aquí tienes un consejo general: tómate 5 minutos para observar tu respiración.',
      timestamp: Date.now()
    }
    messages.value.push(errorMsg)
    await db.chat_history.add(errorMsg)
    scrollToBottom()
  } finally {
    isLoading.value = false
  }
}

const updateNetworkStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  updateNetworkStatus()
  window.addEventListener('online', updateNetworkStatus)
  window.addEventListener('offline', updateNetworkStatus)
  loadHistory()
})
</script>
