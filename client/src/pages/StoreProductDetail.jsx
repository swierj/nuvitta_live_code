import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MAX_QUANTITY } from '../features/cart/cart.js'
import { money } from '../components/StoreProductCard.jsx'
import ProductGallery from '../components/ProductGallery.jsx'
import ProductReviews from '../components/ProductReviews.jsx'

function ProductText({ value }) {
  if (Array.isArray(value)) return <ul>{value.map((text, i) => <li key={i}>{text}</li>)}</ul>
  return <p>{value}</p>
}

export default function ProductDetail({ products, add, cart }) {
  const { id } = useParams()
  const aliases = { 'cleansing-oil': 'makeup-cleansing-oil' }
  const product = products.find(p => p.id === (aliases[id] || id) || String(p.legacyId) === id)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  useEffect(() => { setQuantity(1); setMessage('') }, [id])
  if (!product) return <section className="empty-state wrap"><h1>Product not found.</h1><Link className="button" to="/products">Explore skincare ↗</Link></section>
  const current = cart.find(item => item.id === product.id)?.quantity || 0
  const sections = [
    ['Product highlights', product.prodHighlight],
    ['How to use', product.prodDirec],
    ['Ingredients', product.prodIngr],
    ['Key features', product.keyFeatures],
    ['Skin type', product.skinType],
    ['Warnings', product.warnings],
  ].filter(([, value]) => value?.length)

  return <section className="section wrap">
    <div className="breadcrumbs"><Link to="/products">Skincare</Link><span>/</span>{product.name}</div>
    <div className="detail-grid">
      <ProductGallery product={product} products={products} />
      <div className="detail-copy">
        <p className="eyebrow">{product.category}</p><h1>{product.name}</h1>
        <p className="detail-price">{money(product.price)} <span>{product.size}</span></p>
        {product.description && <p className="product-description">{product.description}</p>}
        <div className="add-row">
          <label>Quantity<select value={quantity} onChange={e => { setQuantity(Number(e.target.value)); setMessage('') }}>{Array.from({ length: MAX_QUANTITY }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}</select></label>
          <button className="button" disabled={current + quantity > MAX_QUANTITY} onClick={() => { add(product.id, current + quantity); setMessage(`${quantity} added to your bag.`) }}>Add to bag +</button>
        </div>
        <p className="status" role="status">{current + quantity > MAX_QUANTITY ? 'Maximum 20 of each item in your bag.' : message} {message && <Link to="/cart">View bag →</Link>}</p>
        {product.superIngr?.length > 0 && <section className="superstar-ingredients"><h3>Superstar ingredients</h3><ProductText value={product.superIngr} /></section>}
        <ProductReviews key={product.id} reviews={product.reviews} />
        {product.bundle && <section className="bundle-includes"><h3>Inside the bundle</h3>{product.items.map((item, index) => <Link key={item} to={`/products/${item}`}><span>{product.includedProducts[index]}<small>{product.sizeProducts[index]}</small></span><span>{product.priceProducts[index]} ↗</span></Link>)}</section>}
      </div>
    </div>
    <div className="product-information"><h2>A closer look.</h2>
      {sections.map(([title, value]) => <details key={`${product.id}-${title}`} open={title === 'Product highlights'}><summary>{title}</summary><ProductText value={value} /></details>)}
    </div>
  </section>
}
