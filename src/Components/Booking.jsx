import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ClipboardList, Mail, Package, Send, UserRound } from 'lucide-react'

const initial = { name: '', company: '', pickup: '', delivery: '', pickupDate: '', freightType: '', pallets: '', weight: '', dimensions: '', email: '', phone: '', notes: '', website: '' }

function AddressAutocomplete({ label, name, value, onChange, required }) {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const listId = `${name}-suggestions`
  const requestId = useRef(0)
  const selectedValue = useRef(null)
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY

  useEffect(() => {
    const query = value.trim()
    if (selectedValue.current === value) {
      selectedValue.current = null
      return
    }
    if (query.length < 3) {
      setSuggestions([])
      setIsOpen(false)
      setLoading(false)
      return
    }
    if (!apiKey) {
      setSuggestions([])
      setIsOpen(false)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    const currentRequest = ++requestId.current
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({ text: query, limit: '10', lang: 'en', filter: 'rect:-139.06,48.3,-114.03,60|countrycode:ca', apiKey })
        const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?${params}`, { signal: controller.signal })
        if (!response.ok) throw new Error('Address search unavailable')
        const data = await response.json()
        if (currentRequest !== requestId.current) return
        setSuggestions((data.features || []).filter(({ properties = {} }) => properties.state_code?.toUpperCase() === 'BC' || properties.state?.toLowerCase() === 'british columbia').map(({ properties }) => properties.formatted).filter(Boolean).slice(0, 5))
        setActiveIndex(-1)
        setIsOpen(true)
      } catch (error) {
        if (error.name !== 'AbortError') setSuggestions([])
      } finally {
        if (currentRequest === requestId.current) setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [value, apiKey])

  const choose = (address) => {
    selectedValue.current = address
    onChange({ target: { name, value: address } })
    setSuggestions([])
    setIsOpen(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (event) => {
    if (!isOpen || suggestions.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index <= 0 ? suggestions.length - 1 : index - 1))
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault()
      choose(suggestions[activeIndex])
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return <div className="field address-field">
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} type="text" value={value} onChange={onChange} onKeyDown={handleKeyDown} onFocus={() => suggestions.length && setIsOpen(true)} onBlur={() => setTimeout(() => setIsOpen(false), 100)} required={required} placeholder="Start typing an address or city" autoComplete="street-address" role="combobox" aria-autocomplete="list" aria-expanded={isOpen} aria-controls={listId} aria-activedescendant={activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined} />
    {isOpen && suggestions.length > 0 && <ul className="address-suggestions" id={listId} role="listbox">
      {suggestions.map((address, index) => <li key={`${address}-${index}`} role="presentation"><button id={`${listId}-${index}`} type="button" role="option" aria-selected={activeIndex === index} className={activeIndex === index ? 'is-active' : ''} onMouseDown={(event) => event.preventDefault()} onClick={() => choose(address)}>{address}</button></li>)}
      <li className="address-attribution" role="presentation"><a href="https://www.geoapify.com/" target="_blank" rel="noreferrer">Powered by Geoapify</a> | <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a></li>
    </ul>}
    {loading && <span className="address-hint" role="status">Searching addresses...</span>}
  </div>
}

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
  return <section className="section section--soft"><div className="container form-shell"><div><span className="eyebrow">Start a conversation</span><h1 className="section-title">Tell us what needs moving.</h1><p className="section-copy">Give our dispatch team the details and we’ll get back to you with a practical freight quote.</p><ul className="feature-list"><li><CheckCircle2 size={18} /> No obligation, clear next steps</li><li><CheckCircle2 size={18} /> Pickup planning around your schedule</li><li><CheckCircle2 size={18} /> Direct support from a real freight team</li></ul><a className="contact-detail" href="mailto:info@a11freight.ca"><Mail size={18} /> info@a11freight.ca</a></div><form className="form-card" onSubmit={submit}><input className="form-honeypot" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" aria-hidden="true" /><h3>Request a freight quote</h3><p>Fields marked with an asterisk help us quote accurately.</p><div className="form-section-title"><ClipboardList size={15} /> Shipment</div><div className="form-grid"><AddressAutocomplete label="Pickup location *" name="pickup" value={form.pickup} onChange={update} required /><AddressAutocomplete label="Delivery location *" name="delivery" value={form.delivery} onChange={update} required />{field('Pickup date', 'pickupDate', 'date')}{field('Freight type', 'freightType', 'text', { select: true })}{field('Pallets / pieces', 'pallets', 'number', { placeholder: 'e.g. 12' })}{field('Weight (lb)', 'weight', 'number', { placeholder: 'Approximate weight' })}{field('Dimensions', 'dimensions', 'text', { full: true, placeholder: 'Length x width x height' })}</div><div className="form-section-title"><UserRound size={15} /> Customer</div><div className="form-grid">{field('Contact name *', 'name', 'text', { required: true })}{field('Company name', 'company')}{field('Phone *', 'phone', 'tel', { required: true })}{field('Email *', 'email', 'email', { required: true })}</div><div className="form-section-title"><Package size={15} /> Notes</div><div className="form-grid"><div className="field field--full"><label htmlFor="notes">Additional details</label><textarea id="notes" name="notes" value={form.notes} onChange={update} placeholder="Anything our dispatch team should know?" /></div></div><button className="btn btn-primary form-submit" type="submit" disabled={status === 'submitting'}><Send size={15} /> {status === 'submitting' ? 'Sending…' : 'Send quote request'}</button>{message && <p className={`form-status ${status}`} role={status === 'error' ? 'alert' : 'status'}>{message}</p>}</form></div></section>
}
