import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../vars/helper'
import { Link } from 'react-router-dom'

export default function ListView({ products }) {
  return (
    <ListContainer>
      {products.map((product) => {
        const { id, imgMain, name, price, prodDesc } = product
        return (
          <article key={id}>
            <div className='img-container'>
              <Link to={`/products/${id}`}>
                <img src={imgMain} alt={name} />
              </Link>
            </div>
            <div>
              <h3>{name}</h3>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{prodDesc.substring(0, 300)}...</p>
              <Link to={`/products/${id}`} className='btn'>
                Details
              </Link>
            </div>
          </article>
        )
      })}
    </ListContainer>
  )
}

const ListContainer = styled.section`
  display: grid;
  row-gap: 3rem;
  img {
    display: block;
    width: 300px;
    object-fit: cover;
    transform: scale(1.4);
  }
  h3 {
    color: var(--product-info-color);
    font-weight: 600;
    margin-bottom: 1rem;
  }
  h5 {
    color: var(--product-info-color);
    font-weight: 400;
    font-size: 1rem;
  }
  p {
    margin-bottom: 2rem;
  }
  .img-container {
    overflow: hidden;
    max-width: 300px;
    border-radius: 0.75rem;
  }
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
  }
  @media (min-width: 1024px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`
