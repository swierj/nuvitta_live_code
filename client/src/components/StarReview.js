import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import Stars from './Stars'
import ReviewCount from './ReviewCount'

export default function StarReview({ stars, reviewCount }) {
  return (
    <StarReviewContainer>
      <Stars stars={stars} />
      <ReviewCount reviewCount={reviewCount} />
    </StarReviewContainer>
  )
}

const StarReviewContainer = styled.section`
  display: inline-flex;
`
