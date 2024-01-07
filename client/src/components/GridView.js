import React from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'

export default function GridView({ products }) {
  return (
    <GridContainer>
      <div className='products-container'>
        {products.map((product) => {
          return <ProductCard key={product.id} {...product} />
        })}
      </div>
    </GridContainer>
  )
}

const GridContainer = styled.section`
  .products-container {
    display: grid;
    gap: 2rem 2rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    .products-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`
