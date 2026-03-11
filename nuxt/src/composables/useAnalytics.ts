import { db } from '../utils/db'
import { subDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns'

export const useAnalytics = () => {
  const getMoodsForPeriod = async (days: number) => {
    const end = Date.now()
    const start = subDays(end, days).getTime()
    
    return await db.moods
      .where('timestamp')
      .between(start, end)
      .toArray()
  }

  const getAverageMood = (moods: { level: number }[]) => {
    if (moods.length === 0) return 0
    const sum = moods.reduce((acc, m) => acc + m.level, 0)
    return Number((sum / moods.length).toFixed(1))
  }

  const getChartData = (moods: { timestamp: number, level: number }[], days: number) => {
    // Group by day
    const grouped = new Map<string, number[]>()
    
    // Initialize last N days with empty arrays
    for (let i = days - 1; i >= 0; i--) {
      const d = subDays(Date.now(), i)
      const dateStr = d.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      grouped.set(dateStr, [])
    }
    
    // Fill with data
    moods.forEach(m => {
      const dateStr = new Date(m.timestamp).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
      if (grouped.has(dateStr)) {
        grouped.get(dateStr)!.push(m.level)
      }
    })
    
    // Calculate averages per day
    const labels: string[] = []
    const data: number[] = []
    
    grouped.forEach((levels, dateStr) => {
      labels.push(dateStr)
      if (levels.length > 0) {
        data.push(getAverageMood(levels.map(l => ({ level: l }))))
      } else {
        data.push(0) // 0 implies no data
      }
    })
    
    return { labels, data }
  }

  return { getMoodsForPeriod, getAverageMood, getChartData }
}
