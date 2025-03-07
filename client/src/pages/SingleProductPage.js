import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../functionality/ProductsContext'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  Loading,
  Error,
  ProductInfo,
  ProductImages,
  AddToCart,
  ProductDetails,
  ShippingDeal,
  BundleInfo,
} from '../components'

export default function SingleProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    s_product_load: loading,
    s_product_error: error,
    products,
  } = useProductsContext()

  // useEffect(() => {
  //   fetchSingleProduct(`../nuvitta/products/${id}`)
  // }, [id])

  /* need to use useEffect for product stuff I think */

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
    // eslint-disable-next-line
  }, [error])
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  const product = products[id - 1]

  var infoComp = null
  var detailsComp = null

  // logic to check if product is bundle or not since it needs different details rendered
  if (product.bundle) {
    infoComp = <BundleInfo {...product} />
  } else {
    infoComp = <ProductInfo {...product} />
  }

  return (
    <SingleProductContainer>
      <ShippingDeal />
      <div className='page page-center'>
        <div className='link-container'>
          <Link to='/'>Home /</Link>
          <Link to='/products'> Products / </Link>
          {product.name}
        </div>
        <div className='section-split'>
          <ProductImages {...product} />
          <div>
            {infoComp}
            <AddToCart product={product} />
          </div>
        </div>
        <ProductDetails {...product} />
      </div>
    </SingleProductContainer>
  )
}

const SingleProductContainer = styled.section`
  .page {
    padding: 1.5rem 0;
  }
  .section-split {
    display: grid;
    margin: 1.5rem 0;
    gap: 2rem;
  }
  .link-container {
    font-weight: 300;
    font-size: 1rem;
    color: var(--brand-color);
    a {
      color: var(--heading-color);
    }
  }
  @media (min-width: 1024px) {
    .section-split {
      grid-template-columns: 1fr 1.6fr;
    }
  }
`
