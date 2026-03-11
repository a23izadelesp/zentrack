import { ref } from 'vue'

export const useReminders = () => {
  const permission = ref<NotificationPermission | 'default'>('default')

  if (import.meta.client) {
    permission.value = Notification.permission
  }

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('Tu navegador no soporta notificaciones.')
      return false
    }
    
    const status = await Notification.requestPermission()
    permission.value = status
    return status === 'granted'
  }

  const scheduleReminder = (hour: number, minute: number) => {
    if (permission.value !== 'granted') return
    
    // In a real PWA this would be done via Service Worker push events or Alarm API.
    // For local MVP offline mode without a backend, we check periodically if the app is open
    // However, native notifications while closed require Push API + VAPID keys, which goes
    // beyond this pure offline MVP. For now, we simulate a local timeout if app is open.
    console.log(`Recordatorio programado para las ${hour}:${minute} (Local only for MVP).`)
    
    // Example local trigger
    setTimeout(() => {
      new Notification('ZenTrack', {
        body: '¿Cómo te sientes en este momento? Tómate un segundo para ti.',
        icon: '/pwa-192x192.png'
      })
    }, 5000) // Demo trigger in 5s
  }

  return { permission, requestPermission, scheduleReminder }
}
