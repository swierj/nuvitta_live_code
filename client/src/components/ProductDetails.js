import React from 'react'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

export default function ProductDetails({
  prodHighlight,
  keyFeatures,
  skinType,
  warnings,
  prodIngr,
  prodDirec,
}) {
  const product = [
    prodHighlight,
    prodDirec,
    prodIngr,
    keyFeatures,
    skinType,
    warnings,
  ]
  const categories = [
    'product highlights',
    'how to use',
    'ingredients',
    'key features',
    'skin type',
    'warnings',
  ]

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
          if (Array.isArray(productInfo)) {
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
  .tabline {
    width: 100%;
    border-bottom: 1px solid var(--brand-color);
    position: relative;
  }
  .react-tabs__tab--selected {
    color: var(--brand-color);
  }
`

/* 
      {product.map((info) => {
        return <p>{info}</p>
      })} */
