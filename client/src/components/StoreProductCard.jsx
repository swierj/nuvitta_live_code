import { Link } from 'react-router-dom'
import CatalogImage from './CatalogImage.jsx'
export const money = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100)
export default function StoreProductCard({ product, products }) {
  return <Link className="product-card" to={`/products/${product.id}`}><div className="product-image"><span className="product-tag">{product.bundle ? 'The complete routine' : product.category}</span><CatalogImage product={product} products={products} /><span className="card-arrow" aria-hidden="true">↗</span></div><div className="product-card-title"><h3>{product.name}</h3><span>{money(product.price)}</span></div><p>{product.size}</p></Link>
}
