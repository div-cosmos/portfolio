// Handles the contact form. Runs as a Vercel function (Node 18+).
//
// Every submission does three things:
//   1. Saves the message to Supabase. This is the one that has to work.
//   2. Emails me via Resend
//   3. Pings my WhatsApp via CallMeBot
//
// The email and WhatsApp are "nice to have". If either one hiccups, we don't
// fail the whole request. As long as the message got saved, the visitor sees
// a success, and I can always read it in Supabase.

const {
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  RESEND_API_KEY,
  RESEND_FROM,
  CONTACT_TO_EMAIL,
  CALLMEBOT_PHONE,
  CALLMEBOT_APIKEY,
} = process.env

const isEmail = v => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const clean = (v, max = 2000) => String(v ?? '').trim().slice(0, max)

// Basic rate limit: a few requests per IP per minute, kept in memory.
// Vercel spins functions up and down, so this memory doesn't stick around for
// long. It'll catch someone hammering a warm instance, but it's not bulletproof.
// Together with the honeypot it's plenty for a portfolio. If spam ever gets
// real, move this into Supabase or Redis.
const RATE = { windowMs: 60_000, max: 3 }
const hits = new Map() // ip -> timestamp[]

function rateLimited(ip) {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < RATE.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 500) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t >= RATE.windowMs)) hits.delete(k)
    }
  }
  return recent.length > RATE.max
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body || {}

  // The honeypot field is invisible to people, so if it's filled in we're
  // almost certainly looking at a bot. Pretend everything went fine (200) so it
  // doesn't go looking for another way in, but quietly drop the message.
  if (clean(body.company, 200)) {
    return res.status(200).json({ ok: true })
  }

  // Figure out who's calling and rate-limit them.
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const phone = clean(body.phone, 40)
  const subject = clean(body.subject, 200) || 'Portfolio Inquiry'
  const message = clean(body.message, 5000)

  // Need at least a name, something that looks like an email, and a message.
  if (!name || !isEmail(email) || !message) {
    return res.status(400).json({ error: 'Please provide your name, a valid email, and a message.' })
  }

  // 1. Save it to Supabase first. Everything else is secondary.
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/contact_messages`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ name, email, phone, subject, message }),
    })
    if (!r.ok) {
      const detail = await r.text()
      console.error('Supabase insert failed:', r.status, detail)
      return res.status(500).json({ error: 'Could not save your message. Please try again.' })
    }
  } catch (err) {
    console.error('Supabase request error:', err)
    return res.status(500).json({ error: 'Could not save your message. Please try again.' })
  }

  // 2 + 3. Send the email and WhatsApp side by side; don't let them hold up
  // the response, and don't let one failing take down the other.
  await Promise.allSettled([
    sendEmail({ name, email, phone, subject, message }),
    sendWhatsApp({ name, email, phone, subject, message }),
  ])

  return res.status(200).json({ ok: true })
}

async function sendEmail({ name, email, phone, subject, message }) {
  if (!RESEND_API_KEY || !RESEND_FROM || !CONTACT_TO_EMAIL) return
  const html = `
    <h2>New portfolio message</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone) || 'Not provided'}</p>
    <p><strong>Subject:</strong> ${esc(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${esc(message).replace(/\n/g, '<br>')}</p>
  `
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject: `Portfolio: ${subject}`,
      html,
    }),
  })
  if (!r.ok) console.error('Resend failed:', r.status, await r.text())
}

async function sendWhatsApp({ name, email, phone, subject, message }) {
  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) return
  const text =
    `📨 New portfolio message\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Phone: ${phone || 'Not provided'}\n` +
    `Subject: ${subject}\n\n` +
    `${message}`
  const url =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${encodeURIComponent(CALLMEBOT_PHONE)}` +
    `&text=${encodeURIComponent(text)}` +
    `&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`
  const r = await fetch(url)
  if (!r.ok) console.error('CallMeBot failed:', r.status, await r.text())
}

// Keep stray < > & from breaking (or injecting into) the email HTML.
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
