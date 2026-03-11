import { db, type MoodEntry } from '../utils/db'

// Helper for Web Crypto API
const getCryptoKey = async () => {
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode('zentrack-local-secret-key-32b-!'),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )
  return await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('zen-salt'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
}

const encryptData = async (text: string) => {
  if (!text) return ''
  const key = await getCryptoKey()
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encoded = new TextEncoder().encode(text)
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  )
  
  // Combine IV and ciphertext for storage as base64
  const combined = new Uint8Array(iv.length + ciphertext.byteLength)
  combined.set(iv, 0)
  combined.set(new Uint8Array(ciphertext), iv.length)
  
  return btoa(String.fromCharCode(...combined))
}

const decryptData = async (encryptedBase64: string) => {
  if (!encryptedBase64) return ''
  try {
    const key = await getCryptoKey()
    const combined = new Uint8Array(atob(encryptedBase64).split('').map(c => c.charCodeAt(0)))
    const iv = combined.slice(0, 12)
    const ciphertext = combined.slice(12)
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      ciphertext
    )
    return new TextDecoder().decode(decrypted)
  } catch (e) {
    console.error('Decryption failed', e)
    return '[Contenido no descifrable]'
  }
}

export const useMoods = () => {
  const saveMood = async (level: number, note: string) => {
    const encryptedNote = await encryptData(note)
    
    const entry: MoodEntry = {
      id: crypto.randomUUID(),
      level,
      note: encryptedNote,
      timestamp: Date.now(),
      synced: false
    }
    await db.moods.add(entry)
    return { ...entry, note } // Return decrypted for UI
  }

  const getRecentMoods = async (limit = 10) => {
    const entries = await db.moods.orderBy('timestamp').reverse().limit(limit).toArray()
    for (const entry of entries) {
      if (entry.note) {
        entry.note = await decryptData(entry.note)
      }
    }
    return entries
  }

  const getAllMoods = async () => {
    const entries = await db.moods.orderBy('timestamp').reverse().toArray()
    for (const entry of entries) {
      if (entry.note) {
        entry.note = await decryptData(entry.note)
      }
    }
    return entries
  }

  return {
    saveMood,
    getRecentMoods,
    getAllMoods
  }
}
