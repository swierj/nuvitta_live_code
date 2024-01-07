import React from 'react'
import styled from 'styled-components'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import { useFilterContext } from '../functionality/FilterContext'

export default function ViewFilter() {
  const {
    filtered_products: products,
    grid_view,
    setGridView,
    setListView,
  } = useFilterContext()
  return (
    <ViewContainer>
      <div className='btn-views'>
        <button
          onClick={setGridView}
          className={`${grid_view ? 'active' : null}`}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={setListView}
          className={`${!grid_view ? 'active' : null}`}
        >
          <BsList />
        </button>
      </div>
      <p>{products.length} products found</p>
    </ViewContainer>
  )
}

const ViewContainer = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 1rem;

  .btn-views {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--heading-color);
      color: black;
      width: 1.75rem;
      border-radius: 0.3rem;
      height: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1.1rem;
        color: var(--heading-color);
      }
    }
    .active {
      background: var(--heading-color);
      svg {
        color: white;
      }
    }
  }
`
