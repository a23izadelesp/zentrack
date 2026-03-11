import { ref, onMounted, onUnmounted, watch } from 'vue'
import { db } from '../utils/db'

export const useOnlineStatus = () => {
  const isOnline = ref(true)

  const syncData = async () => {
    if (!isOnline.value) return
    
    try {
      const unsynced = await db.moods.filter(m => !m.synced).toArray()
      if (unsynced.length === 0) return
      
      // Mock sync delay to serverless endpoint
      await new Promise(resolve => setTimeout(resolve, 500))
      
      await db.transaction('rw', db.moods, async () => {
        for (const mood of unsynced) {
          await db.moods.update(mood.id, { synced: true })
        }
      })
      
      console.log(`Synced ${unsynced.length} records.`)
    } catch (err) {
      console.error('Sync failed:', err)
    }
  }

  const updateNetworkStatus = () => {
    isOnline.value = navigator.onLine
  }

  // Watch for coming online to trigger sync
  let stopWatch: () => void

  const setupSync = () => {
    if (import.meta.client) {
      updateNetworkStatus()
      window.addEventListener('online', updateNetworkStatus)
      window.addEventListener('offline', updateNetworkStatus)
      
      stopWatch = watch(isOnline, (newVal) => {
        if (newVal) syncData()
      })

      if (isOnline.value) {
        syncData()
      }
    }
  }

  const teardownSync = () => {
    if (import.meta.client) {
      window.removeEventListener('online', updateNetworkStatus)
      window.removeEventListener('offline', updateNetworkStatus)
      if (stopWatch) stopWatch()
    }
  }

  return { isOnline, syncData, setupSync, teardownSync }
}
