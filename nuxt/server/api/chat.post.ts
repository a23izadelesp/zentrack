import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { messages, context } = body

  if (!messages || !Array.isArray(messages)) {
    return { error: 'Invalid messages format' }
  }

  // Type-safe approach for process.env in Nitro
  const envKey = (process.env as any).OPENAI_API_KEY
  const aiKey = envKey || ''
  
  try {
    if (!aiKey) {
      // Mock response acknowledging context for local MVP testing
      await new Promise(resolve => setTimeout(resolve, 1000)) // simulated delay
      const latestMood = context && context.length > 0 ? context[0] : null
      let mockReply = 'Entiendo. '
      if (latestMood) {
        if (latestMood.level <= 2) {
          mockReply += 'Veo que últimamente no te has sentido muy bien. Recuerda respirar hondo y darte tiempo.'
        } else if (latestMood.level >= 4) {
          mockReply += '¡Qué bien que tu ánimo esté alto últimamente! Sigue así.'
        } else {
          mockReply += 'Parece que estás en un buen equilibrio últimamente.'
        }
      } else {
        mockReply += 'Aún no tengo registros tuyos, pero estoy aquí para escucharte.'
      }
      return { response: mockReply }
    }
    
    // Minimal integration wrapper using OpenAI
    const systemPrompt = `Eres Zen, un asistente de bienestar. Sé breve y relajante. El usuario te pasa hoy sus últimos ${context?.moods?.length || 0} registros de ánimo (del 1 al 5) y las analíticas semanales:\n${JSON.stringify(context)}.`
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        max_tokens: 150
      })
    })
    
    if (!response.ok) {
      throw new Error('API failure')
    }
    
    const data = await response.json()
    return { response: data.choices[0].message.content }
  } catch (err) {
    console.error('Chat endpoint error:', err)
    return { response: 'Lo siento, mi conexión con la nube es débil ahora, pero aquí tienes un consejo general: tómate 5 minutos para observar tu respiración.' }
  }
})
