import { useState } from 'react'
import { apiPost } from '../api'

const topics = [
  { value: 'advisory', label: 'Crop / soil advisory' },
  { value: 'scheme', label: 'Scheme or subsidy' },
  { value: 'market', label: 'Market / mandi' },
  { value: 'training', label: 'Training or demo' },
  { value: 'other', label: 'Other' },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    district: '',
    topic: 'advisory',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)

  function onChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setSending(true)
    setError(null)
    setStatus(null)
    try {
      const res = await apiPost('/inquiries', form)
      setStatus(res.message)
      setForm({ name: '', phone: '', district: '', topic: 'advisory', message: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section section-alt">
      <div className="wrap">
        <h1 className="page-title">Reach the support desk</h1>
        <p className="muted" style={{ marginBottom: '1.5rem', maxWidth: '36rem' }}>
          In a full deployment this form would notify your call centre or block agriculture office. Here it
          stores enquiries in the Laravel database for demonstration.
        </p>
        {status && <div className="success-box" style={{ marginBottom: '1rem' }}>{status}</div>}
        {error && <div className="error-box" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={onSubmit} className="card form-grid" style={{ maxWidth: '34rem' }}>
          <div>
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" value={form.name} onChange={onChange} required autoComplete="name" />
          </div>
          <div>
            <label htmlFor="phone">Mobile number</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={onChange}
              required
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="district">District (optional)</label>
            <input id="district" name="district" value={form.district} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic" value={form.topic} onChange={onChange}>
              {topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="message">How can we help?</label>
            <textarea id="message" name="message" value={form.message} onChange={onChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Sending…' : 'Submit enquiry'}
          </button>
        </form>
      </div>
    </section>
  )
}
