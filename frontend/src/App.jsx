import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Crops from './pages/Crops'
import Prices from './pages/Prices'
import Advisories from './pages/Advisories'
import Schemes from './pages/Schemes'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/crops" element={<Crops />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/advisories" element={<Advisories />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
