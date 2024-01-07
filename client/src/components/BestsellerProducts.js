import React from 'react'
import { useProductsContext } from '../functionality/ProductsContext'
import { Link } from 'react-router-dom'
import { links } from '../vars/links'
import Error from './Error'
import Loading from './Loading'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import img2 from '../assets/grass-background.jpg'

export default function BestsellerProducts() {
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
    <BestSellerContainer className='page'>
      <div className='page-center background'>
        <div className='title'>
          <h1>Our Bestsellers</h1>
        </div>
        <div className='bestsell'>
          {bestsell.map((product) => {
            return <ProductCard key={product.id} {...product} />
          })}
        </div>
        <div className='btn-container'>
          <Link to={links[1].url} className='btn'>
            all products
          </Link>
        </div>
      </div>
    </BestSellerContainer>
  )
}

/* change font size to be a bit bigger maybe? */
const BestSellerContainer = styled.section`
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
    gap: 2rem 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    h3 {
      font-size: 1rem;
    }
  }
  .btn {
    padding: 0.5rem 1rem;
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
