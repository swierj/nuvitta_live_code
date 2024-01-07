import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../functionality/CartContext'
import CartItem from './CartItem'
import CartCheckout from './CartCheckout'
import { Link } from 'react-router-dom'

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
)

export default function CartContent() {
  const { cart } = useCartContext()
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      )
    }
  }, [])
  return message ? (
    <Message message={message} />
  ) : (
    <CartContainer className='page page-center'>
      <section>
        <h3 className='title'>shopping cart</h3>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </section>
      <section className='order-summary'>
        <h3 className='title'>Order Summary</h3>
        <CartCheckout />
        <Link to='/checkout' className='btn black'>
          Checkout
        </Link>
      </section>
    </CartContainer>
  )
}

const CartContainer = styled.section`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8rem;
  .title {
    font-size: 2rem;
    font-weight: 600;
    text-align: left;
    margin-bottom: 2rem;
  }
  .btn {
    width: 100%;
    text-align: center;
    padding: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 2.5rem;
    border-radius: 0.25rem;
    font-size: 1.1rem;
  }
  .black {
    background-color: black;
  }
  .black:hover {
    background-color: #5c5c5c;
  }
`
