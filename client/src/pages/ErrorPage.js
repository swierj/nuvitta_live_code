import React from 'react'
import styled from 'styled-components'

export default function ErrorPage() {
  return (
    <ErrorContainer>
      <section>
        <h1>404</h1>
        <h2>We were unable to find the page you were looking for :(</h2>
      </section>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.main`
  /* min-height: calc(100vh - var(--footer-height-mobile) - var(--navbar-height)); */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10rem;
  h1 {
    font-size: 10rem;
    letter-spacing: 0.5rem;
  }
  h2 {
    color: var(--heading-color);
  }
`
