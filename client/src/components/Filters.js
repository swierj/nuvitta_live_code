import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../functionality/FilterContext'
import { getUniqueValues } from '../vars/helper'
import { FaSearch } from 'react-icons/fa'

export default function Filters() {
  const {
    filters: { text, category },
    updateFilters,
    all_products,
  } = useFilterContext()

  const categories = getUniqueValues(all_products, 'category')
  return (
    <FiltersContainer>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          {/*search bar*/}
          <div className='form-control search-wrapper'>
            <FaSearch className='search-icon' />
            <input
              type='text'
              name='text'
              value={text}
              placeholder='search'
              onChange={updateFilters}
              className='search-bar'
            />
          </div>
          {/*category filter bar*/}
          <div className='form-control'>
            <h3>category</h3>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={updateFilters}
                    type='button'
                    name='category'
                    className={`${
                      category === c.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
          </div>
        </form>
      </div>
    </FiltersContainer>
  )
}

const FiltersContainer = styled.section`
  .form-control {
    margin-bottom: 1.5rem;
  }
  h3 {
    margin-bottom: 1rem;
    font-size: larger;
  }
  .search-wrapper {
    width: 90%;
    height: 2rem;
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    box-shadow: 0px 0px 4px var(--brand-color);
    padding: 0 1rem;
    align-items: center;
  }
  .search-bar {
    background-color: transparent;
    border: none;
    height: 100%;
    letter-spacing: 0.075rem;
    width: 100%;
    margin-left: 1rem;
  }
  .search-bar::placeholder {
    text-transform: capitalize;
    font-size: 1rem;
  }
  .search-bar:focus {
    outline: none;
  }
  .search-icon {
    font-size: 1.25rem;
    color: var(--heading-color);
  }
  button {
    display: block;
    margin: 0.5rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    letter-spacing: 0.15rem;
    font-size: medium;
  }
  .active {
    border-color: var(--brand-color);
  }
  button:hover {
    color: var(--brand-color);
  }
  @media (min-width: 1024px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`
