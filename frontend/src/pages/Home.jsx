import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api'

export default function Home() {
  const [stats, setStats] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    apiGet('/stats')
      .then(setStats)
      .catch((e) => setErr(e.message))
  }, [])

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="pill" style={{ background: 'rgba(255,255,255,0.15)', color: '#c4e538' }}>
            Agriculture &amp; rural development
          </span>
          <h1 style={{ marginTop: '1rem' }}>Smarter decisions from soil to mandi.</h1>
          <p>
            One place for crop knowledge, indicative mandi prices, agronomic advisories, and government
            schemes — designed to support extension workers and farming families in rural communities.
          </p>
          <div className="hero-actions">
            <Link to="/crops" className="btn btn-primary">
              Explore crops
            </Link>
            <Link to="/prices" className="btn btn-ghost">
              View mandi prices
            </Link>
          </div>
          {stats && (
            <div className="stats">
              <div className="stat">
                <strong>{stats.crops_catalogued}</strong>
                <span>Crops in catalogue</span>
              </div>
              <div className="stat">
                <strong>{stats.active_mandi_quotes}</strong>
                <span>Recent price quotes</span>
              </div>
              <div className="stat">
                <strong>{stats.advisories}</strong>
                <span>Extension advisories</span>
              </div>
              <div className="stat">
                <strong>{stats.schemes_listed}</strong>
                <span>Schemes highlighted</span>
              </div>
            </div>
          )}
          {err && (
            <p className="muted" style={{ marginTop: '1rem', color: '#fecaca' }}>
              Could not load live stats — start the Laravel API on port 8000.
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Why a digital layer matters</h2>
            <p>
              Timely information reduces crop risk, improves negotiation at the gate, and helps households
              access entitlements they already qualify for.
            </p>
          </div>
          <div className="grid-3">
            <article className="card">
              <span className="pill">Productivity</span>
              <h3>Practice-ready guidance</h3>
              <p>
                Short advisories on soil health, water, pests, and weather tie agronomy to the season you are
                in — not generic textbook pages.
              </p>
            </article>
            <article className="card">
              <span className="pill pill-warm">Markets</span>
              <h3>Transparent reference prices</h3>
              <p>
                Indicative mandi quotes give a bargaining anchor before you load the trolley, especially when
                you cannot visit every yard yourself.
              </p>
            </article>
            <article className="card">
              <span className="pill">Rural development</span>
              <h3>Schemes in plain language</h3>
              <p>
                Summaries of flagship programmes with eligibility hints so farmers and panchayat volunteers can
                prepare documents early.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <div className="section-head">
            <h2>Built for extension &amp; self-service</h2>
            <p>
              Field staff can open the same pages in training sessions; progressive farmers can browse on their
              own time. The API behind this UI can power SMS bots or kiosks later.
            </p>
          </div>
          <div className="card" style={{ maxWidth: '36rem' }}>
            <h3>Stack</h3>
            <p className="muted" style={{ marginBottom: 0 }}>
              React (Vite) frontend talking to a Laravel JSON API. Run{' '}
              <code style={{ fontSize: '0.9em', padding: '0.15rem 0.4rem', background: 'var(--color-bg)' }}>
                php artisan serve
              </code>{' '}
              and{' '}
              <code style={{ fontSize: '0.9em', padding: '0.15rem 0.4rem', background: 'var(--color-bg)' }}>
                npm run dev
              </code>{' '}
              together for the full experience.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
