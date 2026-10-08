import { useState } from 'react'

const PAGE_SIZE = 3

export default function ProductReviews({ reviews }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const shown = Math.min(visibleCount, reviews.length)

  return <details className="product-reviews">
    <summary><span>Reviews <span className="review-count">{reviews.length}</span></span><span className="review-toggle" aria-hidden="true">+</span></summary>
    <div className="reviews-content">
      {reviews.length ? <>
        <div className="reviews-list" aria-live="polite" aria-relevant="additions">
          {reviews.slice(0, visibleCount).map(([rating, name, text, title], index) => <article className="product-review" key={index}>
            <div className="review-heading"><h3>{name}</h3><span aria-label={`${rating} out of 5 stars`}>{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span></div>
            {title && <h4>{title}</h4>}<p>{text}</p>
          </article>)}
        </div>
        {reviews.length > PAGE_SIZE && <div className="reviews-pagination">
          <p role="status">Showing {shown} of {reviews.length} reviews</p>
          {shown < reviews.length && <button type="button" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}>Show more reviews ↓</button>}
        </div>}
      </> : <p className="reviews-empty">No reviews yet.</p>}
    </div>
  </details>
}
