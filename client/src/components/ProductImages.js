import React, { useState } from 'react'
import styled from 'styled-components'
//import ReactImageMagnify from 'react-image-magnify'
// disabled react-image-magnify until I can get it to work. won't be showing main product image :(
// https://www.npmjs.com/package/@datobs/react-image-magnifiers

export default function ProductImages({ imgMain, name, imgAlt1, imgAlt2 }) {
  const images = [imgMain, imgAlt1, imgAlt2]
  // add the functionality to switch images once I have more product images
  // eslint-disable-next-line
  const [main, setMain] = useState(images[0])
  return (
    // <ImagesContainer>
    //   <div className='img-wrapper'>
    //     { <ReactImageMagnify
    //       {...{
    //         smallImage: {
    //           alt: 'Wristwatch by Ted Baker London',
    //           isFluidWidth: true,
    //           src: main,
    //         },
    //         largeImage: {
    //           src: main,
    //           width: 1200,
    //           height: 1600,
    //         },
    //         hoverDelayInMs: 150,
    //         enlargedImagePosition: 'over',
    //         isHintEnabled: true,
    //         shouldHideHintAfterFirstActivation: false,
    //       }}
    //     /> }
    //   </div>
    //   {/* <div className='img-gallery'>
    //     {images.map((image, index) => {
    //       return (
    //         <img
    //           src={image}
    //           alt=''
    //           key={index}
    //           className={`${image === main ? 'active' : null}`}
    //           onClick={() => setMain(images[index])}
    //         />
    //       )
    //     })}
    //   </div> */}
    // </ImagesContainer>
    <ImagesContainer>
      <div className='img-wrapper'>
        <img src={main} alt={name} />
      </div>
    </ImagesContainer>
  )
}

const ImagesContainer = styled.section`
  img {
    max-width: 100%;
  }
  img.mainImg:hover {
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
