import { Link } from 'react-router-dom'
import CatalogImage from './CatalogImage.jsx'
export const money = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
export default function StoreProductCard({ product, products }) {
  return <Link className={`product-card${product.bundle ? ' product-card-bundle' : product.category === 'toners' ? ' product-card-tall' : ''}`} to={`/products/${product.id}`}><div className="product-image"><span className="product-tag">{product.bundle ? 'The complete routine' : product.category}</span><div className="card-photo-window"><CatalogImage product={product} products={products} showContents={product.bundle} /></div><span className="card-arrow" aria-hidden="true">↗</span></div><div className="product-card-title"><h3>{product.name}</h3></div><p className="product-card-meta"><span className="product-card-price">{money(product.price)}</span><span aria-hidden="true">·</span><span>{product.size}</span></p></Link>
}
