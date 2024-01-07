import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../vars/helper'
import { FaTrash } from 'react-icons/fa'
import ProductAmount from './ProductAmount'
import { useCartContext } from '../functionality/CartContext'
import { Link } from 'react-router-dom'

/* Need to add size as an attribute and include in single product page, and cart */
export default function CartItem({ id, image, name, price, amount }) {
  const { removeItem, toggleAmount } = useCartContext()
  const increase = () => {
    toggleAmount(id, 'inc')
  }
  const decrease = () => {
    toggleAmount(id, 'dec')
  }
  /* add pop up to verify that user wants to delete item from cart */
  if (amount < 1) {
    removeItem(id)
  }
  return (
    <CartItemContainer>
      <div className='item page-center'>
        <Link to={`/products/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <Link to={`/products/${id}`} className='product-name'>
          <h3 className='product-title'>{name}</h3>
          <h4>{formatPrice(price)}</h4>
        </Link>
      </div>
      <div className='total-price'>
        <ProductAmount
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <span>
          <h3>{formatPrice(price * amount)}</h3>
          <button className='remove-btn' onClick={() => removeItem(id)}>
            <FaTrash />
          </button>
        </span>
      </div>
    </CartItemContainer>
  )
}

/* update the img widths? might just make it width: 100px and cut out the min and max stuff. think on this after adding mobile media. put the trash button under title/price next to img? */
const CartItemContainer = styled.section`
  display: grid;
  grid-template-columns: 200px auto;
  align-items: center;
  justify-items: right;
  margin-bottom: 4rem;
  img {
    width: 100%;
    max-width: 150px;
    display: block;
    transform: scale(1);
  }
  h4 {
    color: black;
  }
  hr {
    height: 2px;
    width: 100%;
    color: var(--brand-color);
    background-color: var(--brand-color);
  }
  .remove-btn {
    background: transparent;
    border: transparent;
    cursor: pointer;
    color: var(--heading-color);
    font-size: 1.25rem;
    margin-top: 2rem;
    margin-left: 3rem;
    &:hover {
      color: darkred;
    }
  }
  .total-price {
    display: flex;
    gap: 4rem;
  }
  .product-title {
    font-size: 1.1rem;
    letter-spacing: 0.15rem;
    margin: 0.5rem 0rem;
  }
  .item {
    height: 100%;
    align-items: top;
    display: flex;
    gap: 1rem;
    text-align: left;
  }
  .product-name {
  }
`
