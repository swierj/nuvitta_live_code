import React from 'react'
import styled from 'styled-components'

export default function ShippingDeal() {
  return (
    <ShippingDealContainer>
      <div className='shipping-deal'>
        <p>Free Shipping on Orders $150+</p>
      </div>
    </ShippingDealContainer>
  )
}

const ShippingDealContainer = styled.section`
  .shipping-deal {
    background-color: var(--brand-color);
    text-align: center;
    p {
      padding: 6px;
      font-weight: 500;
      color: white;
    }
  }
`
