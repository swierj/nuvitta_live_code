import { useEffect, useRef, useState } from 'react'
import CatalogImage from './CatalogImage.jsx'

export default function ProductGallery({ product, products }) {
  const dialog = useRef(null)
  const photo = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [open])

  useEffect(() => {
    dialog.current?.close()
  }, [product.id])

  function moveZoom(event) {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    photo.current.style.setProperty('--zoom-x', `${(event.clientX - bounds.left) / bounds.width * 100}%`)
    photo.current.style.setProperty('--zoom-y', `${(event.clientY - bounds.top) / bounds.height * 100}%`)
  }

  return <>
    <button className="detail-image" aria-label={`Enlarge photo of ${product.name}`} aria-haspopup="dialog"
      onClick={() => { dialog.current.showModal(); setOpen(true) }} onPointerMove={moveZoom}
      onPointerLeave={() => { photo.current.style.removeProperty('--zoom-x'); photo.current.style.removeProperty('--zoom-y') }}>
      <div className="detail-photo" ref={photo}><CatalogImage product={product} products={products} loading="eager" /></div>
      <span className="photo-enlarge" aria-hidden="true">↗</span>
    </button>
    <dialog className="product-photo-dialog" ref={dialog} aria-label={`${product.name} enlarged photo`} onClose={() => setOpen(false)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current.close() }}>
      <div className="photo-viewer">
        <button className="photo-close" autoFocus aria-label="Close enlarged photo" onClick={() => dialog.current.close()}>✕</button>
        <CatalogImage product={product} products={products} loading="eager" />
      </div>
    </dialog>
  </>
}
