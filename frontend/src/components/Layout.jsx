import { NavLink, Outlet } from 'react-router-dom'

const linkClass = ({ isActive }) => (isActive ? 'active' : undefined)

export default function Layout() {
  return (
    <div className="layout">
      <header className="site-header">
        <div className="wrap site-header-inner">
          <NavLink to="/" className="brand" end>
            <span className="brand-mark" aria-hidden="true">
              🌾
            </span>
            Efarm Connect
          </NavLink>
          <nav className="nav" aria-label="Primary">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/crops" className={linkClass}>
              Crops
            </NavLink>
            <NavLink to="/prices" className={linkClass}>
              Mandi prices
            </NavLink>
            <NavLink to="/advisories" className={linkClass}>
              Advisories
            </NavLink>
            <NavLink to="/schemes" className={linkClass}>
              Schemes
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Reach us
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <p style={{ margin: 0 }}>
            Efarm Connect — bridging field knowledge, markets, and rural programmes for stronger farm
            livelihoods.
          </p>
          <p style={{ margin: 0 }}>
            <a href="https://agricoop.gov.in/" target="_blank" rel="noreferrer">
              DA&amp;FW India
            </a>
            {' · '}
            Demo data for learning purposes
          </p>
        </div>
      </footer>
    </div>
  )
}
