import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../functionality/CartContext'
import { formatPrice } from '../vars/helper'
import { Link } from 'react-router-dom'
import { links } from '../vars/links'

export default function CartCheckout() {
  const { total_amount, shipping, total_items } = useCartContext()
  return (
    <CartCheckoutContainer>
      <article>
        <div className='grid'>
          <p>
            subtotal <span>({total_items} items)</span>
          </p>
          <p>{formatPrice(total_amount)}</p>
        </div>
        <div className='grid'>
          <p>shipping</p>
          <p>{formatPrice(shipping)}</p>
        </div>
        <div className='grid'>
          <p>tax</p>
          <p>calculated at checkout</p>
        </div>
        <div className='total-amount grid'>
          <p>estimated total</p>
          <p>{formatPrice(total_amount + shipping)}</p>
        </div>
      </article>
      <Link to={links[1].url} className='btn'>
        continue shopping
      </Link>
    </CartCheckoutContainer>
  )
}

const CartCheckoutContainer = styled.section`
  p {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    color: var(--heading-color);
    line-height: 1;
  }
  span {
    text-transform: lowercase;
  }
  h3 {
    color: var(--heading-color);
  }
  .grid {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .total-amount {
    margin: 2rem 0;
    p {
      font-size: 1.3rem;
      color: black;
      letter-spacing: 0.075rem;
      font-weight: 800;
    }
  }
`
