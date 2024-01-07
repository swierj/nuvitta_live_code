import React, { useState } from 'react'
import styled from 'styled-components'

export default function ProductImages({ imgMain, name, imgAlt1, imgAlt2 }) {
  const images = [imgMain, imgAlt1, imgAlt2]
  // add the functionality to switch images once I have more product images
  // eslint-disable-next-line
  const [main, setMain] = useState(images[0])
  return (
    <ImagesContainer>
      <div className='img-wrapper'>
        <img src={main} alt={name} className='mainImg' />
      </div>
      {/* <div className='img-gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt=''
              key={index}
              className={`${image === main ? 'active' : null}`}
              onClick={() => setMain(images[index])}
            />
          )
        })}
      </div> */}
    </ImagesContainer>
  )
}

const ImagesContainer = styled.section`
  img {
    max-width: 30rem;
    display: block;
    object-fit: cover;
    align-items: center;
    transform-origin: 50% 60%;
    transition: transform 1s, filter 0.5s ease-out;
  }
  img.mainImg:hover {
    transform: scale(2);
    transition: 0.25s;
  }
  .img-wrapper {
    overflow: hidden;
  }
  .img-gallery {
    width: 30rem;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--brand-color);
  }
  .mainImg:hover {
    opacity: 1;
  }
  img:hover {
    opacity: 0.75;
  }
  @media (max-width: 576px) {
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 1024px) {
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`
