import { db } from './db'

export const exportDataAsJson = async () => {
  try {
    const moods = await db.moods.toArray()
    const chatHistory = await db.chat_history.toArray()
    
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      moods,
      chatHistory
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = `zentrack-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    return true
  } catch (error) {
    console.error('Error exporting data:', error)
    return false
  }
}

export const deleteAllData = async () => {
  try {
    await db.transaction('rw', db.moods, db.chat_history, async () => {
      await db.moods.clear()
      await db.chat_history.clear()
    })
    return true
  } catch (error) {
    console.error('Error deleting data:', error)
    return false
  }
}
