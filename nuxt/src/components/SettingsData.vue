<template>
  <div class="space-y-6">
    <div class="bg-zen-surface p-4 rounded-2xl shadow-sm">
      <h3 class="font-medium mb-2 flex items-center gap-2">
        <DownloadIcon class="w-5 h-5 text-zen-textMuted" />
        Exportar Datos
      </h3>
      <p class="text-sm text-zen-textMuted mb-4">
        Descarga una copia de seguridad local de todos tus ánimos e historial de chat en formato JSON.
      </p>
      <button 
        @click="handleExport"
        :disabled="isExporting"
        class="bg-zen-blue hover:bg-blue-400 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
      >
        {{ isExporting ? 'Exportando...' : 'Descargar JSON' }}
      </button>
    </div>

    <!-- Extended Configuration -->
    <div class="bg-zen-surface p-4 rounded-2xl shadow-sm border border-transparent">
      <h3 class="font-medium mb-4 text-zen-text text-sm flex items-center gap-2">
        Ajustes Locales
      </h3>
      
      <div class="space-y-4 text-sm text-zen-textMuted">
        <label class="flex items-center justify-between">
          <span>Nombre de Usuario</span>
          <input v-model="settings.userName" type="text" class="bg-zen-bg p-1 rounded w-1/2 text-right text-zen-text outline-none focus:ring-1 focus:ring-zen-green" />
        </label>
        
        <label class="flex items-center justify-between">
          <span>Tema de la app</span>
          <select v-model="settings.theme" class="bg-zen-bg p-1 rounded text-zen-text outline-none focus:ring-1 focus:ring-zen-green">
            <option value="system">Sistema</option>
            <option value="dark">Oscuro</option>
            <option value="light">Claro</option>
          </select>
        </label>
        
        <label class="flex items-center justify-between">
          <span>Recordatorios Locales</span>
          <input v-model="settings.remindersEnabled" type="checkbox" class="accent-zen-green w-4 h-4" />
        </label>

        <label class="flex items-center justify-between">
          <div>
            <span>Auto-Sync WiFi</span>
            <p class="text-[10px] text-zen-textMuted/70">Subir cambios automáticamente si hay red</p>
          </div>
          <input v-model="settings.autoSyncEnabled" type="checkbox" class="accent-zen-green w-4 h-4" />
        </label>
      </div>
    </div>

    <!-- Cloud Sync Section -->
    <div class="bg-zen-surface p-4 rounded-2xl shadow-sm border border-blue-900/30">
      <h3 class="font-medium mb-4 flex items-center gap-2 text-blue-400">
        <ServerIcon class="w-5 h-5" />
        Sincronización en la Nube
      </h3>
      
      <div v-if="!isAuthenticated" class="space-y-4">
        <p class="text-sm text-zen-textMuted">Inicia sesión para respaldar tus datos en el servidor remoto cifrado.</p>
        <input v-model="email" type="email" placeholder="Email" class="w-full bg-zen-bg p-2 rounded-lg text-sm border-none focus:ring-1 focus:ring-zen-green" />
        <input v-model="password" type="password" placeholder="Contraseña" class="w-full bg-zen-bg p-2 rounded-lg text-sm border-none focus:ring-1 focus:ring-zen-green" />
        
        <div class="flex gap-2">
          <button @click="handleLogin" :disabled="isSyncing" class="flex-1 bg-zen-blue hover:bg-blue-400 text-white text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50">
            Iniciar Sesión
          </button>
          <button @click="handleRegister" :disabled="isSyncing" class="flex-1 border border-zen-blue text-zen-blue hover:bg-zen-blue/10 text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50">
            Registrarse
          </button>
        </div>
        <p v-if="syncError" class="text-xs text-red-500 mt-2">{{ syncError }}</p>
      </div>
      
      <div v-else class="space-y-4">
        <div class="flex justify-between items-center text-sm bg-blue-900/20 p-3 rounded-lg">
          <span class="text-zen-textMuted">Conectado como:</span>
          <span class="font-medium text-blue-300">{{ userEmail }}</span>
        </div>
        
        <p class="text-xs text-zen-textMuted">
          Al pulsar estos botones, aceptas que tus datos locales se vinculen explícitamente con la nube. Nada se envía automáticamente sin tu permiso.
        </p>
        
        <div class="flex gap-2">
          <button @click="confirmPush" :disabled="isSyncing" class="flex-1 bg-blue-500 hover:bg-blue-400 text-white text-sm font-medium py-2 flex items-center justify-center gap-2 rounded-lg transition-colors disabled:opacity-50">
            <UploadCloudIcon class="w-4 h-4" /> Subir
          </button>
          <button @click="confirmPull" :disabled="isSyncing" class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium py-2 flex items-center justify-center gap-2 rounded-lg transition-colors disabled:opacity-50">
            <DownloadCloudIcon class="w-4 h-4" /> Bajar
          </button>
        </div>
        
        <button @click="logout" class="w-full mt-2 text-xs text-red-400 hover:text-red-300 text-center py-2">
          Cerrar Sesión
        </button>
      </div>
    </div>

    <!-- Danger Zone (Delete) -->
    <div class="bg-zen-surface p-4 rounded-2xl shadow-sm border border-red-900/30">
      <h3 class="font-medium mb-2 flex items-center gap-2 text-red-500">
        <AlertTriangleIcon class="w-5 h-5" />
        Zona de Peligro
      </h3>
      <p class="text-sm text-zen-textMuted mb-4">
        La opción nuclear: elimina permanentemente todos tus datos de este dispositivo de forma irrecuperable.
      </p>
      
      <button 
        v-if="!confirmingDelete"
        @click="confirmingDelete = true"
        class="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Borrar todos mis datos
      </button>
      
      <div v-else class="space-y-3 bg-red-950/20 p-3 rounded-xl border border-red-900/50">
        <p class="text-sm text-red-400 font-bold">¿Estás completamente seguro?</p>
        <div class="flex gap-2">
          <button 
            @click="handleDelete"
            class="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            Sí, borrar ahora
          </button>
          <button 
            @click="confirmingDelete = false"
            class="flex-1 bg-zen-bg text-zen-text text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Download as DownloadIcon, AlertTriangle as AlertTriangleIcon, Server as ServerIcon, UploadCloud as UploadCloudIcon, DownloadCloud as DownloadCloudIcon } from 'lucide-vue-next'
import { exportDataAsJson, deleteAllData } from '../utils/export'
import { useCloudSync } from '../composables/useCloudSync'
import { useSettingsStore } from '../composables/useSettings'
import { db } from '../utils/db'

const settings = useSettingsStore()
const isExporting = ref(false)
const confirmingDelete = ref(false)

// Cloud Sync Refs
const { isAuthenticated, userEmail, isSyncing, error: syncError, login, register, logout, pushData, pullData } = useCloudSync()
const email = ref('')
const password = ref('')

// Export logic
const handleExport = async () => {
  isExporting.value = true
  await exportDataAsJson()
  isExporting.value = false
}

// Delete logic
const handleDelete = async () => {
  const success = await deleteAllData()
  if (success) {
    alert('Todos los datos han sido eliminados correctamente.')
    confirmingDelete.value = false
    window.location.reload()
  } else {
    alert('Hubo un error al intentar eliminar los datos.')
  }
}

// Auth logic
const handleLogin = async () => {
  await login(email.value, password.value)
}

const handleRegister = async () => {
  await register(email.value, password.value)
}

// Explicit Sync logic
const confirmPush = async () => {
  const confirm = window.confirm("Tus datos locales van a subir a la nube para crear una copia de seguridad y sobrescribirán el backup remoto actual. ¿Aceptas?")
  if (!confirm) return
  
  const m = await db.moods.toArray()
  const c = await db.chat_history.toArray()
  
  const success = await pushData(m, c)
  if (success) alert("Backup subido correctamente a la nube.")
}

const confirmPull = async () => {
  const confirm = window.confirm("Tus datos de la nube se descargarán y se fusionarán con tu historial local actual. ¿Aceptas?")
  if (!confirm) return
  
  const dat = await pullData()
  if (dat && dat.moods) {
    // Basic bulk put (overwrites matches, adds new logic)
    await db.moods.bulkPut(dat.moods)
    await db.chat_history.bulkPut(dat.chat)
    alert(`Datos descargados correctamente. (Última sync: ${dat.last_sync})`)
    window.location.reload()
  }
}
</script>
