import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useCartContext } from '../functionality/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_PK } from '../vars/links'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'

const stripePromise = loadStripe(STRIPE_PK)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')

  const { cart } = useCartContext()

  useEffect(() => {
    fetch('/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // pass cart items to backend
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
    // user cannot change cart items once in checkout page so dependency for cart
    // that react wants is not needed because even if page is re-rendered, the
    // previous cart objects are still accurate. ignoring warning.
    // eslint-disable-next-line
  }, [])

  return (
    <main>
      <CheckoutPageContainer>
        {clientSecret && (
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout className='embed' />
          </EmbeddedCheckoutProvider>
        )}
      </CheckoutPageContainer>
    </main>
  )
}

const CheckoutPageContainer = styled.section`
  // try to figure out a way to add padding around the stripe checkout object. not sure how id style it
  .embed {
    margin: 0rem 0rem;
  }
`
