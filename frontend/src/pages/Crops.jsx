import { useEffect, useState } from 'react'
import { apiGet } from '../api'

const categories = [
  { id: '', label: 'All' },
  { id: 'cereals', label: 'Cereals' },
  { id: 'pulses', label: 'Pulses' },
  { id: 'horticulture', label: 'Horticulture' },
  { id: 'oilseeds', label: 'Oilseeds' },
]

export default function Crops() {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [cat, setCat] = useState('')

  useEffect(() => {
    setLoading(true)
    const q = cat ? `?category=${encodeURIComponent(cat)}` : ''
    apiGet(`/crops${q}`)
      .then(setCrops)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [cat])

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Crop knowledge base</h1>
        <p className="muted" style={{ marginBottom: '1.5rem', maxWidth: '40rem' }}>
          Seasonal notes and regional hints curated for mixed farming systems — extend this list from your own
          agronomy team.
        </p>
        <div className="filters">
          {categories.map((c) => (
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
        {loading && <div className="loading">Loading crops…</div>}
        {err && <div className="error-box">Could not load crops. Is the API running?</div>}
        {!loading && !err && (
          <div className="crop-grid">
            {crops.map((crop) => (
              <article key={crop.id} className="card crop-card">
                {crop.image_url ? (
                  <img src={crop.image_url} alt="" loading="lazy" />
                ) : (
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: 'var(--color-bg-alt)',
                      display: 'grid',
                      placeItems: 'center',
                      color: 'var(--color-muted)',
                    }}
                  >
                    No image
                  </div>
                )}
                <div className="crop-card-body">
                  <span className="pill">{crop.category}</span>
                  <h3 style={{ marginTop: '0.5rem' }}>{crop.name}</h3>
                  <p className="muted" style={{ fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                    {crop.season && <>{crop.season} · </>}
                    {crop.region_hint}
                  </p>
                  <p style={{ marginBottom: 0, fontSize: '0.95rem' }}>{crop.description}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
