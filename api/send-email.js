// Lingua Letters — Email notification function
// Runs securely on Vercel servers, never exposed to the browser

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, to, data } = req.body

  if (!type || !to) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' })
  }

  // Build the email based on type
  let subject = ''
  let html = ''

  if (type === 'flag_parent') {
    subject = '⚠ Lingua Letters — A letter from ' + data.childName + ' was flagged'
    html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:20px;">
        <div style="background:#1D9E75;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:32px;height:32px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">✉</div>
            <span style="color:white;font-size:18px;font-weight:500;">Lingua Letters</span>
          </div>
        </div>
        <h2 style="font-size:20px;font-weight:500;color:#1a1a1a;margin-bottom:8px;">A letter was flagged</h2>
        <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;">
          A letter written by <strong>${data.childName}</strong> was flagged by our AI safety system and <strong>was not delivered</strong> to their pen pal.
        </p>
        <div style="background:#FAEEDA;border:1px solid #FAC775;border-radius:10px;padding:16px;margin-bottom:20px;">
          <div style="font-size:12px;font-weight:500;color:#854F0B;margin-bottom:6px;">⚠ Flag reason</div>
          <div style="font-size:13px;color:#633806;">${data.reason}</div>
          ${data.explanation ? `
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid #FAC775;">
            <div style="font-size:12px;font-weight:500;color:#854F0B;margin-bottom:4px;">${data.childName}'s explanation</div>
            <div style="font-size:13px;color:#633806;font-style:italic;">"${data.explanation}"</div>
          </div>` : ''}
        </div>
        <p style="color:#555;font-size:13px;line-height:1.6;margin-bottom:20px;">
          The letter is being held and will not be delivered until you review it. You can waive the flag or uphold it from your parent dashboard.
        </p>
        <a href="https://lingua-letters-x2ro.vercel.app/parent.html" style="display:inline-block;background:#1D9E75;color:white;text-decoration:none;border-radius:9px;padding:12px 24px;font-size:14px;font-weight:500;">Review in dashboard →</a>
        <p style="color:#aaa;font-size:11px;margin-top:24px;line-height:1.5;">
          You are receiving this because you are connected as a parent or guardian on Lingua Letters.<br>
          The letter has not been sent and your child's teacher has also been notified.
        </p>
      </div>`
  }

  else if (type === 'flag_teacher') {
    subject = '⚠ Lingua Letters — Letter flagged: ' + data.studentName
    html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:20px;">
        <div style="background:#1D9E75;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <span style="color:white;font-size:18px;font-weight:500;">✉ Lingua Letters</span>
        </div>
        <h2 style="font-size:20px;font-weight:500;color:#1a1a1a;margin-bottom:8px;">Letter flagged — review needed</h2>
        <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;">
          A letter from <strong>${data.studentName}</strong> was flagged by AI and is waiting for your review.
        </p>
        <div style="background:#FAEEDA;border:1px solid #FAC775;border-radius:10px;padding:16px;margin-bottom:20px;">
          <div style="font-size:12px;font-weight:500;color:#854F0B;margin-bottom:6px;">⚠ Reason</div>
          <div style="font-size:13px;color:#633806;">${data.reason}</div>
        </div>
        <p style="color:#555;font-size:13px;margin-bottom:20px;">The parent has also been notified. The letter is held until you act on it.</p>
        <a href="https://lingua-letters-x2ro.vercel.app/teacher.html" style="display:inline-block;background:#1D9E75;color:white;text-decoration:none;border-radius:9px;padding:12px 24px;font-size:14px;font-weight:500;">Review in dashboard →</a>
      </div>`
  }

  else if (type === 'flag_student') {
    subject = '⚠ Lingua Letters — Your letter was flagged'
    html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:20px;">
        <div style="background:#1D9E75;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <span style="color:white;font-size:18px;font-weight:500;">✉ Lingua Letters</span>
        </div>
        <h2 style="font-size:20px;font-weight:500;color:#1a1a1a;margin-bottom:8px;">Your letter was flagged</h2>
        <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;">
          Hi ${data.studentName}, a letter you wrote was flagged by our AI safety system and <strong>was not delivered</strong> to your pen pal.
        </p>
        <div style="background:#FAEEDA;border:1px solid #FAC775;border-radius:10px;padding:16px;margin-bottom:20px;">
          <div style="font-size:12px;font-weight:500;color:#854F0B;margin-bottom:6px;">Reason</div>
          <div style="font-size:13px;color:#633806;">${data.reason}</div>
        </div>
        <p style="color:#555;font-size:13px;line-height:1.6;margin-bottom:20px;">
          Your ${data.reviewedBy} has been notified and will review it. If you think this was a mistake you can log in and write a short explanation.
        </p>
        <a href="https://lingua-letters-x2ro.vercel.app/inbox.html" style="display:inline-block;background:#1D9E75;color:white;text-decoration:none;border-radius:9px;padding:12px 24px;font-size:14px;font-weight:500;">Go to Lingua Letters →</a>
      </div>`
  }

  else if (type === 'new_letter') {
    subject = '📬 Lingua Letters — ' + data.fromName + ' sent you a letter!'
    html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:20px;">
        <div style="background:#1D9E75;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <span style="color:white;font-size:18px;font-weight:500;">✉ Lingua Letters</span>
        </div>
        <h2 style="font-size:20px;font-weight:500;color:#1a1a1a;margin-bottom:8px;">You have a new letter! 🎉</h2>
        <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;">
          <strong>${data.fromName}</strong> from ${data.fromCountry} sent you a letter titled <strong>"${data.subject}"</strong>.
        </p>
        <div style="background:#F8F7F4;border:1px solid #e5e3dc;border-radius:10px;padding:16px;margin-bottom:20px;">
          <div style="font-size:12px;color:#aaa;margin-bottom:6px;">Preview</div>
          <div style="font-size:13px;color:#555;font-style:italic;line-height:1.6;">"${data.preview}..."</div>
        </div>
        <a href="https://lingua-letters-x2ro.vercel.app/inbox.html" style="display:inline-block;background:#1D9E75;color:white;text-decoration:none;border-radius:9px;padding:12px 24px;font-size:14px;font-weight:500;">Read your letter →</a>
        <p style="color:#aaa;font-size:11px;margin-top:24px;">Remember — one thoughtful letter a day goes a long way!</p>
      </div>`
  }

  else if (type === 'connection_approval') {
    subject = '🌍 Lingua Letters — New pen pal match needs your approval'
    html = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:20px;">
        <div style="background:#1D9E75;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
          <span style="color:white;font-size:18px;font-weight:500;">✉ Lingua Letters</span>
        </div>
        <h2 style="font-size:20px;font-weight:500;color:#1a1a1a;margin-bottom:8px;">New pen pal match — your approval needed</h2>
        <p style="color:#555;font-size:14px;line-height:1.6;margin-bottom:20px;">
          <strong>${data.teacherName}</strong> has proposed matching <strong>${data.childName}</strong> with a pen pal:
        </p>
        <div style="background:#E6F1FB;border:1px solid #B5D4F4;border-radius:10px;padding:16px;margin-bottom:20px;">
          <div style="font-size:14px;font-weight:500;color:#0C447C;margin-bottom:4px;">${data.palName}</div>
          <div style="font-size:13px;color:#555;">Age ${data.palAge} · ${data.palCity}, ${data.palCountry}</div>
          <div style="font-size:12px;color:#888;margin-top:6px;font-style:italic;">"${data.teacherNote}"</div>
        </div>
        <a href="https://lingua-letters-x2ro.vercel.app/parent.html" style="display:inline-block;background:#1D9E75;color:white;text-decoration:none;border-radius:9px;padding:12px 24px;font-size:14px;font-weight:500;">Review and approve →</a>
      </div>`
  }

  if (!subject || !html) {
    return res.status(400).json({ error: 'Unknown email type' })
  }

  // Send via Resend
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: from: 'Lingua Letters <onboarding@resend.dev>',
        to: [to],
        subject,
        html
      })
    })

    const result = await response.json()

    if (!response.ok) {
      return res.status(500).json({ error: result.message || 'Failed to send email' })
    }

    return res.status(200).json({ success: true, id: result.id })

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
