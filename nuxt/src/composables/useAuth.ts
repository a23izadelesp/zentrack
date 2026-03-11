import { ref } from 'vue'

export const useAuth = () => {
  const isAuthenticated = ref(false)
  const isSupported = ref(false)

  // Initialize and check if WebAuthn is supported
  if (import.meta.client) {
    if (window.PublicKeyCredential) {
      isSupported.value = true
    } else {
      // Fallback for browsers without WebAuthn
      isAuthenticated.value = true // Just let them in if no biometric option exists
    }
  }

  // Generate random challenge buffer
  const generateChallenge = () => {
    const randomBuffer = new Uint8Array(32)
    crypto.getRandomValues(randomBuffer)
    return randomBuffer
  }

  const authenticate = async () => {
    if (!isSupported.value) {
      isAuthenticated.value = true
      return true
    }

    try {
      // This is a minimal implementation for local user verification (Platform Authenticator like TouchID/Windows Hello)
      // For a true secure system, the challenge would come from a server. Here we just rely on local device verification.
      const publicKey: PublicKeyCredentialRequestOptions = {
        challenge: generateChallenge(),
        timeout: 60000,
        userVerification: 'required' // Force biometric or PIN
      }

      const credential = await navigator.credentials.get({ publicKey })
      
      if (credential) {
        isAuthenticated.value = true
        return true
      }
      return false
    } catch (error) {
      console.warn('WebAuthn no configurado o cancelado. Usando modo de desarrollo/fallback.', error)
      // Fallback for desktop users without a security key or fingerprint reader
      const pin = prompt('Tu dispositivo no pudo usar biometría local. Introduce el PIN de emergencia (0000):')
      if (pin === '0000') {
        isAuthenticated.value = true
        return true
      }
      return false
    }
  }

  const lock = () => {
    isAuthenticated.value = false
  }

  return { isSupported, isAuthenticated, authenticate, lock }
}
