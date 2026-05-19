import { useEffect, useState } from 'react'
import { apiGet } from '../api'

const cats = [
  { id: '', label: 'All topics' },
  { id: 'soil', label: 'Soil' },
  { id: 'weather', label: 'Weather' },
  { id: 'pest', label: 'Pest & disease' },
  { id: 'irrigation', label: 'Irrigation' },
]

export default function Advisories() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [cat, setCat] = useState('')

  useEffect(() => {
    setLoading(true)
    const q = cat ? `?category=${encodeURIComponent(cat)}` : ''
    apiGet(`/advisories${q}`)
      .then(setItems)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [cat])

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Extension advisories</h1>
        <p className="muted" style={{ marginBottom: '1.25rem', maxWidth: '40rem' }}>
          Short, actionable notes your team can read aloud in farmer meetings or push through WhatsApp
          groups.
        </p>
        <div className="filters">
          {cats.map((c) => (
            <button
              key={c.id || 'all'}
              type="button"
              className={`filter-btn ${cat === c.id ? 'active' : ''}`}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        {loading && <div className="loading">Loading advisories…</div>}
        {err && <div className="error-box">Could not load advisories.</div>}
        {!loading && !err && (
          <div className="advisory-list">
            {items.map((a) => (
              <article key={a.id} className="card">
                <span className="pill">{a.category}</span>
                <h3 style={{ marginTop: '0.5rem' }}>{a.title}</h3>
                <p style={{ marginBottom: a.body ? '0.5rem' : 0 }}>{a.summary}</p>
                {a.body && <p className="muted" style={{ marginBottom: 0, fontSize: '0.95rem' }}>{a.body}</p>}
                {a.published_at && (
                  <p className="muted" style={{ marginTop: '0.75rem', marginBottom: 0, fontSize: '0.85rem' }}>
                    Published {String(a.published_at).slice(0, 10)}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
