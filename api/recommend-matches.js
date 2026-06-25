export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { currentUser, candidates, accountType } = req.body

  if (!currentUser || !candidates || candidates.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const prefs = currentUser.match_preferences || {}

  const prefSummary = Object.keys(prefs).length === 0
    ? 'No specific preferences set — suggest broadly compatible matches.'
    : Object.entries(prefs)
        .filter(([k]) => !k.endsWith('_value'))
        .map(([k]) => `${k}: ${prefs[k + '_value'] || 'yes'}`)
        .join(', ')

  const candidateSummary = candidates.map((c, i) => `
Candidate ${i + 1} (id: ${c.id}):
- Name: ${c.display_name || c.full_name}
- Country: ${c.school_country || 'unknown'}
- Religion: ${c.religion || 'not specified'}
- Gender: ${c.gender || 'not specified'}
- Grade level: ${c.grade_level || 'n/a'}
- Teaching style: ${(c.teaching_style || []).join(', ') || 'n/a'}
- Learning language: ${c.learning_language || 'n/a'}
- Bio: ${c.bio ? c.bio.slice(0, 100) : 'none'}
`).join('\n')

  const prompt = `You are a matching assistant for Lingua Letters, a pen pal platform for language learners.

Current user profile:
- Name: ${currentUser.display_name || currentUser.full_name}
- Account type: ${accountType}
- Country: ${currentUser.school_country || 'unknown'}
- Religion: ${currentUser.religion || 'not specified'}
- Gender: ${currentUser.gender || 'not specified'}
- Grade level: ${currentUser.grade_level || 'n/a'}
- Teaching style: ${(currentUser.teaching_style || []).join(', ') || 'n/a'}
- Learning language: ${currentUser.learning_language || 'n/a'}
- Bio: ${currentUser.bio ? currentUser.bio.slice(0, 100) : 'none'}
- Match preferences: ${prefSummary}

Candidates to rank:
${candidateSummary}

Rank the top 3 candidates most compatible with this user based on their preferences and profile. Consider shared values, complementary locations (different countries are good for pen pals!), similar age groups, and stated preferences.

Respond with ONLY a JSON array of the top 3 candidate ids in order of best match, with a one-sentence reason for each. No markdown, no extra text:
[
  {"id": "candidate-id-here", "reason": "one sentence why they match"},
  {"id": "candidate-id-here", "reason": "one sentence why they match"},
  {"id": "candidate-id-here", "reason": "one sentence why they match"}
]

If fewer than 3 candidates exist, return however many there are.`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()
    const text = data.content[0].text.replace(/```json|```/g, '').trim()
    const recommendations = JSON.parse(text)

    return res.status(200).json({ recommendations })
  } catch (e) {
    return res.status(200).json({ recommendations: [] })
  }
}
