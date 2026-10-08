import { useState } from 'react'

const PAGE_SIZE = 3

export default function ProductReviews({ reviews }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const shown = Math.min(visibleCount, reviews.length)
  const average = reviews.length ? reviews.reduce((total, [rating]) => total + Number(rating), 0) / reviews.length : 0

  return <details className="product-reviews">
    <summary><span className="review-summary-label"><span>Reviews <span className="review-count">{reviews.length}</span></span>
      {reviews.length > 0 && <span className="review-average" role="img" aria-label={`Average rating: ${average.toFixed(1)} out of 5 stars`}>
        <span className="review-average-stars" aria-hidden="true"><span>★★★★★</span><span className="review-average-fill" style={{ width: `${average / 5 * 100}%` }}>★★★★★</span></span>
        <span className="review-average-value" aria-hidden="true">{average.toFixed(1)}</span>
      </span>}
    </span><span className="review-toggle" aria-hidden="true">+</span></summary>
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
