import React from 'react'
import styled from 'styled-components'

export default function Footer() {
  return (
    /* add nuface logo and link. also add a refund policy and contacts/social medias */
    <FooterContainer>
      <div>
        <h3>&copy; {new Date().getFullYear()} NuVitta | all rights reserved</h3>
      </div>
      <div>
        <h3>support</h3>
        <p>refund policy</p>
        <p>return policy</p>
      </div>
      <div>
        <h3>contact</h3>
        <p>email</p>
        <p>facebook</p>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  height: var(--footer-height-mobile);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  background: var(--brand-color);
  text-transform: capitalize;
  div {
    padding: 1rem 0;
    text-align: center;
    flex-direction: column;
  }
  @media (min-width: 1024px) {
    flex-direction: row;
    height: var(--footer-height-desk);

    div {
      padding: 0 3rem;
    }
  }
`
