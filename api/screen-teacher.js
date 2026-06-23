export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { teacherId, displayName, schoolName, schoolCountry, bio, gradeLevel } = req.body

  if (!teacherId) return res.status(400).json({ error: 'Missing teacherId' })

  const prompt = `You are screening a teacher who signed up for Lingua Letters, a pen pal platform for language learners. Your job is to determine if this appears to be a legitimate teacher at a real school.

Teacher details:
- Name: ${displayName || 'Not provided'}
- School: ${schoolName || 'Not provided'}
- Country: ${schoolCountry || 'Not provided'}
- Grade level: ${gradeLevel || 'Not provided'}
- Bio: ${bio || 'Not provided'}

Evaluate this teacher and respond with ONLY a JSON object (no markdown, no extra text):
{
  "status": "approved" or "flagged" or "rejected",
  "notes": "brief reason for your decision (1-2 sentences)"
}

Guidelines:
- "approved" = looks like a real teacher at a plausible school, bio makes sense
- "flagged" = something seems off but could be legitimate (e.g. no bio, vague school name) — needs human review
- "rejected" = clearly fake, spam, inappropriate, or harmful content in bio
- Most teachers should be approved or flagged, not rejected
- Do not reject just because you can't verify the school — give benefit of the doubt
- Only reject if there are clear red flags like offensive content or obvious spam`

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
        max_tokens: 200,
        messages: [{ role: 'user', content: prompt }]
      })
    })

    const data = await response.json()
    const text = data.content[0].text.replace(/```json|```/g, '').trim()
    const result = JSON.parse(text)

    // Update the teacher's screening status in Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    await fetch(`${supabaseUrl}/rest/v1/users?id=eq.${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        screening_status: result.status,
        screening_notes: result.notes,
        screening_date: new Date().toISOString()
      })
    })

    return res.status(200).json(result)

  } catch (e) {
    // If screening fails, default to flagged so a human can review
    return res.status(200).json({ status: 'flagged', notes: 'Automatic screening failed — needs manual review.' })
  }
}
