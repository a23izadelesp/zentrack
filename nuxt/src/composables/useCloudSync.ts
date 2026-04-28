import { ref } from 'vue'

export const useCloudSync = () => {
  const config = useRuntimeConfig()
  const API_URL = (config.public.apiBase || 'http://localhost:22897') + '/api'
  const token = ref(import.meta.client ? localStorage.getItem('zentrack_token') || '' : '')
  const userEmail = ref(import.meta.client ? localStorage.getItem('zentrack_email') || '' : '')
  const isSyncing = ref(false)
  const error = ref('')

  const setAuth = (newToken: string, email: string) => {
    token.value = newToken
    userEmail.value = email
    if (import.meta.client) {
      localStorage.setItem('zentrack_token', newToken)
      localStorage.setItem('zentrack_email', email)
    }
  }

  const logout = () => {
    token.value = ''
    userEmail.value = ''
    if (import.meta.client) {
      localStorage.removeItem('zentrack_token')
      localStorage.removeItem('zentrack_email')
    }
  }

  const register = async (email: string, password: string) => {
    error.value = ''
    isSyncing.value = true
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setAuth(data.token, email)
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isSyncing.value = false
    }
  }

  const login = async (email: string, password: string) => {
    error.value = ''
    isSyncing.value = true
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      setAuth(data.token, email)
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isSyncing.value = false
    }
  }

  const pushData = async (moods: any[], chat: any[]) => {
    error.value = ''
    isSyncing.value = true
    try {
      const res = await fetch(`${API_URL}/sync/push`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`
        },
        body: JSON.stringify({ moods, chat })
      })
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) logout()
        throw new Error('Sync Push failed')
      }
      return true
    } catch (e: any) {
      error.value = e.message
      return false
    } finally {
      isSyncing.value = false
    }
  }

  const pullData = async () => {
    error.value = ''
    isSyncing.value = true
    try {
      const res = await fetch(`${API_URL}/sync/pull`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token.value}`
        }
      })
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) logout()
        throw new Error('Sync Pull failed')
      }
      const data = await res.json()
      return data
    } catch (e: any) {
      error.value = e.message
      return null
    } finally {
      isSyncing.value = false
    }
  }

  return {
    token,
    userEmail,
    isSyncing,
    error,
    isAuthenticated: computed(() => !!token.value),
    register,
    login,
    logout,
    pushData,
    pullData
  }
}
