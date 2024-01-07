import React from 'react'
import styled from 'styled-components'
import img2 from '../assets/grass-background.jpg'

export default function BackgroundImg() {
  return (
    <BackgroundContainer>
      <p></p>
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.section`
  padding: 10rem;
  background-image: url(${img2});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
`
