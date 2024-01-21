import React from 'react'
import { useProductsContext } from '../functionality/ProductsContext'
import { Link } from 'react-router-dom'
import { links } from '../vars/links'
import Error from './Error'
import Loading from './Loading'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import img2 from '../assets/grass-background.jpg'
import spaImg from '../assets/woman-leaves-bundle.png'

export default function BundleProducts() {
  const {
    bestsell_products: bestsell,
    products_error: error,
    products_load: loading,
  } = useProductsContext()
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <BundleContainer className='page'>
      <div className='page-center'>
        <div className='title'>
          <h1>Bestsellers</h1>
        </div>
        <div className='bestsell'>
          {bestsell.map((product) => {
            return <ProductCard key={product.id} {...product} />
          })}
        </div>
      </div>
      <img src={spaImg} alt='bundle image' />
      <div className='page-center bundles'>
        <div className='title'>
          <h1>bundles</h1>
        </div>
        <div className='bestsell'>
          {bestsell.map((product) => {
            return <ProductCard key={product.id} {...product} />
          })}
        </div>
        <div className='btn-container'>
          <Link to={links[1].url} className='btn'>
            shop all products
          </Link>
        </div>
      </div>
    </BundleContainer>
  )
}

const BundleContainer = styled.section`
  /* 
  background-image: url(${img2});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat; */
  margin-top: 2rem;
  h1 {
    text-align: center;
    color: var(--brand-color);
    font-weight: 400;
    font-size: 48px;
  }
  img {
    max-width: 100%;
  }
  /* .background {
    background-color: var(--bestsell-color);
    padding: 4rem;
    border-radius: 1rem;
  } */
  .bundles {
    margin-top: 100px;
  }
  .bestsell {
    margin-bottom: 8rem;
    margin-top: 4rem;
    display: grid;
    gap: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
  }
  .btn-container {
    text-align: center;
  }
  @media (min-width: 576px) {
    .bestsell {
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    }
    .title {
      text-align: left;
    }
  }
`
/* gray color for this? */
