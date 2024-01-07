import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../vars/helper'

export default function ProductInfo({
  name,
  price,
  category,
  superIngr,
  prodDesc,
  size,
}) {
  return (
    <ProductInfoContainer>
      <div className='center'>
        <h3>{category}</h3>
        <h1 className='title'>{name}</h1>
        <h2 className='price'>{formatPrice(price)}</h2>
        <div className='size'>
          <span>Size: </span>
          {size}
        </div>
        <p>{prodDesc}</p>
        <h3>superstar ingredients</h3>
        <p>
          {superIngr.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </p>
      </div>
    </ProductInfoContainer>
  )
}

const ProductInfoContainer = styled.section`
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
  .title {
    margin-bottom: 1rem;
  }
  .price {
    color: var(--brand-color);
    margin-bottom: 1rem;
  }
  @media (min-width: 1024px) {
    .center {
    }
    .title {
      text-align: left;
    }
  }
`
