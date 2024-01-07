import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { product_data as data } from '../vars/links'

const ACTIONS = {
  PRODUCTS_BEGIN: 'PRODUCTS_BEGIN',
  PRODUCTS_SUCCESS: 'PRODUCTS_SUCCESS',
  PRODUCTS_ERROR: 'PRODUCTS_ERROR',
  /* single product page actions */
  S_PRODUCT_BEGIN: 'S_PRODUCT_BEGIN',
  S_PRODUCT_SUCCESS: 'S_PRODUCT_SUCCESS',
  S_PRODUCT_ERROR: 'S_PRODUCT_ERROR',
}

const initialState = {
  products_load: false,
  products_error: false,
  products: [],
  bestsell_products: [],
  s_product_load: false,
  s_product_error: false,
  s_product: {},
}

const ProductsContext = React.createContext()

/* try with switch otherwise switch to the if/else statements */
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.PRODUCTS_BEGIN:
      return { ...state, products_load: true }
    case ACTIONS.PRODUCTS_SUCCESS:
      const bestsell_products = action.payload.filter(
        (product) => product.bestsell === true
      )
      return {
        ...state,
        products_load: false,
        products: action.payload,
        bestsell_products,
      }
    case ACTIONS.PRODUCTS_ERROR:
      return { ...state, products_load: false, products_error: true }
    case ACTIONS.S_PRODUCT_BEGIN:
      return { ...state, s_product_load: true, s_product_error: false }
    case ACTIONS.S_PRODUCT_SUCCESS:
      return { ...state, s_product_load: false, s_product: action.payload }
    case ACTIONS.S_PRODUCT_ERROR:
      return { ...state, s_product_load: false, s_product_error: true }
    default:
      return { ...state }
  }
}

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchProducts = async (data) => {
    dispatch({ type: ACTIONS.PRODUCTS_BEGIN })
    try {
      const response = await axios.get(data)
      const products = response.data
      dispatch({ type: ACTIONS.PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: ACTIONS.PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async (data) => {
    dispatch({ type: ACTIONS.S_PRODUCT_BEGIN })
    try {
      const response = await axios.get(data)
      const s_product = response.data
      dispatch({ type: ACTIONS.S_PRODUCT_SUCCESS, payload: s_product })
    } catch (error) {
      dispatch({ type: ACTIONS.S_PRODUCT_ERROR })
    }
    const response = await axios.get(data)
    console.log(response)
  }

  useEffect(() => {
    fetchProducts(data)
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
