<template>
  <div class="min-h-screen font-sans bg-zen-bg text-zen-text flex flex-col">
    <header class="p-4 flex items-center justify-between border-b border-zen-surface">
      <h1 class="text-xl font-bold text-zen-green">ZenTrack</h1>
    </header>
    
    <main class="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full">
      <slot />
    </main>
    
    <nav class="sticky bottom-0 bg-zen-surface border-t border-zen-surface p-2 flex justify-around">
      <NuxtLink to="/" class="flex flex-col items-center text-zen-textMuted active:text-zen-green" active-class="text-zen-green">
        <HomeIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-medium">Registro</span>
      </NuxtLink>
      <NuxtLink to="/stats" class="flex flex-col items-center text-zen-textMuted active:text-zen-green" active-class="text-zen-green">
        <BarChart2Icon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-medium">Stats</span>
      </NuxtLink>
      <NuxtLink to="/chat" class="flex flex-col items-center text-zen-textMuted active:text-zen-green" active-class="text-zen-green">
        <MessageCircleIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-medium">Chat</span>
      </NuxtLink>
      <NuxtLink to="/settings" class="flex flex-col items-center text-zen-textMuted active:text-zen-green" active-class="text-zen-green">
        <SettingsIcon class="w-6 h-6 mb-1" />
        <span class="text-[10px] font-medium">Auto.</span>
      </NuxtLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Home as HomeIcon, MessageCircle as MessageCircleIcon, BarChart2 as BarChart2Icon, Settings as SettingsIcon } from 'lucide-vue-next'
</script>
