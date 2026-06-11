export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { letterText } = req.body

  if (!letterText) {
    return res.status(400).json({ error: 'No letter text provided' })
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'Moderation service not configured' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a content moderator for a school letter-writing platform for students aged 8-18.

Review this letter and respond ONLY with a JSON object (no markdown, no backticks):

{
  "flagged": true or false,
  "reason": "reason if flagged, empty string if not",
  "grammarNote": "one encouraging grammar tip in 1-2 sentences, or empty string",
  "translation": "English translation of the body if it is in another language, or empty string if already in English"
}

Flag if it contains: personal contact info (phone, address, email), requests to move to another platform, inappropriate language, bullying, romantic content, or requests to meet in person.

The letter:
${letterText}`
        }]
      })
    })

    const data = await response.json()
    const text = data.content[0].text
    const clean = text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(clean)
    return res.status(200).json(result)

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
