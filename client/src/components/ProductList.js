import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useFilterContext } from '../functionality/FilterContext'

export default function ProductList() {
  const { filtered_products: products, grid_view } = useFilterContext()
  if (products.length < 1) {
    return (
      <h3 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h3>
    )
  }
  if (grid_view === false) {
    return <ListView products={products} />
  }
  return <GridView products={products} />
}
