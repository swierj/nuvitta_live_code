import React from 'react'
import styled from 'styled-components'

export default function ReviewCount({ reviewCount }) {
  // singular exception
  if (reviewCount == 1) {
    return <ReviewCountContainer>(1 Review)</ReviewCountContainer>
  }
  return <ReviewCountContainer>({reviewCount} Reviews)</ReviewCountContainer>
}

const ReviewCountContainer = styled.section`
  font-size: 13px;
  margin-left: 5px;
`
