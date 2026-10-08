import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import BrandLogo from './BrandLogo.jsx'
export default function StoreHeader({ count, logo }) {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0, 0) }, [pathname])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="announcement">A fresh chapter for NuVitta <span>·</span> Storefront preview</div>
    <header className="site-header wrap">
      <Link className="brand" to="/" aria-label="NuVitaGlo home"><BrandLogo {...logo} /></Link>
      <nav id="main-navigation" className={open ? 'navigation open' : 'navigation'} aria-label="Main navigation" onKeyDown={e => { if (e.key === 'Escape') setOpen(false) }}><NavLink to="/products">Shop skincare</NavLink><NavLink to="/about">Our story</NavLink><NavLink to="/contact">Get in touch</NavLink></nav>
      <div className="header-actions"><Link className="bag-link" to="/cart" aria-label={`Shopping bag, ${count} items`}><svg width="21" height="23" viewBox="0 0 24 26" fill="none" aria-hidden="true"><path d="M4 8h16l1 16H3L4 8Z M8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" /></svg><span>Bag ({count})</span></Link><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)} onKeyDown={e => { if (e.key === 'Escape') setOpen(false) }}>{open ? 'Close' : 'Menu'}</button></div>
    </header>
  </>
}
