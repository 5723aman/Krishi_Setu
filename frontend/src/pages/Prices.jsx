import { useEffect, useState } from 'react'
import { apiGet } from '../api'

export default function Prices() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)

  useEffect(() => {
    apiGet('/market-prices')
      .then(setRows)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="page-title">Indicative mandi prices</h1>
        <p className="muted" style={{ marginBottom: '1.5rem', maxWidth: '42rem' }}>
          Reference quotes for negotiation and planning — replace with live APMC integrations or your state
          agriculture department feed in production.
        </p>
        {loading && <div className="loading">Loading prices…</div>}
        {err && <div className="error-box">Could not load prices. Is the API running?</div>}
        {!loading && !err && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Mandi</th>
                  <th>State</th>
                  <th>Price / quintal</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <strong>{r.crop?.name}</strong>
                      <div className="muted" style={{ fontSize: '0.8rem' }}>
                        {r.crop?.category}
                      </div>
                    </td>
                    <td>{r.mandi_name}</td>
                    <td>{r.state ?? '—'}</td>
                    <td>
                      ₹ {Number(r.price_per_quintal).toLocaleString('en-IN')}
                      <span className="muted" style={{ fontSize: '0.8rem' }}>
                        {' '}
                        {r.unit}
                      </span>
                    </td>
                    <td>{String(r.price_date).slice(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
