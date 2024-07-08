import React from 'react'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import Stars from './Stars'

export default function ProductDetails({
  prodHighlight,
  keyFeatures,
  skinType,
  warnings,
  prodIngr,
  prodDirec,
  reviews,
  bundle,
}) {
  const product = [
    prodHighlight,
    prodDirec,
    prodIngr,
    keyFeatures,
    skinType,
    warnings,
    reviews,
  ]
  const categories = [
    'product highlights',
    'how to use',
    'ingredients',
    'key features',
    'skin type',
    'warnings',
    'reviews',
  ]

  if (bundle) {
    return (
      <ProductDetailsContainer>
        <h3 className='tabline'>Reviews</h3>
      </ProductDetailsContainer>
    )
  } else {
    return (
      <ProductDetailsContainer>
        <Tabs defaultIndex={0} onSelect={(index) => console.log(index)}>
          <TabList className={'tab-headers tabline'}>
            {categories.map((category) => {
              return (
                <Tab key={category} className={'tab hover-underline-animation'}>
                  <h3>{category}</h3>
                </Tab>
              )
            })}
          </TabList>
          {product.map((productInfo, index) => {
            // mapping data based if it is in an array or not.
            // checking if the info is reviews because it needs a special case as it is an array of arrays
            if (productInfo.length < 1) {
              return (
                <TabPanel key={index}>
                  <p>No reviews yet. Be the first!</p>
                </TabPanel>
              )
            } else if (index === 6) {
              return (
                <TabPanel key={index}>
                  {productInfo.map((review) => {
                    return (
                      <section className='review-container' key={review}>
                        <div className='name' key={review[1]}>
                          {review[1]}
                        </div>
                        <span>
                          <div className='rating' key={review[0]}>
                            <Stars stars={review[0]} />
                          </div>
                          <div className='subject' key={review[3]}>
                            {review[3]}
                          </div>
                        </span>
                        <div className='review' key={review[2]}>
                          {review[2]}
                        </div>
                      </section>
                    )
                  })}
                </TabPanel>
              )
            } else if (Array.isArray(productInfo)) {
              return (
                <TabPanel key={index}>
                  {productInfo.map((s) => {
                    return (
                      <li key={s} className='list-items'>
                        {s}
                      </li>
                    )
                  })}
                </TabPanel>
              )
            }
            return (
              <TabPanel key={index}>
                <p>{productInfo}</p>
              </TabPanel>
            )
          })}
        </Tabs>
      </ProductDetailsContainer>
    )
  }
}

const ProductDetailsContainer = styled.section`
  margin-top: 2rem;
  li {
    font-weight: 300;
    line-height: 1.75;
  }
  .tab-headers {
    display: flex;
    gap: 4rem;
    margin-bottom: 1rem;
    line-height: 40px;
  }
  .tab {
    font-size: 0.9rem;
    cursor: pointer;
  }
  .list-items {
    margin-left: 2rem;
  }
  .hover-underline-animation {
    color: var(--heading-color);
  }
  .hover-underline-animation::after {
    bottom: -4px;
  }
  .react-tabs__tab--selected {
    color: var(--brand-color);
  }
  // reviews styling
  .review-container {
    margin-bottom: 3rem;
    span {
      margin-bottom: 5px;
      display: inline-flex;
      div {
        margin-right: 10px;
      }
      .subject {
        font-weight: 700;
      }
    }
    .name {
      color: var(--heading-color);
      font-weight: 600;
      font-size: 18px;
      line-height: 30px;
    }
  }
`

/*
      {product.map((info) => {
        return <p>{info}</p>
      })} */
