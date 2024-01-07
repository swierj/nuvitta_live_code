import React from 'react'
import styled from 'styled-components'
import img from '../assets/Woman-with-Leaf.png'

export default function AboutStore() {
  return (
    <AboutContainer className='page page-center'>
      <img src={img} alt='woman with leaf' />
      <article>
        <h1>about our store</h1>
        <div className='underline'></div>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </article>
    </AboutContainer>
  )
}

const AboutContainer = styled.section`
  margin-top: 2rem;
  display: grid;
  gap: 3rem;
  img {
    width: 100%;
    display: block;
    border-radius: 0.75rem;
  }
  h1 {
    text-align: center;
  }
  p {
    margin-top: 1.5rem;
  }
  @media (max-width: 1023px) {
    img {
      margin: auto;
      max-width: 30rem;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`
