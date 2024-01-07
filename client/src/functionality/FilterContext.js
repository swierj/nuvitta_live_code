import React, { useEffect, useContext, useReducer } from 'react'
import { useProductsContext } from './ProductsContext'

const ACTIONS = {
  LOAD_PRODUCTS: 'LOAD_PRODUCTS',
  PRODUCTS_SUCCESS: 'PRODUCTS_SUCCESS',
  SET_GRIDVIEW: 'SET_GRIDVIEW',
  SET_LISTVIEW: 'SET_LISTVIEW',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  SORT_PRODUCTS: 'SORT_PRODUCTS',
  FILTER_PRODUCTS: 'FILTER_PRODUCTS',
}

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  filters: {
    text: '',
    category: 'all',
  },
}

const FilterContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters },
      }
    case ACTIONS.SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case ACTIONS.SET_LISTVIEW:
      return { ...state, grid_view: false }
    case ACTIONS.UPDATE_FILTERS:
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }
    case ACTIONS.FILTER_PRODUCTS:
      const { all_products } = state
      const { text, category } = state.filters
      let tempProducts = [...all_products]
      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().includes(text)
        )
      }
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }
      return { ...state, filtered_products: tempProducts }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext()
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({ type: ACTIONS.LOAD_PRODUCTS, payload: products })
  }, [products])

  useEffect(() => {
    dispatch({ type: ACTIONS.FILTER_PRODUCTS })
  }, [state.filters])

  const setGridView = () => {
    dispatch({ type: ACTIONS.SET_GRIDVIEW })
  }
  const setListView = () => {
    dispatch({ type: ACTIONS.SET_LISTVIEW })
  }
  const updateFilters = (e) => {
    let name = e.target.name
    let value = e.target.value
    if (name === 'category') {
      value = e.target.textContent
    }
    dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: { name, value } })
  }

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, updateFilters }}
    >
      {children}
    </FilterContext.Provider>
  )
}
export const useFilterContext = () => {
  return useContext(FilterContext)
}
