import Dexie, { type Table } from 'dexie'

export interface MoodEntry {
  id: string
  level: number
  note: string
  timestamp: number
  synced: boolean
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export class ZenDatabase extends Dexie {
  moods!: Table<MoodEntry>
  chat_history!: Table<ChatMessage>

  constructor() {
    super('ZenTrackDB')
    this.version(1).stores({
      moods: 'id, timestamp, synced',
      chat_history: 'id, timestamp'
    })
  }
}

export const db = new ZenDatabase()
