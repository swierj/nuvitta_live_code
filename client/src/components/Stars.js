import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export default function Stars({ stars }) {
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return (
      <span key={index}>
        {stars > number ? (
          <BsStarFill className='star-item' />
        ) : stars > index ? (
          <BsStarHalf className='star-item' />
        ) : (
          <BsStar className='star-item' />
        )}
      </span>
    )
  })
  return (
    <StarsContainer>
      <span>{tempStars}</span>
    </StarsContainer>
  )
}

const StarsContainer = styled.section`
  span {
    .star-item {
      margin-right: 5px;
      color: var(--brand-color);
    }
  }
`
