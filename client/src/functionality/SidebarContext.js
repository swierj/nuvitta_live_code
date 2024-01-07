import React, { useContext, useReducer } from 'react'

const initialState = {
  isSidebarOpen: false,
}

const SidebarContext = React.createContext()

const ACTIONS = {
  /* actions to open/close sidebar */
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
}

/* try with switch otherwise switch to the if/else statements */
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.OPEN:
      return { ...state, isSidebarOpen: true }
    case ACTIONS.CLOSE:
      return { ...state, isSidebarOpen: false }
    default:
      return state
  }
}

export const SidebarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: ACTIONS.OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: ACTIONS.CLOSE })
  }

  return (
    <SidebarContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => {
  return useContext(SidebarContext)
}
