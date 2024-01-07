import React from 'react'
import styled from 'styled-components'
import { FaLeaf, FaEye, FaGlobeAmericas } from 'react-icons/fa'
import img2 from '../assets/grass-background.jpg'

export default function Services() {
  return (
    <ServiceContainer>
      <div className='page-center'>
        <article className='head'>
          <h2>
            organic and natural products <br /> made for your skin
          </h2>
        </article>
        <div className='services'>
          {servicesData.map((data) => {
            return service(data.icon, data.title, data.text)
          })}
        </div>
      </div>
    </ServiceContainer>
  )
}

const service = (icon, title, text) => {
  return (
    <article key={title} className='service'>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}
const servicesData = [
  {
    icon: <FaLeaf />,
    title: 'mission',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    icon: <FaEye />,
    title: 'vision',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    icon: <FaGlobeAmericas />,
    title: 'background',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
]

const ServiceContainer = styled.section`
  background-image: url(${img2});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  h2 {
    color: white;
    margin-bottom: 1rem;
    letter-spacing: 0.2rem;
    word-spacing: 0.5rem;
    font-size: 48px;
    font-weight: 800;
  }
  h3 {
    color: var(--services-color);
    font-size: 1.5rem;
    text-align: center;
    padding: 0.5rem;
  }
  .head {
    place-items: center;
    margin-bottom: 2rem;
    margin-top: 10rem;
  }
  .head p {
    color: white;
    font-weight: 400;
    font-size: 1.1rem;
  }
  .service {
    background-color: var(--brand-color);
    border-radius: 1rem;
    padding: 3rem;
  }
  .services {
    display: grid;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 0.5rem;
    border-radius: 50%;
    background-color: var(--services-color);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 580px) {
    .services {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1024px) {
    padding: 5rem 0rem 0rem; //might remove this
    margin-bottom: 10rem;
    .head {
      display: grid;
    }
    .services {
      transform: translateY(5rem);
    }
    h2 {
      font-size: 2.5rem;
    }
  }
`
