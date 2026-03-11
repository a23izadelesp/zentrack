import { defineStore } from 'pinia'

interface SettingsState {
  userName: string;
  theme: 'dark' | 'light' | 'system';
  remindersEnabled: boolean;
  autoSyncEnabled: boolean;
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    userName: 'User',
    theme: 'system',
    remindersEnabled: false,
    autoSyncEnabled: false
  }),
  persist: true as any
})
