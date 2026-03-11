<template>
  <div class="space-y-6">
    <h2 class="text-xl font-bold text-zen-green">Ajustes & Privacidad</h2>
    
    <div v-if="requiresAuth && !isAuthenticated" class="bg-zen-surface p-8 rounded-2xl shadow-sm text-center">
      <LockIcon class="w-12 h-12 text-zen-textMuted mx-auto mb-4" />
      <h3 class="font-medium mb-2">Sección Bloqueada</h3>
      <p class="text-sm text-zen-textMuted mb-6">Autentícate para acceder a los ajustes de privacidad.</p>
      
      <button 
        @click="authenticate()"
        class="bg-zen-green hover:bg-emerald-400 text-white py-2 px-6 rounded-lg transition-colors"
      >
        Desbloquear
      </button>
    </div>
    
    <div v-else>
      <SettingsData />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Lock as LockIcon } from 'lucide-vue-next'
import SettingsData from '../components/SettingsData.vue'
import { useAuth } from '../composables/useAuth'

const { isSupported, isAuthenticated, authenticate } = useAuth()

const requiresAuth = isSupported

onMounted(() => {
  if (requiresAuth.value && !isAuthenticated.value) {
    authenticate()
  }
})
</script>
