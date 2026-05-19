import { useEffect, useState } from 'react'
import { apiGet } from '../api'

export default function Schemes() {
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    apiGet('/schemes')
      .then(setSchemes)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Government programmes</h1>
        <p className="muted" style={{ marginBottom: '1.5rem', maxWidth: '42rem' }}>
          Plain-language snapshots — always verify eligibility and budgets on the official portal before
          applying.
        </p>
        {loading && <div className="loading">Loading schemes…</div>}
        {err && <div className="error-box">Could not load schemes.</div>}
        {!loading && !err && (
          <div className="grid-3">
            {schemes.map((s) => (
              <article key={s.id} className="card scheme-card">
                <h3>{s.title}</h3>
                <div className="dept">{s.department}</div>
                <p>{s.summary}</p>
                {s.eligibility && (
                  <p className="muted" style={{ fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--color-ink)' }}>Eligibility: </strong>
                    {s.eligibility}
                  </p>
                )}
                {s.benefits && (
                  <p className="muted" style={{ fontSize: '0.9rem', marginBottom: 0 }}>
                    <strong style={{ color: 'var(--color-ink)' }}>Benefits: </strong>
                    {s.benefits}
                  </p>
                )}
                {s.more_info_url && (
                  <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>
                    <a href={s.more_info_url} target="_blank" rel="noreferrer">
                      Official site →
                    </a>
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
