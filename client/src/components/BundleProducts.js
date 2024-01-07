import React from 'react'
import { useProductsContext } from '../functionality/ProductsContext'
import Error from './Error'
import Loading from './Loading'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import img2 from '../assets/grass-background.jpg'

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
      <div className='page-center background'>
        <div className='title'>
          <h1>save on our bundles</h1>
        </div>
        <div className='bestsell'>
          {bestsell.map((product) => {
            return <ProductCard key={product.id} {...product} />
          })}
        </div>
      </div>
    </BundleContainer>
  )
}

const BundleContainer = styled.section`
  background-image: url(${img2});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  h1 {
    text-align: center;
    color: white;
    font-weight: 700;
    font-size: 48px;
  }
  .background {
    background-color: var(--bestsell-color);
    padding: 4rem;
    border-radius: 1rem;
  }
  .bestsell {
    margin: 4rem auto;
    display: grid;
    gap: 2rem;
    display: grid;
    background-color: var(--bestsell-color);
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
