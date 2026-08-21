/* global process */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const clean = (value, max = 500) => String(value || '').trim().slice(0, max)
const escapeHtml = (value) => clean(value, 5000).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char])

export default async function handler(request, response) {
  if (request.method !== 'POST') { response.setHeader('Allow', 'POST'); return response.status(405).json({ error: 'Method not allowed.' }) }
  try {
    const origins = String(process.env.QUOTE_ALLOWED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean)
    const origin = request.headers?.origin
    if (origins.length && origin && !origins.includes(origin)) return response.status(403).json({ error: 'This website is not allowed to submit quote requests.' })
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : (request.body || {})
    if (clean(body.website)) return response.status(200).json({ ok: true })
    const name = clean(body.name, 120), email = clean(body.email, 254).toLowerCase(), phone = clean(body.phone, 60), pickup = clean(body.pickup, 180), delivery = clean(body.delivery, 180)
    if (!name || !phone || !pickup || !delivery || !EMAIL_PATTERN.test(email)) return response.status(400).json({ error: 'Please complete all required fields with a valid email address.' })
    const apiKey = process.env.RESEND_API_KEY, fromEmail = clean(process.env.RESEND_FROM_EMAIL, 254), recipient = clean(process.env.QUOTE_RECIPIENT_EMAIL || fromEmail, 254), fromName = clean(process.env.RESEND_FROM_NAME || 'A11 Freight', 100)
    if (!apiKey || !EMAIL_PATTERN.test(fromEmail) || !EMAIL_PATTERN.test(recipient)) throw new Error('Resend is not configured.')
    const details = [['Name', name], ['Company', clean(body.company, 160) || 'Not provided'], ['Email', email], ['Phone', phone], ['Pickup', pickup], ['Delivery', delivery], ['Pickup date', clean(body.pickupDate, 30) || 'Not provided'], ['Freight type', clean(body.freightType, 80) || 'Not specified'], ['Pallets / pieces', clean(body.pallets, 30) || 'Not provided'], ['Weight (lb)', clean(body.weight, 30) || 'Not provided'], ['Dimensions', clean(body.dimensions, 160) || 'Not provided'], ['Notes', clean(body.notes, 3000) || 'None']]
    const rows = details.map(([label, value]) => `<tr><th style="padding:8px;text-align:left;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`).join('')
    const resendResponse = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: `${fromName} <${fromEmail}>`, to: [recipient], reply_to: email, subject: `New freight quote request — ${name}`, html: `<h2>New website freight quote request</h2><table style="border-collapse:collapse">${rows}</table>` }) })
    if (!resendResponse.ok) { console.error('Resend email failed:', resendResponse.status, await resendResponse.text()); throw new Error('The email service rejected the request.') }
    const result = await resendResponse.json()
    return response.status(200).json({ ok: true, id: result.id })
  } catch (error) {
    console.error('Quote submission failed:', error)
    return response.status(500).json({ error: 'We could not send your request. Please try again or email info@a11freight.com.' })
  }
}
