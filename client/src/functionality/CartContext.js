import React, { useEffect, useContext, useReducer } from 'react'

/* gets cart object from local storage. if doesn't exist, returns empty cart */
const getLocalStorage = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

/* user actions for interacting with cart */
const ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_ITEM: 'REMOVE_ITEM',
  TOGGLE_ITEM_AMOUNT: 'TOGGLE_ITEM_AMOUNT',
  CLEAR_CART: 'CLEAR_CART',
  COUNT_TOTAL: 'COUNT_TOTAL',
}

/* initial state of cart. uses local storage to store data */
const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping: 1000,
}
/* 
try finding a way to get the item by id in constant time and change its values?
*/
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      var { id, amount, product } = action.payload
      const tempItem = state.cart.find((item) => item.id === id)
      if (tempItem) {
        const cartAdd = state.cart.map((item) => {
          if (item.id === id) {
            let currAmount = item.amount + amount
            return { ...item, amount: currAmount }
          } else {
            return item
          }
        })
        return { ...state, cart: cartAdd }
      }
      const newItem = {
        id: id,
        price_id: product.price_id,
        name: product.name,
        amount,
        image: product.imgMain,
        price: product.price,
      }
      return { ...state, cart: [...state.cart, newItem] }
    case ACTIONS.REMOVE_ITEM:
      const cartRemove = state.cart.filter((item) => item.id !== action.payload)
      return { ...state, cart: cartRemove }
    case ACTIONS.TOGGLE_ITEM_AMOUNT:
      // eslint-disable-next-line
      var { id, value } = action.payload
      const cartToggle = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            return { ...item, amount: item.amount + 1 }
          }
          if (value === 'dec') {
            return { ...item, amount: item.amount - 1 }
          }
        }
        return item
      })
      return { ...state, cart: cartToggle }
    case ACTIONS.CLEAR_CART:
      return { ...state, cart: [] }
    case ACTIONS.COUNT_TOTAL:
      var { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          var { amount, price } = item
          total.total_items += amount
          total.total_amount += price * amount
          return total
        },
        { total_items: 0, total_amount: 0 }
      )
      return { ...state, total_items, total_amount }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const addToCart = (id, amount, product) => {
    dispatch({ type: ACTIONS.ADD_TO_CART, payload: { id, amount, product } })
  }
  const removeItem = (id) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id })
  }
  const toggleAmount = (id, value) => {
    dispatch({ type: ACTIONS.TOGGLE_ITEM_AMOUNT, payload: { id, value } })
  }
  const clearCart = () => {
    dispatch({ type: ACTIONS.CLEAR_CART })
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({ type: ACTIONS.COUNT_TOTAL })
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext)
}
