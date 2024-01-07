import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import { useCartContext } from '../functionality/CartContext'

export default function Return() {
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const { clearCart } = useCartContext()

  useEffect(() => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const sessionId = urlParams.get('session_id')

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
      .then(() => {
        /* doesn't need dependency since its only called once after 
        successful checkout to clear the cart*/
        clearCart()
      })
    // eslint-disable-next-line
  }, [])

  if (status === 'open') {
    return <Navigate to='/checkout' />
  }

  if (status === 'complete') {
    return (
      <ReturnPageContainer className='page page-center'>
        <section id='success'>
          <p>
            We appreciate your business! A confirmation email will be sent to{' '}
            {customerEmail}. If you have any questions, please email{' '}
            <a href='mailto:orders@example.com'>orders@example.com</a>.
          </p>
        </section>
      </ReturnPageContainer>
    )
  }

  return null
}

const ReturnPageContainer = styled.section`
  p {
    text-align: center;
    justify-content: center;
    font-size: x-large;
  }
`
