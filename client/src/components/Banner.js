import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import bannerImg from '../assets/woman-banner-1.png'
import { links } from '../vars/links'

export default function Banner() {
  return (
    <BannerContainer className='page-center'>
      <article>
        <h1>
          renew your skin <br />
          with NuVitta
        </h1>
        <p>
          Treat your skin with NuVitta all-natural products designed to nurture
          a younger look for your skin.
        </p>
        <div className='btn-container'>
          <Link to={links[1].url} className='btn'>
            shop products
          </Link>
        </div>
      </article>
      <img src={bannerImg} alt='banner' />
    </BannerContainer>
  )
}

const BannerContainer = styled.section`
  min-height: 50vh;
  display: flex;
  img {
    display: block;
    position: bottom;
    transform: scale(1);
  }
  article {
    display: block;
    margin-top: 20%;
  }
  h1 {
    margin-bottom: 2rem;
    color: var(--brand-color); /* either this or brand color #5d8062*/
    font-weight: 600;
    font-size: 2.7rem;
    word-spacing: 0.5rem;
  }
  p {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  @media (max-width: 1023px) {
    h1 {
      text-align: center;
    }
    p {
      text-align: center;
    }
    img {
      display: none;
    }
    .btn-container {
      text-align: center;
    }
  }
  @media (min-width: 1024px) {
    height: calc(100vh - var(--navbar-height));
    p {
      max-width: 80%;
    }
  }
`
