import { useState } from 'react'
import { CheckCircle2, ClipboardList, Mail, Package, Send, UserRound } from 'lucide-react'

const initial = { name: '', company: '', pickup: '', delivery: '', pickupDate: '', freightType: '', pallets: '', weight: '', dimensions: '', email: '', phone: '', notes: '', website: '' }

export default function Booking() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = async (event) => {
    event.preventDefault()
    setStatus('submitting')
    setMessage('Sending your quote request…')
    try {
      const response = await fetch('/api/quote-resend.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || 'Your request could not be sent. Please try again.')
      setStatus('success')
      setMessage('Thanks. Your request was sent to our dispatch team. We’ll be in touch shortly.')
      setForm(initial)
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }
  const field = (label, name, type = 'text', options = {}) => <div className={`field ${options.full ? 'field--full' : ''}`}><label htmlFor={name}>{label}</label>{options.select ? <select id={name} name={name} value={form[name]} onChange={update}><option value="">Select freight type</option><option>Full Truckload (FTL)</option><option>Less Than Truckload (LTL)</option><option>Pallet freight</option><option>Same-day local delivery</option></select> : <input id={name} name={name} type={type} value={form[name]} onChange={update} required={options.required} placeholder={options.placeholder} />}</div>
  return <section className="section section--soft"><div className="container form-shell"><div><span className="eyebrow">Start a conversation</span><h1 className="section-title">Tell us what needs moving.</h1><p className="section-copy">Give our dispatch team the details and we’ll get back to you with a practical freight quote.</p><ul className="feature-list"><li><CheckCircle2 size={18} /> No obligation, clear next steps</li><li><CheckCircle2 size={18} /> Pickup planning around your schedule</li><li><CheckCircle2 size={18} /> Direct support from a real freight team</li></ul><a className="contact-detail" href="mailto:info@a11freight.com"><Mail size={18} /> info@a11freight.com</a></div><form className="form-card" onSubmit={submit}><input className="form-honeypot" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" aria-hidden="true" /><h3>Request a freight quote</h3><p>Fields marked with an asterisk help us quote accurately.</p><div className="form-section-title"><ClipboardList size={15} /> Shipment</div><div className="form-grid">{field('Pickup location *', 'pickup', 'text', { required: true, placeholder: 'City or postal code' })}{field('Delivery location *', 'delivery', 'text', { required: true, placeholder: 'City or postal code' })}{field('Pickup date', 'pickupDate', 'date')}{field('Freight type', 'freightType', 'text', { select: true })}{field('Pallets / pieces', 'pallets', 'number', { placeholder: 'e.g. 12' })}{field('Weight (lb)', 'weight', 'number', { placeholder: 'Approximate weight' })}{field('Dimensions', 'dimensions', 'text', { full: true, placeholder: 'Length x width x height' })}</div><div className="form-section-title"><UserRound size={15} /> Customer</div><div className="form-grid">{field('Contact name *', 'name', 'text', { required: true })}{field('Company name', 'company')}{field('Phone *', 'phone', 'tel', { required: true })}{field('Email *', 'email', 'email', { required: true })}</div><div className="form-section-title"><Package size={15} /> Notes</div><div className="form-grid"><div className="field field--full"><label htmlFor="notes">Additional details</label><textarea id="notes" name="notes" value={form.notes} onChange={update} placeholder="Anything our dispatch team should know?" /></div></div><button className="btn btn-primary form-submit" type="submit" disabled={status === 'submitting'}><Send size={15} /> {status === 'submitting' ? 'Sending…' : 'Send quote request'}</button>{message && <p className={`form-status ${status}`} role={status === 'error' ? 'alert' : 'status'}>{message}</p>}</form></div></section>
}
