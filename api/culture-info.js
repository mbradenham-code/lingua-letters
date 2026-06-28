export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { type, country, message, history } = req.body

  try {
    let prompt = ''
    let systemPrompt = ''

    if (type === 'info') {
      prompt = `Give me rich cultural info about ${country} for students writing pen pal letters. Return ONLY a JSON object with this exact structure (no markdown, no backticks):
{
  "name": "Country Name",
  "flag": "🏳️",
  "region": "Region Name",
  "capital": "Capital City",
  "cities": "City1, City2, City3",
  "languages": "Languages spoken",
  "population": "X million",
  "food": ["emoji Fact 1", "emoji Fact 2", "emoji Fact 3", "emoji Fact 4"],
  "festivals": ["emoji Festival 1", "emoji Festival 2", "emoji Festival 3", "emoji Festival 4"],
  "school": ["emoji School fact 1", "emoji School fact 2", "emoji School fact 3", "emoji School fact 4"],
  "topics": ["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5"],
  "tips": ["Tip 1", "Tip 2", "Tip 3"]
}`
    } else if (type === 'chat') {
      systemPrompt = `You are a warm friendly cultural guide helping students learn about ${country} before writing pen pal letters. Keep responses concise (2-4 sentences), age-appropriate, and focused on things that help students connect with a pen pal. Use an occasional emoji.`
      prompt = message
    }

    const messages = type === 'chat' && history
      ? [...history, { role: 'user', content: prompt }]
      : [{ role: 'user', content: prompt }]

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: type === 'info' ? 1500 : 600,
        ...(systemPrompt ? { system: systemPrompt } : {}),
        messages
      })
    })

    const data = await response.json()
    const text = data.content[0].text

    if (type === 'info') {
      const clean = text.replace(/```json|```/g, '').trim()
      return res.status(200).json({ result: JSON.parse(clean) })
    } else {
      return res.status(200).json({ result: text })
    }
  } catch(e) {
    return res.status(500).json({ error: e.message })
  }
}
