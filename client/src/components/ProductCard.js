import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { formatPrice } from '../vars/helper'

export default function ProductCard({ imgMain, name, price, id }) {
  return (
    <ProductContainer>
      <div className='container'>
        <Link to={`/products/${id}`}>
          <img src={imgMain} alt={name} />
        </Link>
        <Link to={`/products/${id}`} className='link'>
          <FaSearch />
        </Link>
      </div>
      <footer>
        <h3>{name}</h3>
        <p>{formatPrice(price)}</p>
      </footer>
    </ProductContainer>
  )
}

const ProductContainer = styled.article`
  max-width: 250px;
  .container {
    position: relative;
    max-width: 250px;
    border-radius: 0.75rem;
    background: var(--heading-color);
    overflow: hidden;
    margin-bottom: 6px;
  }
  h3 {
    color: var(--product-info-color);
    font-weight: 600;
    font-size: 1rem;
  }
  p {
    color: var(--product-info-color);
    font-weight: 400;
  }
  img {
    width: 100%;
    display: block;
    border-radius: 0.75rem;
    transition: 1s;
    margin-bottom: 0.5rem;
    transform: scale(1.4);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--brand-color);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: all 0.3s linear;
    opacity: 0;
    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: white;
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
`
