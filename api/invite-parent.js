export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { parentEmail, studentName } = req.body

  if (!parentEmail || !studentName) return res.status(400).json({ error: 'Missing required fields' })

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Lingua Letters <hello@lingualetters.com>',
        to: parentEmail,
        subject: `${studentName} joined Lingua Letters — create your parent account`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;">
            <div style="text-align:center;margin-bottom:32px;">
              <div style="width:48px;height:48px;border-radius:50%;background:#1D9E75;display:inline-flex;align-items:center;justify-content:center;font-size:22px;">✉</div>
              <h1 style="font-size:20px;font-weight:500;color:#1a1a1a;margin:16px 0 4px;">Lingua Letters</h1>
              <p style="font-size:13px;color:#888;margin:0;">The pen pal platform for language learners</p>
            </div>
            <div style="background:white;border-radius:16px;padding:32px;border:1px solid #e5e3dc;">
              <h2 style="font-size:18px;font-weight:500;color:#1a1a1a;margin:0 0 12px;">Your child joined Lingua Letters</h2>
              <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 16px;"><strong>${studentName}</strong> just signed up for Lingua Letters — a safe pen pal platform designed to help students practice foreign languages by writing real letters to students around the world.</p>
              <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 16px;">As a parent you can:</p>
              <ul style="font-size:14px;color:#555;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>Read every letter your child sends and receives</li>
                <li>Review any letters flagged by our AI safety system</li>
                <li>Set custom safety rules for what content gets flagged</li>
                <li>Approve or block flagged letters before they're delivered</li>
              </ul>
              <p style="font-size:14px;color:#555;line-height:1.6;margin:0 0 24px;">All letters are screened by AI before delivery. Nothing inappropriate is ever sent without your review.</p>
              <a href="https://lingualetters.com/login.html" style="display:block;background:#1D9E75;color:white;text-align:center;padding:12px 24px;border-radius:9px;font-size:14px;font-weight:500;text-decoration:none;margin-bottom:16px;">Create your parent account</a>
              <p style="font-size:11px;color:#aaa;text-align:center;margin:0;">Use this email address when signing up so you're automatically linked to ${studentName}'s account.</p>
            </div>
          </div>
        `
      })
    })

    return res.status(200).json({ success: true })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
