import React from 'react'
import styled from 'styled-components'
import { ProductList, Filters, ViewFilter } from '../components'
import banner from '../assets/products-banner.png'
/* add a shop products green section below navbar */
// add a post get so when page is refreshed it refreshes properly

export default function ProductPage() {
  return (
    <main>
      <ProductsContainer>
        <img src={banner} className='banner' alt='about banner' />
        <div className='page-center products'>
          <Filters />
          <div>
            <ViewFilter />
            <ProductList />
          </div>
        </div>
      </ProductsContainer>
    </main>
  )
}

const ProductsContainer = styled.section`
  .banner {
    margin-top: 1rem;
    width: 100%;
  }
  .products {
    display: grid;
    gap: 2rem 1.5rem;
    margin: 4rem auto;
  }
  @media (min-width: 800px) {
    .products {
      grid-template-columns: 20% 1fr;
    }
  }
`
