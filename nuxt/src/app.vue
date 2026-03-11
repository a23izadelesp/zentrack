<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useOnlineStatus } from './composables/useOnlineStatus'

const { setupSync, teardownSync } = useOnlineStatus()
const themeColor = ref('#0f172a') // Default Zen Dark

onMounted(() => {
  setupSync()
  
  if (window.matchMedia) {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      // #0f172a is dark bg, #f8fafc is light bg (if we had light mode)
      // For ZenTrack it's mostly dark themed, but we adapt the top bar color
      themeColor.value = e.matches ? '#0f172a' : '#1e293b'
      
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) {
        meta.setAttribute('content', themeColor.value)
      } else {
        const newMeta = document.createElement('meta')
        newMeta.name = 'theme-color'
        newMeta.content = themeColor.value
        document.head.appendChild(newMeta)
      }
    }
    
    updateTheme(matcher)
    matcher.addEventListener('change', updateTheme)
  }
})

onUnmounted(() => {
  teardownSync()
})
</script>
