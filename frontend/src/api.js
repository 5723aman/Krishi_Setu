const base =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') ||
  (import.meta.env.DEV ? '/api' : 'http://127.0.0.1:8000/api')

export async function apiGet(path) {
  const res = await fetch(`${base}${path.startsWith('/') ? path : `/${path}`}`, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export async function apiPost(path, body) {
  const res = await fetch(`${base}${path.startsWith('/') ? path : `/${path}`}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const fromFields = data.errors
      ? Object.values(data.errors)
          .flat()
          .find(Boolean)
      : null
    const msg =
      fromFields || data.message || data.error || res.statusText || 'Request failed'
    throw new Error(typeof msg === 'string' ? msg : 'Request failed')
  }
  return data
}
