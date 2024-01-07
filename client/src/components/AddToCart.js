import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProductAmount from './ProductAmount'
import { useCartContext } from '../functionality/CartContext'

export default function AddToCart({ product }) {
  const { addToCart } = useCartContext()
  const { id } = product
  const [amount, setAmount] = useState(1)

  /* max 99 */
  const increase = () => {
    setAmount((oldAmount) => {
      let temp = oldAmount + 1
      if (temp < 99) {
        return temp
      }
      return 99
    })
  }
  /* min 0 */
  const decrease = () => {
    setAmount((oldAmount) => {
      let temp = oldAmount - 1
      if (temp > -1) {
        return temp
      }
      return 0
    })
  }
  return (
    <CartContainer>
      <div className='cart-buttons'>
        <ProductAmount
          increase={increase}
          decrease={decrease}
          amount={amount}
        />
        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, amount, product)}
        >
          add to cart
        </Link>
      </div>
    </CartContainer>
  )
}

const CartContainer = styled.section``
