import { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import StoreHeader from './components/StoreHeader.jsx'
import Detail from './pages/StoreProductDetail.jsx'
import About from './pages/StoreAbout.jsx'
import CatalogImage from './components/CatalogImage.jsx'
import ProductCard, { money } from './components/StoreProductCard.jsx'
import { CART_KEY, MAX_QUANTITY, readCart, updateCart } from './features/cart/cart.js'

function Home({ products }) {
  return <>
    <section className="hero wrap"><div className="hero-copy"><p className="eyebrow">Rooted in care. Made for you.</p><h1>Renew your skin<br />with <em>NuVitta.</em></h1><p className="hero-description">Treat your skin with NuVitta all-natural products designed to nurture a younger look for your skin.</p><Link className="button" to="/products">Shop products <span aria-hidden="true">↗</span></Link><div className="hero-note"><span className="leaf-mark" aria-hidden="true">❧</span> Organic and natural products made for your skin.</div></div><div className="hero-photo"><img src="/images/hero.webp" alt="Woman enjoying a moment of skincare" /><div className="photo-caption">Your skin. Your pace. Your ritual.</div></div></section>
    <section className="section wrap"><div className="section-heading"><div><p className="eyebrow">Meet your everyday essentials</p><h2>Bestsellers</h2></div><Link className="text-link" to="/products">Shop all products ↗</Link></div><div className="product-grid">{products.filter(p => p.bestsell).map(p => <ProductCard key={p.id} product={p} products={products} />)}</div></section>
    <section className="story-section wrap"><img src="/images/products.webp" alt="NuVitta skincare collection" loading="lazy" /><div><p className="eyebrow">Our products</p><h2>Made with care<br />in Redmond.</h2><p>We pride ourselves in sourcing the highest quality ingredients, worthy of your skin.</p><Link className="text-link" to="/about">About NuVitta ↗</Link></div></section>
    <section className="section wrap home-bundles"><div className="section-heading"><div><p className="eyebrow">Better together</p><h2>Bundles</h2></div><Link className="text-link" to="/products">Shop all products ↗</Link></div><div className="product-grid">{products.filter(p => p.bundle).map(p => <ProductCard key={p.id} product={p} products={products} />)}</div></section>
  </>
}
function Catalog({ products }) {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const categories = ['All', ...new Set(products.map(p => p.category))]
  const filtered = products.filter(p => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase().trim()))
  return <section className="section wrap"><p className="eyebrow">A little care, every day</p><h1>Your skincare shelf.</h1><p className="intro">Explore NuVitta cleansers, toners, moisturizers, treatments, and skincare bundles.</p><div className="catalog-tools"><div className="category-buttons" aria-label="Product categories">{categories.map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div><label className="search-label">Search skincare<input type="search" value={search} placeholder="Find an essential…" onChange={e => setSearch(e.target.value)} /></label></div><p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'essential' : 'essentials'}</p><div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} products={products} />)}</div>{!filtered.length && <div className="empty-state"><h2>No matching essentials.</h2><button className="button" onClick={() => { setSearch(''); setCategory('All') }}>Reset filters</button></div>}</section>
}
function Cart({ products, cart, update }) {
  const items = cart.map(item => ({ ...item, product: products.find(p => p.id === item.id) })).filter(item => item.product)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  if (!items.length) return <section className="empty-state wrap"><p className="eyebrow">A little space for your essentials</p><h1>Your bag is waiting.</h1><p>Find a new addition to your daily ritual.</p><Link className="button" to="/products">Explore skincare ↗</Link></section>
  return <section className="section wrap"><p className="eyebrow">Your everyday ritual</p><h1>Your shopping bag.</h1><div className="cart-grid"><div>{items.map(({ product, quantity, id }) => <article className="cart-item" key={id}><Link to={`/products/${id}`}><CatalogImage product={product} products={products} /></Link><div><Link to={`/products/${id}`}><h3>{product.name}</h3></Link><p>{money(product.price)} each</p><div className="quantity-controls"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => update(id, quantity - 1)}>−</button><span aria-label="Quantity">{quantity}</span><button aria-label={`Increase ${product.name} quantity`} disabled={quantity >= MAX_QUANTITY} onClick={() => update(id, quantity + 1)}>+</button><button className="remove-button" onClick={() => update(id, 0)}>Remove</button></div></div><strong>{money(product.price * quantity)}</strong></article>)}</div><aside className="cart-summary"><h2>Your ritual, so far.</h2><div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes will be confirmed when checkout is connected.</p><div className="sample-note">This is a storefront preview. Your bag is saved in this browser; payments are not enabled yet.</div><Link className="text-link" to="/products">Continue exploring ↗</Link></aside></div></section>
}
function Contact() {
  return <section className="section wrap contact-page"><p className="eyebrow">We’d love to hear from you</p><h1>Let’s talk skincare.</h1><p className="intro">Questions about NuVitta or your routine? Get in touch with the team.</p><a className="contact-email" href="mailto:info@mynuvitta.com">info@mynuvitta.com ↗</a><p className="contact-phone"><a href="tel:+14256358929">425-635-8929</a></p></section>
}
function NotFound() { return <section className="empty-state wrap"><h1>A fresh start?</h1><p>We couldn’t find that page or product.</p><Link className="button" to="/products">Explore skincare ↗</Link></section> }
export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [cart, setCart] = useState(() => { try { return readCart(window.localStorage) } catch { return [] } })
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError(false)
    fetch('/api/products', { signal: controller.signal }).then(response => { if (!response.ok) throw new Error('Catalog unavailable'); return response.json() }).then(data => { if (!Array.isArray(data)) throw new Error('Invalid catalog'); setProducts(data); setLoading(false) }).catch(err => { if (err.name !== 'AbortError') { setError(true); setLoading(false) } })
    return () => controller.abort()
  }, [attempt])
  useEffect(() => { try { window.localStorage.setItem(CART_KEY, JSON.stringify(cart)) } catch { /* Cart remains usable without browser storage. */ } }, [cart])
  const update = (id, quantity) => setCart(previous => updateCart(previous, id, quantity))
  const count = cart.filter(item => products.some(p => p.id === item.id)).reduce((sum, item) => sum + item.quantity, 0)
  return <><StoreHeader count={count} /><main id="main">{loading ? <div className="empty-state" role="status">Preparing your essentials…</div> : error ? <div className="empty-state"><h1>Let’s try that again.</h1><p>The catalog couldn’t load. Check that the API is running.</p><button className="button" onClick={() => setAttempt(n => n + 1)}>Retry</button></div> : <Routes><Route path="/" element={<Home products={products} />} /><Route path="/products" element={<Catalog products={products} />} /><Route path="/products/:id" element={<Detail products={products} cart={cart} add={update} />} /><Route path="/cart" element={<Cart products={products} cart={cart} update={update} />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<NotFound />} /></Routes>}</main><footer className="site-footer"><div className="wrap footer-top"><Link className="footer-brand" to="/">NuVitta<span>Care for your everyday.</span></Link><nav aria-label="Footer navigation"><Link to="/products">Shop skincare</Link><Link to="/about">Our story</Link><Link to="/contact">Contact</Link></nav></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} NuVitta</span><span>Storefront preview · Payments disabled</span></div></footer></>
}
