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

const updateData = {
      screening_status: result.status,
      screening_notes: result.notes,
      screening_date: new Date().toISOString()
    }

    // Auto-suspend rejected accounts
    if (result.status === 'rejected') {
      updateData.is_suspended = true
    }

    await fetch(`${supabaseUrl}/rest/v1/users?id=eq.${teacherId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(updateData)
    })

    // If rejected, send suspension email via Resend
    if (result.status === 'rejected') {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Lingua Letters <hello@lingualetters.com>',
          to: req.body.email || '',
          subject: 'Your Lingua Letters teacher account',
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="width:48px;height:48px;border-radius:50%;background:#1D9E75;display:inline-flex;align-items:center;justify-content:center;font-size:22px;">✉</div>
                <h1 style="font-size:20px;font-weight:500;color:#1a1a1a;margin:16px 0 4px;">Lingua Letters</h1>
              </div>
              <div style="background:white;border-radius:16px;padding:32px;border:1px solid #e5e3dc;">
                <h2 style="font-size:18px;font-weight:500;color:#1a1a1a;margin:0 0 12px;">Account review update</h2>
                <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 16px;">Thank you for signing up for Lingua Letters. Unfortunately our automated review was unable to verify your teacher account at this time.</p>
                <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 16px;">Reason: ${result.notes}</p>
                <p style="font-size:14px;color:#555;line-height:1.6;margin:0;">If you believe this is a mistake, please reply to this email with your school name, country, and a brief description of your role and we will review your account manually.</p>
              </div>
            </div>
          `
        })
      })
    }

    // If approved, send welcome email
    if (result.status === 'approved') {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Lingua Letters <hello@lingualetters.com>',
          to: req.body.email || '',
          subject: 'Welcome to Lingua Letters — your account is verified!',
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;">
              <div style="text-align:center;margin-bottom:32px;">
                <div style="width:48px;height:48px;border-radius:50%;background:#1D9E75;display:inline-flex;align-items:center;justify-content:center;font-size:22px;">✉</div>
                <h1 style="font-size:20px;font-weight:500;color:#1a1a1a;margin:16px 0 4px;">Lingua Letters</h1>
              </div>
              <div style="background:white;border-radius:16px;padding:32px;border:1px solid #e5e3dc;">
                <h2 style="font-size:18px;font-weight:500;color:#1a1a1a;margin:0 0 12px;">Your account is verified! ✓</h2>
                <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 16px;">Great news — your Lingua Letters teacher account has been verified. You now have full access to the teacher network, class matching, and all platform features.</p>
                <a href="https://lingualetters.com/dashboard.html" style="display:block;background:#1D9E75;color:white;text-align:center;padding:12px 24px;border-radius:9px;font-size:14px;font-weight:500;text-decoration:none;">Go to your dashboard</a>
              </div>
            </div>
          `
        })
      })
    }

    return res.status(200).json(result)

  } catch (e) {
    // If screening fails, default to flagged so a human can review
    return res.status(200).json({ status: 'flagged', notes: 'Automatic screening failed — needs manual review.' })
  }
}
