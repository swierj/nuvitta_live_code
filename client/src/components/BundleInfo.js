import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../vars/helper'
import StarReview from './StarReview'
import { averageRating } from '../vars/helper'

export default function BundleInfo({
  name,
  price,
  category,
  superIngr,
  prodDesc,
  size,
  bundle,
  reviews,
}) {
  return (
    <BundleInfoContainer>
      <div className='center'>
        <h3>{category}</h3>
        <h1 className='title'>{name}</h1>
        <StarReview
          stars={averageRating(reviews)}
          reviewCount={reviews.length}
        />
      </div>
    </BundleInfoContainer>
  )
}

const BundleInfoContainer = styled.section`
  h1 {
    font-weight: 600;
  }
  h3 {
    font-weight: 600;
    margin-bottom: 0.5rem;
    letter-spacing: 0.1rem;
  }
  p {
    margin-bottom: 1rem;
  }
  li {
    margin-left: 2rem;
  }
  .size {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-transform: none;
    font-weight: 400;
    letter-spacing: 0.1rem;
    span {
      font-weight: 600;
    }
  }
  .price {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: var(--heading-color);
  }
  @media (min-width: 1024px) {
    .center {
    }
    .title {
      text-align: left;
    }
  }
`
