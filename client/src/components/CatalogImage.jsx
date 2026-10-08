export default function CatalogImage({ product, products, loading = 'lazy' }) {
  if (product.showContentsImage) {
    return <div className="bundle-photo-grid" role="img" aria-label={`${product.name}: ${product.includedProducts.join(', ')}`}>
      {product.items.map(id => {
        const item = products.find(p => p.id === id)
        return item && <img key={id} src={item.image} alt="" loading={loading} />
      })}
    </div>
  }
  return <img src={product.image} alt={product.imageAlt} loading={loading} />
}
