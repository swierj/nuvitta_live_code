import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SidebarProvider } from './functionality/SidebarContext'
import { ProductsProvider } from './functionality/ProductsContext'
import { FilterProvider } from './functionality/FilterContext'
import { CartProvider } from './functionality/CartContext'

const container = document.getElementById('root')
createRoot(container).render(
  <SidebarProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </SidebarProvider>
)
