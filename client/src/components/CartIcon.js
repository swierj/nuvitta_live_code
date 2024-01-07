import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useSidebarContext } from '../functionality/SidebarContext'
import { useCartContext } from '../functionality/CartContext'

export default function CartIcon() {
  const { closeSidebar } = useSidebarContext()
  const { total_items } = useCartContext()
  return (
    <CartIconContainer className='shopping-cart hover-underline-animation'>
      <Link to='/cart' onClick={closeSidebar}>
        <div className='cart-icon'>
          <FaShoppingCart />
          <span className='cart-amount'>{total_items}</span>
        </div>
      </Link>
    </CartIconContainer>
  )
}

const CartIconContainer = styled.div`
  .cart-icon {
    color: var(--heading-color);
    display: flex;
    align-items: center;
    position: relative;
    svg {
      font-size: 2.5rem;
    }
  }

  .cart-amount {
    position: absolute;
    background: var(--brand-color);
    top: -6px;
    right: -12px;
    width: 1rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: white;
    padding: 0.75rem;
    font-weight: 900;
    font-size: 1rem;
  }
`
